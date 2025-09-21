import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetCodeModal from './pages/ResetCodeModal';
import Dashboard from './pages/Dashboard';
import type { RootState } from './store';
import ToastContainer from './components/common/ToastContainer';
import styles from './App.module.css';
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className={styles.app}>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetCodeModal />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;