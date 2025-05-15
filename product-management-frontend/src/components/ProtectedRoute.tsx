import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { JSX } from 'react/jsx-runtime';

export default function ProtectedRoute({ children }: { children: ReactElement }): JSX.Element {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}
