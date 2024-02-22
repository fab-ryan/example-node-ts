import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const password = process.env.MONGODB_PASSWORD || '';
const uri = process.env.MONGODB_URI || '';
const dbUrl = uri.replace('<password>', password);

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(dbUrl);
    console.log('Database connected');
    console.log('Connection state:', connection.connection.readyState);
  } catch (err) {
    console.log('Error connecting to database', err);
  }
}
export default connectToDatabase;

const testingDbUrl = process.env.MONGODB_PASSWORD || '';

 async function connectToTestingDatabase() {
  try {
    const connection = await mongoose.connect(testingDbUrl);
    console.log('Testing database connected');
    console.log('Connection state:', connection.connection.readyState);

    
  } catch (err) {
    console.log('Error connecting to testing database', err);
  }
}

export { connectToTestingDatabase };