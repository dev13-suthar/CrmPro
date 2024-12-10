import crypto from "crypto";

// AES-256-CBC encryption algorithm
const algorithm = 'aes-256-cbc';

// Load key and IV from environment variables and convert them from hex strings to Uint8Array (which is compatible with CipherKey type)
const key = Uint8Array.from(Buffer.from(process.env.SEC_KEY!, 'hex'));
const iv = Uint8Array.from(Buffer.from(process.env.SEC_IV!, 'hex'));

// Encrypt email function
export const encryptEmail = (email: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

// Decrypt email function
export const decryptEmail = (encryptedData: string) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
