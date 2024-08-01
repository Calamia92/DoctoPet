import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Appointment from './Apointement';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import SignUp from './Signup';
import Request from './components/Request';
import Profile from './components/Profile';

const PrivateRoute: React.FC<{ children: JSX.Element, isAdmin?: boolean }> = ({ children, isAdmin }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/apointements" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request" element={<Request />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-dashboard" element={
            <PrivateRoute isAdmin={true}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/apointements" element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>
          } />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
