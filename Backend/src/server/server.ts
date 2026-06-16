import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoute from '../routes/aiRoute.js'; // .js required for ES modules

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// AI route
app.use('/api/ai', aiRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
