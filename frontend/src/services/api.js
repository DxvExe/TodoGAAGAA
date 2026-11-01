import axios from 'axios';

const baseURL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) ||
  'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while communicating with the server.';
    return Promise.reject(new Error(customMessage));
  }
);

export const taskApi = {
  getTasks: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status && params.status !== 'all') query.append('status', params.status);

    const queryString = query.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  patchTask: async (id, updates) => {
    const response = await apiClient.patch(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  }
};

export default taskApi;
