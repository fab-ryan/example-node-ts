import app from './server';
import databaseConnection from './config/db';


databaseConnection();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
