import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Fab,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Store as StoreIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import AppHeader from '../../components/AppHeader/AppHeader';

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    isbn: '',
    name: '',
    price: '',
    category: '',
    authorName: '',
    authorEmail: '',
    publisherName: '',
    publisherAddress: '',
    stock: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [username, setUsername] = useState('Admin');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  // Predefined categories for dropdown
  const categories = [
    'Programming',
    'Frontend',
    'Framework',
    'Software Development',
    'Software Architecture',
    'Database',
    'DevOps',
    'Mobile Development',
    'Web Development',
    'Data Science'
  ];

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
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'Admin';
    setUsername(storedUsername);
    fetchBooks();
  }, []);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    setAnchorEl(null);
    navigate('/login');
  };

  const handleGoToStore = () => {
    navigate('/store');
  };

  const handleOpenDialog = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        isbn: book.isbn || '',
        name: book.name || '',
        price: book.price?.toString() || '',
        category: book.category || '',
        authorName: book.author?.name || '',
        authorEmail: book.author?.emailId || '',
        publisherName: book.publisher?.name || '',
        publisherAddress: book.publisher?.address || '',
        stock: book.stock?.toString() || ''
      });
    } else {
      setEditingBook(null);
      setFormData({
        isbn: '',
        name: '',
        price: '',
        category: '',
        authorName: '',
        authorEmail: '',
        publisherName: '',
        publisherAddress: '',
        stock: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBook(null);
    setFormData({
      isbn: '',
      name: '',
      price: '',
      category: '',
      authorName: '',
      authorEmail: '',
      publisherName: '',
      publisherAddress: '',
      stock: ''
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      setSubmitLoading(true);

      // Validate required fields
      if (!formData.isbn || !formData.name || !formData.price) {
        setError('Please fill in all required fields (ISBN, Name, Price)');
        return;
      }

      const bookData = {
        isbn: formData.isbn,
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        author: {
          name: formData.authorName,
          emailId: formData.authorEmail
        },
        publisher: {
          name: formData.publisherName,
          address: formData.publisherAddress
        },
        stock: formData.stock ? parseInt(formData.stock) : 0
      };

      if (editingBook) {
        // Update existing book
        const response = await fetch('http://localhost:8080/store/book/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedBook = await response.json();
        const updatedBooks = books.map(book =>
          book.isbn === editingBook.isbn ? updatedBook : book
        );
        setBooks(updatedBooks);
        
        // Show success message for update
        setSuccessMessage(`Book "${updatedBook.name}" has been successfully updated`);
      } else {
        // Add new book
        const response = await fetch('http://localhost:8080/store/book/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData)
        });

        if (!response.ok) {
          if (response.status === 409) {
            throw new Error('Book with this ISBN already exists');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newBook = await response.json();
        setBooks([...books, newBook]);
        
        // Show success message with backend response
        setSuccessMessage(`Book "${newBook.name}" has been successfully added with ISBN: ${newBook.isbn}`);
      }

      setShowSuccessMessage(true);
      handleCloseDialog();
      setError(null);
      
      // Refresh the book list to ensure it's up to date
      setTimeout(() => {
        fetchBooks();
      }, 500);
    } catch (err) {
      console.error('Error saving book:', err);
      setError(err.message || 'Failed to save book. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (book) => {
    if (window.confirm(`Are you sure you want to delete "${book.name}"?`)) {
      try {
        const response = await fetch(`http://localhost:8080/store/book/delete?isbn=${encodeURIComponent(book.isbn)}`, {
          method: 'POST'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedBooks = books.filter(b => b.isbn !== book.isbn);
        setBooks(updatedBooks);
        setError(null);
      } catch (err) {
        console.error('Error deleting book:', err);
        setError('Failed to delete book. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Admin Header */}
      <AppHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<StoreIcon />}
            onClick={handleGoToStore}
            sx={{ mr: 2 }}
          >
            Go to Store
          </Button>
          <Chip
            icon={<AdminIcon />}
            label={`Admin: ${username}`}
            color="primary"
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          />
          <IconButton
            size="large"
            edge="end"
            onClick={handleProfileMenu}
            color="inherit"
          >
            <AccountIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
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

      {/* Admin Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#1976d2', mb: 4 }}>
          Book Management Admin Panel
        </Typography>

        {/* Statistics Cards */}
        {!loading && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {books.length}
                </Typography>
                <Typography variant="body1">
                  Total Books
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {new Set(books.map(book => book.category)).size}
                </Typography>
                <Typography variant="body1">
                  Categories
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {new Set(books.map(book => book.author?.name)).size}
                </Typography>
                <Typography variant="body1">
                  Authors
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  ₹{books.reduce((total, book) => total + (book.price || 0), 0).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Total Value
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Books Table */}
        {!loading && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ISBN</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Book Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Author</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Publisher</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book) => (
                    <TableRow
                      key={book.isbn}
                      hover
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.04)',
                          transform: 'translateY(-1px)',
                          transition: 'all 0.2s ease'
                        }
                      }}
                    >
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {book.isbn}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                          {book.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {book.author?.name || 'Unknown'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {book.category && (
                          <Chip
                            label={book.category}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: '#1976d2',
                              color: '#1976d2',
                              fontWeight: 500,
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ color: '#2e7d32', fontWeight: 600, fontSize: '1rem' }}>
                          ₹{book.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ 
                          color: book.stock > 0 ? '#2e7d32' : '#d32f2f', 
                          fontWeight: 600, 
                          fontSize: '1rem' 
                        }}>
                          {book.stock || 0}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {book.publisher?.name || 'Unknown'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Edit Book">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenDialog(book)}
                              className="action-button"
                              sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'all 0.2s ease' } }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Book">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(book)}
                              className="action-button"
                              sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'all 0.2s ease' } }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Empty state */}
            {books.length === 0 && !loading && (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No books available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click the + button to add your first book
                </Typography>
              </Box>
            )}
          </Paper>
        )}

        {/* Floating Add Button */}
        <Tooltip title="Add New Book" placement="left">
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              boxShadow: '0 3px 5px 2px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease'
              }
            }}
            onClick={() => handleOpenDialog()}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        {/* Add/Edit Book Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ISBN *"
                  value={formData.isbn}
                  onChange={handleInputChange('isbn')}
                  disabled={editingBook !== null}
                  helperText={editingBook ? "ISBN cannot be changed" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Book Title *"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price *"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange('price')}
                  inputProps={{ step: "0.01", min: "0" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange('stock')}
                  inputProps={{ min: "0" }}
                  helperText="Leave empty or 0 for out of stock"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange('category')}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Author Name"
                  value={formData.authorName}
                  onChange={handleInputChange('authorName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Author Email"
                  type="email"
                  value={formData.authorEmail}
                  onChange={handleInputChange('authorEmail')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Publisher Name"
                  value={formData.publisherName}
                  onChange={handleInputChange('publisherName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Publisher Address"
                  value={formData.publisherAddress}
                  onChange={handleInputChange('publisherAddress')}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={handleCloseDialog}
              color="inherit"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={submitLoading}
              startIcon={submitLoading ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              {submitLoading ? 'Saving...' : (editingBook ? 'Update' : 'Add')} Book
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Message Snackbar */}
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={6000}
          onClose={() => setShowSuccessMessage(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowSuccessMessage(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
