import React from 'react';

const UserCard = ({ user, rank }) => {
  const rankColors = {
    1: 'yellow',
    2: 'purple',
    3: 'orange',
    default: 'blue',
  };

  const borderColor = rankColors[rank] || rankColors.default;

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        position: 'relative',
        transition: 'transform 0.3s',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      {rank && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: rank === 1 ? '#FFD700' : rank === 2 ? '#DDA0DD' : rank === 3 ? '#FFA500' : '#3182ce',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#'}{rank}
        </div>
      )}

      <img
        src={user.avatarUrl}
        alt={user.name}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          marginBottom: '16px',
          border: `3px solid ${borderColor}`,
        }}
      />
      <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>{user.name}</div>
      <div style={{ color: '#718096', marginBottom: '16px' }}>User ID: {user.id}</div>
      <div
        style={{
          display: 'inline-block',
          backgroundColor: '#48bb78',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {user.postCount} Posts
      </div>
    </div>
  );
};

export default UserCard;