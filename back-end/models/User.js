const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Ensure proper indexing
UserSchema.post('init', async function() {
  try {
    const collection = this.collection;
    // Drop old username index if it exists
    await collection.dropIndex('username_1').catch(() => {});
  } catch (error) {
    // Ignore errors if index doesn't exist
  }
});

module.exports = mongoose.model('User', UserSchema);