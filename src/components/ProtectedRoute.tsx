import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (props: {
    isAuthenticated: boolean;
}) => {
      return props.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};