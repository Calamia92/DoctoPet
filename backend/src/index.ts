import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com'
});

const db = admin.database();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'SECRET_KEY', (err: any, decoded: any) => {
    if (err) return res.status(500).send('Invalid Token');
    req.body.userId = decoded.id;
    next();
  });
};

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to FilesHub Backend');
});

interface Utilisateur {
  nom: string;
  email: string;
  password: string;
  cabinetIds: string[];
}

interface Animal {
  nom: string;
  type: string;
  proprietaireId: string;
}

interface Cabinet {
  nom: string;
  adresse: string;
  userIds: string[];
}

app.post('/utilisateurs', async (req: Request, res: Response) => {
  const { nom, email, password, cabinetIds }: Utilisateur = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUserRef = db.ref('utilisateurs').push();
  await newUserRef.set({
    nom,
    email,
    password: hashedPassword,
    cabinetIds
  });

  cabinetIds.forEach(async (cabinetId) => {
    const cabinetRef = db.ref('cabinets/' + cabinetId);
    const snapshot = await cabinetRef.once('value');
    const cabinetData = snapshot.val();

    if (cabinetData) {
      const userIds = cabinetData.userIds || [];
      userIds.push(newUserRef.key);
      await cabinetRef.update({ userIds });
    }
  });

  res.status(201).send({ id: newUserRef.key, nom, email, cabinetIds });
});

app.get('/utilisateurs', (req: Request, res: Response) => {
  db.ref('utilisateurs').once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  });
});

app.get('/utilisateurs/:id', (req: Request, res: Response) => {
  db.ref('utilisateurs/' + req.params.id).once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  });
});

app.put('/utilisateurs/:id', async (req: Request, res: Response) => {
  const { nom, email, password, cabinetIds }: Utilisateur = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  await db.ref('utilisateurs/' + req.params.id).update({
    nom,
    email,
    password: hashedPassword,
    cabinetIds
  });

  const userRef = db.ref('utilisateurs/' + req.params.id);
  const userSnapshot = await userRef.once('value');
  const userData = userSnapshot.val();

  userData.cabinetIds.forEach(async (cabinetId: string) => {
    const cabinetRef = db.ref('cabinets/' + cabinetId);
    const snapshot = await cabinetRef.once('value');
    const cabinetData = snapshot.val();

    if (cabinetData) {
      const userIds = cabinetData.userIds || [];
      const updatedUserIds = userIds.filter((id: string) => id !== req.params.id);
      await cabinetRef.update({ userIds: updatedUserIds });
    }
  });

  cabinetIds.forEach(async (cabinetId) => {
    const cabinetRef = db.ref('cabinets/' + cabinetId);
    const snapshot = await cabinetRef.once('value');
    const cabinetData = snapshot.val();

    if (cabinetData) {
      const userIds = cabinetData.userIds || [];
      userIds.push(req.params.id);
      await cabinetRef.update({ userIds });
    }
  });

  res.status(200).send({ id: req.params.id, nom, email, cabinetIds });
});

app.delete('/utilisateurs/:id', async (req: Request, res: Response) => {
  const userRef = db.ref('utilisateurs/' + req.params.id);
  const userSnapshot = await userRef.once('value');
  const userData = userSnapshot.val();

  userData.cabinetIds.forEach(async (cabinetId: string) => {
    const cabinetRef = db.ref('cabinets/' + cabinetId);
    const snapshot = await cabinetRef.once('value');
    const cabinetData = snapshot.val();

    if (cabinetData) {
      const userIds = cabinetData.userIds || [];
      const updatedUserIds = userIds.filter((id: string) => id !== req.params.id);
      await cabinetRef.update({ userIds: updatedUserIds });
    }
  });

  await db.ref('utilisateurs/' + req.params.id).remove();
  res.status(200).send({ id: req.params.id });
});

app.post('/animaux', (req: Request, res: Response) => {
  const { nom, type, proprietaireId }: Animal = req.body;

  const newAnimalRef = db.ref('animaux').push();
  newAnimalRef.set({
    nom,
    type,
    proprietaireId
  });
  res.status(201).send({ id: newAnimalRef.key, nom, type, proprietaireId });
});

