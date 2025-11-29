import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Divider,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  ShoppingCart as ShoppingCartIcon,
  MenuBook as BookIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import AppHeader from '../../components/AppHeader/AppHeader';

export default function Store() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('User');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const navigate = useNavigate();

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/store/books');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map(book => book.category).filter(Boolean))];
      setCategories(uniqueCategories);

      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter books by selected category
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  // Handle category tab change
  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  useEffect(() => {
    // Get username from localStorage or session if stored during login
    const storedUsername = localStorage.getItem('username') || 'User';
    setUsername(storedUsername);

    // Fetch books from API
    fetchBooks();
  }, []);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    setAnchorEl(null);
    navigate('/login');
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const handleAddToCart = (book) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', book.name);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Store Header */}
      <AppHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<AdminIcon />}
            onClick={handleGoToAdmin}
            sx={{ mr: 1 }}
          >
            Admin Panel
          </Button>
          <Chip
            label={`Welcome, ${username}`}
            color="primary"
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenu}
            color="inherit"
          >
            <AccountIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>
              <AccountIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </AppHeader>

      {/* Store Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
          Our Book Collection
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
          Discover our curated selection of programming and technical books
        </Typography>

        {/* Category Tabs */}
        {!loading && !error && categories.length > 1 && (
          <Box sx={{ mb: 4 }}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1976d2',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minHeight: 48,
                  '&.Mui-selected': {
                    color: '#1976d2',
                  },
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  value={category}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{category}</span>
                      <Chip
                        label={category === 'All' ? books.length : books.filter(book => book.category === category).length}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          backgroundColor: selectedCategory === category ? '#1976d2' : 'rgba(0, 0, 0, 0.08)',
                          color: selectedCategory === category ? 'white' : 'rgba(0, 0, 0, 0.6)',
                        }}
                      />
                    </Box>
                  }
                />
              ))}
            </Tabs>
            <Divider sx={{ mt: 2 }} />
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
            <Button
              variant="outlined"
              size="small"
              onClick={fetchBooks}
              sx={{ ml: 2 }}
            >
              Retry
            </Button>
          </Alert>
        )}

        {/* Books Grid */}
        {!loading && !error && books.length === 0 && (
          <Alert severity="info">
            No books available at the moment.
          </Alert>
        )}

        {!loading && !error && books.length > 0 && filteredBooks.length === 0 && selectedCategory !== 'All' && (
          <Alert severity="info">
            No books found in the "{selectedCategory}" category.
          </Alert>
        )}

        {!loading && !error && filteredBooks.length > 0 && (
          <>
            {/* Category Info */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                {selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                {selectedCategory !== 'All' && ` in ${selectedCategory} category`}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {filteredBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.isbn}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <BookIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography variant="h6" component="h2" sx={{
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {book.name}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Author:</strong> {book.author?.name || 'Unknown Author'}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Publisher:</strong> {book.publisher?.name || 'Unknown Publisher'}
                      </Typography>

                      {book.category && (
                        <Box sx={{ mb: 1 }}>
                          <Chip
                            label={book.category}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
                              height: 20,
                              borderColor: '#1976d2',
                              color: '#1976d2',
                            }}
                          />
                        </Box>
                      )}

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>ISBN:</strong> {book.isbn}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" component="span" sx={{
                          fontWeight: 700,
                          color: '#2e7d32',
                          fontSize: '1.2rem'
                        }}>
                          ${book.price}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleAddToCart(book)}
                        sx={{
                          backgroundColor: '#1976d2',
                          '&:hover': {
                            backgroundColor: '#1565c0',
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
