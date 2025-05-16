import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://product-management-backend-hr6h.onrender.com';

export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
