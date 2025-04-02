import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import UserCard from '../common/UserCard';

const TopUsers = () => {
  const { topUsers, usersLoading, usersError } = useDataContext();

  if (usersError) {
    return (
      <div style={{ padding: '20px' }}>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fed7d7',
            border: '1px solid #f56565',
            borderRadius: '5px',
            color: '#c53030',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '8px' }}>❌</span>
          Error loading users: {usersError.message}
        </div>
      </div>
    );
  }

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
        Top Users
      </h1>
      <p
        style={{
          marginBottom: '24px',
          textAlign: 'center',
          color: '#718096',
        }}
      >
        Users with the highest number of posts on the platform
      </p>

      {usersLoading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                height: '200px',
                backgroundColor: '#e2e8f0',
                borderRadius: '8px',
              }}
            ></div>
          ))}
        </div>
      ) : (
        <>
          {topUsers.length === 0 ? (
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
              No user data available
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
              }}
            >
              {topUsers.map((user) => (
                <UserCard key={user.id} user={user} rank={topUsers.indexOf(user) + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TopUsers;