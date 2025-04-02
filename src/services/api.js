
const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

const AUTH_CONFIG = {
    accessToken: process.env.ACCESS_TOKEN,
    tokenType: process.env.TOKEN_TYPE
  };

const getAuthHeader = () => {
  return {
    'Authorization': `${AUTH_CONFIG.tokenType} ${AUTH_CONFIG.accessToken}`
  };
};

export const fetchUsers = async () => {
    const response = await fetch('/api/users', { // Use "/api" instead of full URL
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAwMjY2LCJpYXQiOjE3NDM1OTk5NjYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjgwMTAxNmEwLWE4MjgtNGNkMy1hYzg5LTUwYTliNDU4YzQxZSIsInN1YiI6IjIyMDUxMTkzQGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MTE5M0BraWl0LmFjLmluIiwibmFtZSI6InNoYXNoYW5rIHlhZGF2Iiwicm9sbE5vIjoiMjIwNTExOTMiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiI4MDEwMTZhMC1hODI4LTRjZDMtYWM4OS01MGE5YjQ1OGM0MWUiLCJjbGllbnRTZWNyZXQiOiJGVHlKY1N3dmZhZmpqS0NWIn0.P0IGl1rLke4LzHfA88bVyvOGzdvFCVC2hWYRKizFsR4', 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


export const fetchUserPosts = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`Failed to fetch posts for user ${userId}`);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

export const fetchPostComments = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`Failed to fetch comments for post ${postId}`);
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};