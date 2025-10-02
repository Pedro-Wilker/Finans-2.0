import api from './api';
import { setCredentials } from '../store/authSlice';
import { store } from '../store';
import { jwtDecode } from 'jwt-decode';
import type { User } from '../utils/types';

interface LoginResponse {
    token: string;
}

interface RegisterResponse {
    id: string;
    email: string;
}

export const login = async (email: string, password: string): Promise<void> => {
    const response = await api.post<LoginResponse>('/login', { email, password });
    const token = response.data.token;
    const user = jwtDecode<User>(token);
    store.dispatch(setCredentials({ user, token }));
    localStorage.setItem('token', token);
};

export const register = async (data: FormData): Promise<void> => {
    await api.post<RegisterResponse>('/users', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    // Automatically log in after registration
    const loginResponse = await api.post<LoginResponse>('/login', { email, password });
    const token = loginResponse.data.token;
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