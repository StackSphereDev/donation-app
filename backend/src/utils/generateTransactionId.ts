export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `TXN${timestamp}${randomStr}`.toUpperCase();
};
