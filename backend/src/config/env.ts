import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGODB_URI: string;
  NODE_ENV: string;
  FRONTEND_URL: string;
}

const validateEnv = (): EnvConfig => {
  const requiredEnvVars = ['MONGODB_URI', 'FRONTEND_URL'];
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(', ')}`);
    console.warn('Using default values for development');
  }

  return {
    PORT: parseInt(process.env.PORT || '5000', 10),
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/donation-app',
    NODE_ENV: process.env.NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  };
};

export const env = validateEnv();
