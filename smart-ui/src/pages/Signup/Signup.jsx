import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  AccountCircle as AccountIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [severity, setSeverity] = useState('error');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !emailId || !username || !password || !confirmPassword) {
      setSeverity('error');
      setMessage('Please fill all required fields.');
      setShowMessage(true);
      return;
    }

    if (password !== confirmPassword) {
      setSeverity('error');
      setMessage('Passwords do not match.');
      setShowMessage(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      setSeverity('error');
      setMessage('Please enter a valid email address.');
      setShowMessage(true);
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      setSeverity('error');
      setMessage('Password must be at least 6 characters long.');
      setShowMessage(true);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        firstName,
        lastName,
        emailId,
        username,
        password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      setSeverity('success');
      setMessage(response.data?.message || 'Registration successful! Please log in.');
      setShowMessage(true);

      // Redirect to login after short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Signup error:', err);
      setSeverity('error');
      setMessage(err.response?.data?.message || 'Registration failed. Please try again.');
      setShowMessage(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        flexGrow: 1,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, fontWeight: 500, color: '#1976d2' }}
          >
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', maxWidth: '450px' }}
          >
            <Grid container spacing={1} sx={{ mb: 0 }}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="emailId"
              label="Email Address"
              name="emailId"
              type="email"
              autoComplete="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowMessage(false)}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
