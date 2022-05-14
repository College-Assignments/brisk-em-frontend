import axios from 'axios';

export const getUsers = async (auth: { token: any }) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: auth.token,
    };
    const response = await axios.get('/api/users', { headers: header });
    return response;
  } catch (error) {
    throw error;
  }
};
