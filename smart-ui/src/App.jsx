import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout/Layout';

// Lazy load the Login component
const Login = lazy(() => import('./pages/login/Login'));
// Lazy load the Signup component
const Signup = lazy(() => import('./pages/Signup/Signup'));
// Lazy load the Store component
const Store = lazy(() => import('./pages/Store/Store'));
// Lazy load the Admin component
const Admin = lazy(() => import('./pages/Admin/Admin'));

function App() {
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Router>
        <Suspense fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              fontSize: '1.2rem',
              color: '#666'
            }}
          >
            Loading...
          </Box>
        }>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/store" element={<Store />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </Router>
    </Box>
  );
}

export default App;
