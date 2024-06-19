// api.js ou api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://3.22.75.73:3000',
});

// api.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('API Error:', error);
//     if (error.response) {
//       console.error('Response data:', error.response.data);
//       console.error('Response status:', error.response.status);
//       console.error('Response headers:', error.response.headers);
//     } else if (error.request) {
//       console.error('Request data:', error.request);
//     } else {
//       console.error('Error message:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
