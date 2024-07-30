import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Appointment from './Apointement';
import Login from './Login';
import Signup from './Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/apointements" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
