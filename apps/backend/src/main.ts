import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the backend API!' });
});

const port = process.env.PORT || 3005;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Successfully connected to MongoDB');

    // Start the Express server
    const server = app.listen(port, () => {
      console.log(`🚀 Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

startServer();