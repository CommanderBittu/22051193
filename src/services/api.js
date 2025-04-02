
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
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
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