import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor for retry logic
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {} as any;
    }
    (config as any).retryCount = (config as any).retryCount || 0;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with retry logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & { retryCount?: number };
    
    // Retry logic for network errors or 5xx errors
    if (
      config &&
      (error.code === 'ECONNABORTED' || 
       error.code === 'ERR_NETWORK' ||
       (error.response && error.response.status >= 500)) &&
      (config.retryCount || 0) < MAX_RETRIES
    ) {
      config.retryCount = (config.retryCount || 0) + 1;
      
      await new Promise(resolve => 
        setTimeout(resolve, RETRY_DELAY * config.retryCount!)
      );
      
      return axiosInstance(config);
    }

    // Error handling
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({
        success: false,
        message: 'Network error. Please check your connection.',
      });
    } else if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        success: false,
        message: 'Request timeout. Please try again.',
      });
    } else {
      return Promise.reject({
        success: false,
        message: 'An unexpected error occurred.',
      });
    }
  }
);
