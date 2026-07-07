import axios from 'axios';
const client = axios.create({ baseURL: 'http://localhost:3001', headers: { 'Content-Type': 'application/json' } });
client.interceptors.request.use(c => { const t = localStorage.getItem('adminAccessToken'); if (t) c.headers.Authorization = `Bearer ${t}`; return c; });
client.interceptors.response.use(r => r, e => { if (e.response?.status === 401) { localStorage.removeItem('adminAccessToken'); window.location.href = '/login'; } return Promise.reject(e); });
export default client;