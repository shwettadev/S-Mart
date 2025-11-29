import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AppHeader from '../AppHeader/AppHeader';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          py: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            © 2025 S-Mart. All rights reserved. | Your one-stop shopping solution.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
