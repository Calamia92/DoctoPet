import React from 'react';
import { Route, Routes, RouteProps, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Routes>
    <Route
      {...rest}
      element={localStorage.getItem('token') ? <Component /> : <Navigate to="/login" />}
    />
  </Routes>
);

export default PrivateRoute;
