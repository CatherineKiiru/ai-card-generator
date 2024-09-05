import express from 'express';
import cors from 'cors';
import cardRoutes from './src/routes/CardRoutes';

const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;



app.use(cors());
app.use(express.json());

app.use('/api', cardRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});