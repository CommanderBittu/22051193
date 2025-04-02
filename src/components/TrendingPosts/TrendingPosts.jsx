import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import PostCard from '../common/PostCard';

const TrendingPosts = () => {
  const { trendingPosts, usersLoading, postCommentCounts } = useDataContext();

  return (
    <div style={{ padding: '20px' }}>
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Trending Posts
      </h1>
      <p
        style={{
          marginBottom: '24px',
          textAlign: 'center',
          color: '#718096',
        }}
      >
        Posts with the highest engagement based on comment count
      </p>

      {usersLoading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              style={{
                height: '300px',
                backgroundColor: '#e2e8f0',
                borderRadius: '8px',
              }}
            ></div>
          ))}
        </div>
      ) : (
        <>
          {trendingPosts.length === 0 ? (
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
              No trending posts available at the moment
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
              }}
            >
              {trendingPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  commentCount={postCommentCounts[post.id]}
                  trending={true}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendingPosts;