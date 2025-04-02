import React, { useState, useEffect } from 'react';
import { useDataContext } from '../../contexts/DataContext';
import PostCard from '../common/PostCard';
import { FaSyncAlt } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

const Feed = () => {
  const { allPosts, usersLoading, postCommentCounts } = useDataContext();
  const [displayPosts, setDisplayPosts] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      setDisplayPosts(allPosts.slice(0, displayCount));
    }
  }, [allPosts, displayCount]);

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const refreshFeed = () => {
    queryClient.invalidateQueries('users');
    alert('Refreshing feed: Getting the latest posts...');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Feed</h1>
        <button
          onClick={refreshFeed}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          disabled={usersLoading}
        >
          <FaSyncAlt style={{ marginRight: '8px' }} />
          {usersLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <p style={{ marginBottom: '20px', color: '#718096' }}>
        Latest posts from the social media platform, updated in real-time
      </p>

      {usersLoading && displayPosts.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                height: '300px',
                width: '100%',
                backgroundColor: '#e2e8f0',
                borderRadius: '8px',
              }}
            ></div>
          ))}
        </div>
      ) : (
        <>
          {displayPosts.length === 0 ? (
            <div
              style={{
                padding: '15px',
                backgroundColor: '#ebf8ff',
                border: '1px solid #bee3f8',
                borderRadius: '5px',
                color: '#2c5282',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ marginRight: '8px' }}>ℹ️</span>
              No posts available at the moment
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {displayPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    commentCount={postCommentCounts[post.id] || 0}
                  />
                ))}
              </div>

              {displayCount < allPosts.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    onClick={loadMore}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #3182ce',
                      color: '#3182ce',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;