import axios from 'axios';
const API_URL = 'http://localhost:3000';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });
    return response.data;
  } catch {
    // Handle error responses here!
    console.error('Login error:', error.response.data);
    throw error;
  }
};

export const signupUser = async userData => {
  try {
    const response = await axios.post(`${API_URL}/api/signup`, userData);
    return response.data;
  } catch {
    // Handle error response
    console.error('signup error:', error.response.data);
    throw error;
  }
};
