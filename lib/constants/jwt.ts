export const JWT_EXPIRY_TIME_DAYS = 7;

export const JWT_EXPIRY_TIME_MS = JWT_EXPIRY_TIME_DAYS * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const JWT_EXPIRY_TIME_DATE = new Date(Date.now() + JWT_EXPIRY_TIME_MS); // 7 days from now

export const JWT_EXPIRY_TIME_STRING = `${JWT_EXPIRY_TIME_DAYS} days`;
