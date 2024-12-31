
const crypto = require('crypto');

// Use a secure key and IV (Initialization Vector) for encryption
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes key for AES-256
const IV_LENGTH = 16; // AES block size is 16 bytes

// Encrypt function
const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV for each encryption
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`; // Concatenate IV and encrypted text
};

// Decrypt function
const decrypt = (encryptedText) => {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encrypt, decrypt };
