import express from 'express';
import { db } from './firebase';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to FilesHub Backend');
});

app.post('/add', async (req, res) => {
  try {
    const docRef = db.collection('your-collection').doc('new-doc');
    await docRef.set({
      exampleField: 'exampleValue'
    });
    res.status(200).send('Document successfully written!');
  } catch (error) {
    res.status(500).send('Error writing document: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
