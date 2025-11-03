const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Get transactions for a contact
router.get('/:contactId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ contactId: req.params.contactId }).sort({ date: 1, createdAt: 1 });
    
    let runningTotal = 0;
    const transactionsWithTotal = transactions.map((transaction, index) => {
      runningTotal += transaction.operation === 'giving' ? transaction.amount : -transaction.amount;
      return {
        ...transaction.toObject(),
        sno: index + 1,
        runningTotal
      };
    });
    
    res.json(transactionsWithTotal.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete transaction
router.delete('/:transactionId', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.transactionId);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;