import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import FileManager from './FileManager';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import SurPlacePage from './components/SurPlacePage'; 
import EnLignePage from './components/EnLignePage';
import ADomicilePage from './components/ADomicilePage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="*"
            element={
                <Layout>
                <Routes>
                  <Route path="/file-manager" element={<FileManager />} />
                  <Route path="/sur-place" element={<SurPlacePage />} />
                  <Route path="/en-ligne" element={<EnLignePage />} />
                  <Route path="/a-domicile" element={<ADomicilePage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
