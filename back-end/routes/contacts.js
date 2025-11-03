const express = require('express');
const Contact = require('../models/Contact');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Get all contacts for a user
router.get('/:userId', async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.userId });
    
    const contactsWithTotal = await Promise.all(contacts.map(async (contact) => {
      const transactions = await Transaction.find({ contactId: contact._id });
      const total = transactions.reduce((sum, t) => {
        return sum + (t.operation === 'giving' ? t.amount : -t.amount);
      }, 0);
      
      return { ...contact.toObject(), total };
    }));
    
    res.json(contactsWithTotal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact
router.delete('/:contactId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ contactId: req.params.contactId });
    const total = transactions.reduce((sum, t) => {
      return sum + (t.operation === 'giving' ? t.amount : -t.amount);
    }, 0);
    
    if (total !== 0) {
      return res.status(400).json({ message: 'Cannot delete contact with non-zero balance' });
    }
    
    await Transaction.deleteMany({ contactId: req.params.contactId });
    await Contact.findByIdAndDelete(req.params.contactId);
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;