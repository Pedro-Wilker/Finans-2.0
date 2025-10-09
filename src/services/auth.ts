import api from './api';
import { setCredentials } from '../store/authSlice';
import { store } from '../store';
import { jwtDecode } from 'jwt-decode';
import type { User } from '../utils/types';

interface LoginResponse {
    token: string;
}
interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profession?: string;
}

export const register = async (data: RegisterData) => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const login = async (email: string, password: string): Promise<void> => {
    const response = await api.post<LoginResponse>('/login', { email, password });
    const token = response.data.token;
    const user = jwtDecode<User>(token);
    store.dispatch(setCredentials({ user, token }));
    localStorage.setItem('token', token);
};

export const forgotPassword = async (email: string): Promise<void> => {
    await api.post('/forgot-password', { email });
};

export const resetPassword = async (email: string, code: string, newPassword: string): Promise<void> => {
    await api.post('/reset-password', { email, code, newPassword });
};