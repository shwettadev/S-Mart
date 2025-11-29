import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AppHeader({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 600,
          }}
          onClick={() => navigate('/login')}
        >
          S-Mart Book Store
        </Typography>

        {/* Render children if provided (for dashboard user menu) */}
        {children}

        {/* Navigation buttons based on current route (for login/signup pages) */}
        {!children && location.pathname === '/login' && (
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Typography>
        )}

        {!children && location.pathname === '/signup' && (
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
