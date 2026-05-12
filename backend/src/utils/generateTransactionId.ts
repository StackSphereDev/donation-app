import crypto from 'crypto';

export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomBytes = crypto.randomBytes(8).toString('hex');
  const uniqueId = `${timestamp}${randomBytes}`;
  return `TXN${uniqueId}`.toUpperCase();
};
