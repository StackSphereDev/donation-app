import mongoose from 'mongoose';
import { env } from './env';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

export const connectDatabase = async (retryCount = 0): Promise<void> => {
  try {
    const mongoUri = env.MONGODB_URI;
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed (Attempt ${retryCount + 1}/${MAX_RETRIES}):`, error);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return connectDatabase(retryCount + 1);
    }
    
    console.error('❌ Max retries reached. Exiting...');
    process.exit(1);
  }
};
