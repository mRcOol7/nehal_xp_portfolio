import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: parseInt(process.env.PORT || '4000'),
  user: process.env.USERNAME || '3G3bRSf18G8aTXC.root',
  password: process.env.PASSWORD || 'h4Uru0Q7Oeb2we8G',
  database: process.env.DATABASE || 'portfolio_db',
  ssl: {
    rejectUnauthorized: false
  }
};

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

    // Create database and table if they don't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS portfolio_db`);
    await connection.execute(`USE portfolio_db`);
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