app.get('/animaux', (req: Request, res: Response) => {
  db.ref('animaux').once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  });
});

app.get('/animaux/:id', (req: Request, res: Response) => {
  db.ref('animaux/' + req.params.id).once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  });
});

app.put('/animaux/:id', (req: Request, res: Response) => {
  const { nom, type, proprietaireId }: Animal = req.body;

  db.ref('animaux/' + req.params.id).update({
    nom,
    type,
    proprietaireId
  });
  res.status(200).send({ id: req.params.id, nom, type, proprietaireId });
});

app.delete('/animaux/:id', (req: Request, res: Response) => {
  db.ref('animaux/' + req.params.id).remove();
  res.status(200).send({ id: req.params.id });
});

app.post('/cabinets', (req: Request, res: Response) => {
  const { nom, adresse, userIds }: Cabinet = req.body;

  const newCabinetRef = db.ref('cabinets').push();
  newCabinetRef.set({
    nom,
    adresse,
    userIds
  });

  userIds.forEach(async (userId) => {
    const userRef = db.ref('utilisateurs/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (userData) {
      const cabinetIds = userData.cabinetIds || [];
      cabinetIds.push(newCabinetRef.key);
      await userRef.update({ cabinetIds });
    }
  });

  res.status(201).send({ id: newCabinetRef.key, nom, adresse, userIds });
});

app.get('/cabinets', (req: Request, res: Response) => {
  db.ref('cabinets').once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  });
});

app.get('/cabinets/:id', (req: Request, res: Response) => {
  db.ref('cabinets/' + req.params.id).once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  });
});

app.put('/cabinets/:id', async (req: Request, res: Response) => {
  const { nom, adresse, userIds }: Cabinet = req.body;

  await db.ref('cabinets/' + req.params.id).update({
    nom,
    adresse,
    userIds
  });

  const cabinetRef = db.ref('cabinets/' + req.params.id);
  const cabinetSnapshot = await cabinetRef.once('value');
  const cabinetData = cabinetSnapshot.val();

  cabinetData.userIds.forEach(async (userId: string) => {
    const userRef = db.ref('utilisateurs/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (userData) {
      const cabinetIds = userData.cabinetIds || [];
      const updatedCabinetIds = cabinetIds.filter((id: string) => id !== req.params.id);
      await userRef.update({ cabinetIds: updatedCabinetIds });
    }
  });

  userIds.forEach(async (userId) => {
    const userRef = db.ref('utilisateurs/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (userData) {
      const cabinetIds = userData.cabinetIds || [];
      cabinetIds.push(req.params.id);
      await userRef.update({ cabinetIds });
    }
  });

  res.status(200).send({ id: req.params.id, nom, adresse, userIds });
});

app.delete('/cabinets/:id', async (req: Request, res: Response) => {
  const cabinetRef = db.ref('cabinets/' + req.params.id);
  const cabinetSnapshot = await cabinetRef.once('value');
  const cabinetData = cabinetSnapshot.val();

  cabinetData.userIds.forEach(async (userId: string) => {
    const userRef = db.ref('utilisateurs/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (userData) {
      const cabinetIds = userData.cabinetIds || [];
      const updatedCabinetIds = cabinetIds.filter((id: string) => id !== req.params.id);
      await userRef.update({ cabinetIds: updatedCabinetIds });
    }
  });

  await db.ref('cabinets/' + req.params.id).remove();
  res.status(200).send({ id: req.params.id });
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.ref('utilisateurs').orderByChild('email').equalTo(email).once('value', (snapshot) => {
    const userData = snapshot.val();
    if (userData) {
      const userId = Object.keys(userData)[0];
      const user = userData[userId];
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (passwordIsValid) {
        const token = jwt.sign({ id: userId }, 'SECRET_KEY', {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(401).send({ auth: false, token: null });
      }
    } else {
      res.status(404).send('No user found.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
