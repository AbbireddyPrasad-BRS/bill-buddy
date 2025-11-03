import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Alert, Fab, Grid } from '@mui/material';
import { Add, Person, Delete } from '@mui/icons-material';
import { contacts } from '../utils/api';
import Header from '../components/Header';

const Dashboard = ({ user, onLogout }) => {
  const [contactList, setContactList] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchContacts();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contacts.getAll(user.userId);
      setContactList(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contacts.create({ ...formData, userId: user.userId });
      setOpen(false);
      setFormData({ name: '', mobile: '' });
      fetchContacts();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create contact');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId, total) => {
    if (total !== 0) {
      alert('Cannot delete contact with non-zero balance');
      return;
    }

    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contacts.delete(contactId);
        fetchContacts();
      } catch (error) {
        alert('Failed to delete contact');
      }
    }
  };

  const grandTotal = contactList.reduce((sum, contact) => sum + contact.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <Header user={user} onLogout={onLogout} />
      
      <Container maxWidth="lg" className="py-8">
        <div className="mb-8">
          <div className="text-center mb-8">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              💼 Welcome to Your Dashboard
            </Typography>
            <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
              🚀 Manage your financial relationships with ease
            </Typography>
          </div>
          <div className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-slate-800 p-8 rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  Overall Balance
                </Typography>
              </div>
              <div className={`px-4 py-2 rounded-full ${
                grandTotal >= 0 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900' 
                  : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900'
              }`}>
                <Typography variant="h5" className={`font-bold ${
                  grandTotal >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {grandTotal >= 0 ? '+' : ''}₹{grandTotal.toFixed(2)}
                </Typography>
              </div>
            </div>
            <Typography variant="body1" className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span className="text-xl">{grandTotal >= 0 ? '💰' : '💳'}</span>
              {grandTotal >= 0 
                ? 'Total amount you can collect from all contacts' 
                : 'Total amount you owe to all contacts'
              }
            </Typography>
          </div>
        </div>

        <Grid container spacing={3}>
          {contactList.map((contact) => (
            <Grid item xs={12} sm={6} md={4} key={contact._id}>
              <Card className="hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:rotate-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent 
                  className="p-6 relative z-10"
                  onClick={() => navigate(`/transactions/${contact._id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">👤</span>
                      </div>
                      <div>
                        <Typography variant="body1" className="font-bold dark:text-white text-gray-800">
                          {contact.name}
                        </Typography>
                        {contact.mobile && (
                          <Typography variant="caption" className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <span>📱</span> {contact.mobile}
                          </Typography>
                        )}
                      </div>
                    </div>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (contact.total !== 0) {
                          alert('⚠️ Unable to remove contact with non-zero balance. Please settle all transactions first.');
                          return;
                        }
                        handleDelete(contact._id, contact.total);
                      }}
                      disabled={contact.total !== 0}
                      className="rounded-full hover:scale-110 transition-transform duration-200"
                    >
                      <Delete />
                    </Button>
                  </div>
                  
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${
                    contact.total >= 0 
                      ? 'from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-700' 
                      : 'from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-2 border-red-200 dark:border-red-700'
                  } transform group-hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography variant="caption" className="text-gray-600 dark:text-gray-400 font-medium">
                          {contact.total >= 0 ? '💰 They owe you' : '💳 You owe them'}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          className={`font-bold ${
                            contact.total >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {contact.total >= 0 ? '+' : ''}₹{contact.total.toFixed(2)}
                        </Typography>
                      </div>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                        contact.total >= 0 
                          ? 'bg-green-200 dark:bg-green-800' 
                          : 'bg-red-200 dark:bg-red-800'
                      }`}>
                        {contact.total >= 0 ? '💰' : '💳'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {contactList.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-slate-800 p-12 rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-500">
              <div className="text-8xl mb-6 animate-bounce">👥</div>
              <Typography variant="h4" className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 font-bold">
                No contacts yet
              </Typography>
              <Typography variant="h6" className="text-gray-600 dark:text-gray-300 mb-8">
                🚀 Add your first contact to start tracking money exchanges
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                ✨ Add First Contact
              </Button>
            </div>
          </div>
        )}

        <div className="fixed bottom-8 right-8 group">
          <Fab
            aria-label="add"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl transform hover:scale-125 transition-all duration-300 w-16 h-16"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center justify-center">
              <span className="text-2xl">➕</span>
            </div>
          </Fab>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Create New Contact
          </div>
        </div>

        <Dialog 
          open={open} 
          onClose={() => setOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            className: "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-slate-800 rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-gray-700"
          }}
        >
          <DialogTitle className="text-center pb-2">
            <Typography variant="h4" className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
              👤 Add New Contact
            </Typography>
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent className="px-8">
              {error && <Alert severity="error" className="mb-4 rounded-xl">{error}</Alert>}
              <TextField
                fullWidth
                label="📝 Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                margin="normal"
                className="mb-4"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="📱 Mobile Number (Optional)"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </DialogContent>
            <DialogActions className="px-8 pb-6 gap-4">
              <Button 
                onClick={() => setOpen(false)}
                className="px-6 py-2 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200"
              >
                ❌ Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-2 rounded-full font-bold transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {loading ? '⏳ Creating...' : '✨ Create Contact'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
};

export default Dashboard;