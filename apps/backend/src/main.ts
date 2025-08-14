import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Import our new router
import authRoutes from './app/routes/auth.routes';
import productRoutes from './app/routes/product.routes';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Use the authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the backend API!' });
});

const port = process.env.PORT || 3333;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Successfully connected to MongoDB');

    const server = app.listen(port, () => {
      console.log(`🚀 Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

startServer();