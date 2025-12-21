import mysql from 'mysql2/promise';

// Database configuration from environment variables
const dbConfig = {
  host: process.env.HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: parseInt(process.env.PORT || '4000'),
  user: process.env.USERNAME || '3G3bRSf18G8aTXC.root',
  password: process.env.PASSWORD || 'h4Uru0Q7Oeb2we8G',
  database: process.env.DATABASE || 'test',
  ssl: {
    rejectUnauthorized: false
  }
};

// Create connection pool without database (for creating database)
const adminPool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  ssl: dbConfig.ssl
});

// Create connection pool with database
const pool = mysql.createPool(dbConfig);

// Initialize database and table if they don't exist
export const initializeDatabase = async () => {
  try {
    const connection = await adminPool.getConnection();
    
    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS portfolio_db`);
    await connection.execute(`USE portfolio_db`);
    
    // Create contact_messages table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

// Save contact message to database
export const saveContactMessage = async (name: string, email: string, message: string) => {
  try {
    const connection = await adminPool.getConnection();
    
    // Use the portfolio_db database
    await connection.execute(`USE portfolio_db`);
    
    const [result] = await connection.execute(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    connection.release();
    return result;
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
};

// Get all contact messages (for admin purposes)
export const getContactMessages = async () => {
  try {
    const connection = await adminPool.getConnection();
    
    // Use the portfolio_db database
    await connection.execute(`USE portfolio_db`);
    
    const [rows] = await connection.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }
};

export default pool;
