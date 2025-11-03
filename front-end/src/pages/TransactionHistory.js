import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Alert, Fab, MenuItem } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { transactions, contacts } from '../utils/api';
import Header from '../components/Header';

const TransactionHistory = ({ user, onLogout }) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState([]);
  const [contact, setContact] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    operation: 'giving',
    amount: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchContact();
  }, [contactId]);

  const fetchTransactions = async () => {
    try {
      const response = await transactions.getByContact(contactId);
      setTransactionList(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  };

  const fetchContact = async () => {
    try {
      const response = await contacts.getAll(user.userId);
      const currentContact = response.data.find(c => c._id === contactId);
      setContact(currentContact);
      return currentContact;
    } catch (error) {
      console.error('Error fetching contact:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      setError('Date cannot be in the future');
      setLoading(false);
      return;
    }

    try {
      await transactions.create({
        contactId,
        userId: user.userId,
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setOpen(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        operation: 'giving',
        amount: '',
        description: ''
      });
      await fetchTransactions();
      await fetchContact();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };



  const currentTotal = transactionList.length > 0 
    ? transactionList[0].runningTotal 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header user={user} onLogout={onLogout} />
      
      <Container maxWidth="lg" className="py-8">
        <div className="mb-6">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            Back to Dashboard
          </Button>
          
          <Typography variant="h4" className="font-bold text-gray-800 dark:text-white mb-2">
            {contact?.name} - Transaction History
          </Typography>
          <div className="flex items-center gap-4">
            <Typography variant="h6" className={`font-bold px-4 py-2 rounded-lg ${
              currentTotal >= 0 
                ? 'text-positive bg-green-50 border border-green-200' 
                : 'text-negative bg-red-50 border border-red-200'
            }`}>
              {currentTotal >= 0 ? '✅' : '⚠️'} Balance: {currentTotal >= 0 ? '+' : ''}₹{currentTotal.toFixed(2)}
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
              {currentTotal >= 0 ? 'You can collect this amount' : 'You owe this amount'}
            </Typography>
          </div>
        </div>

        <TableContainer component={Paper} className="shadow-lg dark:bg-gray-800">
          <Table>
            <TableHead className="bg-gray-100 dark:bg-gray-700">
              <TableRow>
                <TableCell className="dark:text-white"><strong>S.No</strong></TableCell>
                <TableCell className="dark:text-white"><strong>Date</strong></TableCell>
                <TableCell className="dark:text-white"><strong>Operation</strong></TableCell>
                <TableCell className="dark:text-white"><strong>Description</strong></TableCell>
                <TableCell className="dark:text-white"><strong>Amount</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionList.map((transaction, index) => (
                <TableRow key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="dark:text-gray-300">{transaction.sno}</TableCell>
                  <TableCell className="dark:text-gray-300">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.operation === 'giving' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.operation === 'giving' ? '💰 Gave Money' : '💵 Received Money'}
                    </span>
                  </TableCell>
                  <TableCell className="dark:text-gray-300">{transaction.description || '-'}</TableCell>
                  <TableCell className={`font-semibold ${
                    transaction.operation === 'giving' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.operation === 'giving' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {transactionList.length > 0 && (
                <TableRow className="bg-yellow-100 dark:bg-yellow-900 border-t-4 border-yellow-400">
                  <TableCell colSpan={5} className="font-bold text-xl text-center text-yellow-800 dark:text-yellow-200 py-4">
                    📊 CONCLUSION: {currentTotal >= 0 
                      ? `${contact?.name} owes you ₹${currentTotal.toFixed(2)}` 
                      : `You owe ${contact?.name} ₹${Math.abs(currentTotal).toFixed(2)}`
                    }
                  </TableCell>
                </TableRow>
              )}
              {transactionList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl mb-4">💰</div>
                      <div className="text-lg font-medium">No transactions yet</div>
                      <div className="text-sm">Add your first transaction to get started!</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex justify-center mt-8 mb-8">
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            ➕ Add New Transaction
          </Button>
        </div>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Transaction</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {error && <Alert severity="error" className="mb-4">{error}</Alert>}
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: new Date().toISOString().split('T')[0] }}
              />
              <TextField
                fullWidth
                select
                label="Operation"
                value={formData.operation}
                onChange={(e) => setFormData({ ...formData, operation: e.target.value })}
                required
                margin="normal"
              >
                <MenuItem value="giving">💰 I Gave Money</MenuItem>
                <MenuItem value="taking">💵 I Received Money</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                margin="normal"
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                fullWidth
                label="Description (Optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
                multiline
                rows={2}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Adding...' : 'Add Transaction'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
};

export default TransactionHistory;