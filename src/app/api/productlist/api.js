// api.js

// 'use client'
const BASE_URL = 'https://dummyjson.com';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export default fetchData;
