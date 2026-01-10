import axios from 'axios';

/**
 * Enhanced API client with retry logic for handling Render cold starts
 * When the backend is sleeping on Render, the first request can take 30+ seconds
 * This utility handles that gracefully with retries and proper error handling
 */

const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 45000; // 45 seconds for first attempt (Render cold start)
const RETRY_TIMEOUT = 15000; // 15 seconds for retries

/**
 * Make an API request with retry logic and extended timeout
 * @param {string} url - The API endpoint URL
 * @param {object} options - Axios request options
 * @returns {Promise} - Axios response
 */
export const apiRequest = async (url, options = {}) => {
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const timeout = attempt === 0 ? INITIAL_TIMEOUT : RETRY_TIMEOUT;
      
      const response = await axios({
        url,
        ...options,
        timeout,
      });
      
      return response;
    } catch (error) {
      lastError = error;
      
      // Don't retry on 4xx errors (client errors)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }
      
      // If this is the last attempt, throw the error
      if (attempt === MAX_RETRIES - 1) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * GET request with retry logic
 */
export const apiGet = (url) => apiRequest(url, { method: 'GET' });

/**
 * POST request with retry logic
 */
export const apiPost = (url, data) => apiRequest(url, { 
  method: 'POST',
  data,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default {
  get: apiGet,
  post: apiPost,
  request: apiRequest,
};

/**
 * Build a clean API URL by normalizing slashes
 * Ensures no double slashes and that path starts with a single '/'
 */
export const buildApiUrl = (base, path) => {
  const cleanBase = (base || '').replace(/\/$/, '');
  const cleanPath = (`${path || ''}`).replace(/^\/+/, '');
  return `${cleanBase}/${cleanPath}`;
};
