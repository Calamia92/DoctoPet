import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import FileManager from './FileManager';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
