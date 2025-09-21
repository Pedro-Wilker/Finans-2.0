import api from './api';
import { setCredentials } from '../store/authSlice';
import { store } from '../store';
import { jwtDecode } from 'jwt-decode';
import type { User } from '../utils/types';

interface LoginResponse {
    token: string;
}

export const login = async (email: string, password: string): Promise<void> => {
    const response = await api.post<LoginResponse>('/login', { email, password });
    const token = response.data.token;
    const user = jwtDecode<User>(token);
    store.dispatch(setCredentials({ user, token }));
    localStorage.setItem('token', token);
};

export const register = async (name: string, email: string, password: string): Promise<void> => {
    const response = await api.post<LoginResponse>('/users', { name, email, password });
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