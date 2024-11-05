import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CandidatesPage from './pages/CandidatesPage';
import AssessmentsPage from './pages/AssessmentsPage';
import JobCandidates from './pages/JobCandidates';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/jobs/:jobId/candidates" element={<JobCandidates />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;