import databaseConnection from './config/db';
import app from './index';
import dotenv from 'dotenv';

dotenv.config();
databaseConnection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
