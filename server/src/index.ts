import express from 'express';
import cors from 'cors';
import cardRoutes from './routes/cardRoutes';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', cardRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});