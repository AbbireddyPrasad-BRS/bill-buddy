const mongoose = require('mongoose');
require('dotenv').config();

async function fixDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('users');
    
    // Drop the problematic username index
    try {
      await collection.dropIndex('username_1');
      console.log('Dropped username_1 index');
    } catch (error) {
      console.log('username_1 index not found or already dropped');
    }
    
    // Ensure userid index exists
    try {
      await collection.createIndex({ userid: 1 }, { unique: true });
      console.log('Created userid_1 index');
    } catch (error) {
      console.log('userid_1 index already exists');
    }
    
    console.log('Database fix completed');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  }
}

fixDatabase();