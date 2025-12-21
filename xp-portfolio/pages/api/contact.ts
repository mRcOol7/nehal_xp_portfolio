import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
};

// Validate required environment variables
const requiredEnvVars = ['TIDB_HOST', 'TIDB_PORT', 'TIDB_USER', 'TIDB_PASSWORD', 'TIDB_DATABASE'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Create connection pool
const pool = mysql.createPool(dbConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Connecting to TiDB...');
    const connection = await pool.getConnection();
    console.log('Connected to TiDB successfully');

    // Create table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert message
    const [result] = await connection.execute(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    connection.release();
    console.log('Message saved successfully:', result);

    res.status(200).json({ 
      message: 'Message sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}