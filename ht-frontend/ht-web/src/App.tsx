import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';
import KnowledgePage from './pages/KnowledgePage';
import OrganizationPage from './pages/OrganizationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/knowledge-manager" element={<KnowledgePage />} />
          <Route path="/manage-organization" element={<OrganizationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
