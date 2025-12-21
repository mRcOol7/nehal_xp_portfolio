import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT),
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

// Initialize database
async function initializeDatabase() {
  try {
    console.log('Connecting to TiDB...');
    const connection = await pool.getConnection();
    console.log('Connected to TiDB successfully');

    // Use the specified database
    await connection.execute(`USE ${process.env.TIDB_DATABASE}`);
    
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
    process.exit(1);
  }
}

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Saving message to database...');
    const connection = await pool.getConnection();
    
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
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    dbStatus: 'Connected'
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});