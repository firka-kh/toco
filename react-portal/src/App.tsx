import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';

// Import i18n
import '@/locales/i18n';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
