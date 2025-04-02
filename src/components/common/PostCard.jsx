import React from 'react';
import { FaComment, FaFire } from 'react-icons/fa';

const PostCard = ({ post, commentCount = 0, trending = false }) => {
  const formattedDate = new Date(post.timestamp).toLocaleString();

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: trending ? '0 0 15px rgba(255, 153, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        position: 'relative',
        transition: 'transform 0.3s',
        marginBottom: '16px',
      }}
    >
      {trending && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#e53e3e',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1,
          }}
        >
          <FaFire style={{ marginRight: '5px' }} /> Trending
        </div>
      )}

      <img
        src={post.imageUrl}
        alt={`Post by ${post.userName}`}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <img
            src={`https://i.pravatar.cc/150?u=${post.userid}`}
            alt={post.userName}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              marginRight: '8px',
            }}
          />
          <span style={{ fontWeight: 'bold' }}>{post.userName}</span>
        </div>

        <p style={{ fontSize: '16px', marginBottom: '16px' }}>{post.content}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#718096', fontSize: '14px' }}>{formattedDate}</span>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              aria-label="Comments"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginRight: '8px',
                fontSize: '16px',
                color: '#4a5568',
              }}
            >
              <FaComment />
            </button>
            <span
              style={{
                backgroundColor: commentCount > 0 ? '#48bb78' : '#e2e8f0',
                color: commentCount > 0 ? 'white' : '#4a5568',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;