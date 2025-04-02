import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [userPostCounts, setUserPostCounts] = useState({});
  const [topUsers, setTopUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [postCommentCounts, setPostCommentCounts] = useState({});

  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (users && Object.keys(users).length > 0) {
      const processUsers = async () => {
        const userIds = Object.keys(users);
        const postCountsObj = {};
        const allPostsArray = [];
        for (let i = 0; i < userIds.length; i += 5) {
          const batch = userIds.slice(i, i + 5);
          const batchPromises = batch.map(userId => 
            fetchUserPosts(userId)
              .then(posts => {
                if (posts && posts.length) {
                  postCountsObj[userId] = posts.length;
                  const enrichedPosts = posts.map(post => ({
                    ...post,
                    userName: users[userId],
                    imageUrl: `https://source.unsplash.com/random/300x200?sig=${post.id}`,
                    timestamp: Date.now() - (1000000 - post.id) * 1000
                  }));
                  allPostsArray.push(...enrichedPosts);
                }
                return posts;
              })
              .catch(error => {
                console.error(`Error processing posts for user ${userId}:`, error);
                return [];
              })
          );
          
          await Promise.all(batchPromises);
          
          if (i + 5 < userIds.length) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }

        const sortedUsers = Object.entries(postCountsObj)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([userId, postCount]) => ({
            id: userId,
            name: users[userId],
            postCount,
            // Add a random avatar
            avatarUrl: `https://i.pravatar.cc/150?u=${userId}`
          }));

        const sortedPosts = allPostsArray.sort((a, b) => b.timestamp - a.timestamp);

        setUserPostCounts(postCountsObj);
        setTopUsers(sortedUsers);
        setAllPosts(sortedPosts);
        fetchCommentsForPosts(sortedPosts);
      };

      processUsers();
    }
  }, [users]);

  const fetchCommentsForPosts = useCallback(async (posts) => {
    if (!posts || posts.length === 0) return;
  
    const commentCountsObj = {};
    let maxCommentCount = 0;
    for (let i = 0; i < posts.length; i += 10) {
      const batch = posts.slice(i, i + 10);
      const batchPromises = batch.map(post =>
        queryClient
          .fetchQuery({
            queryKey: ['comments', post.id],
            queryFn: () => fetchPostComments(post.id),
            staleTime: 60000,
          })
          .then(comments => {
            const commentCount = comments ? comments.length : 0;
            commentCountsObj[post.id] = commentCount;
  
            if (commentCount > maxCommentCount) {
              maxCommentCount = commentCount;
            }
  
            return { postId: post.id, commentCount };
          })
          .catch(error => {
            console.error(`Error fetching comments for post ${post.id}:`, error);
            return { postId: post.id, commentCount: 0 };
          })
      );
  
      await Promise.all(batchPromises);
      if (i + 10 < posts.length) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  
    setPostCommentCounts(commentCountsObj);
    if (maxCommentCount > 0) {
      const trending = posts.filter(post => commentCountsObj[post.id] === maxCommentCount);
      setTrendingPosts(trending);
    }
  }, [queryClient]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      queryClient.invalidateQueries('users');
    }, 30000);

    return () => clearInterval(intervalId);
  }, [queryClient]);

  const value = {
    users,
    usersLoading,
    usersError,
    topUsers,
    allPosts,
    trendingPosts,
    postCommentCounts,
    fetchCommentsForPosts 
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};