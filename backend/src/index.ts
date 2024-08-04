import express, { Request, Response, NextFunction } from 'express';
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
  databaseURL: 'https://doctopet-54def.europe-west1.firebasedatabase.app/'
});

const db = admin.database();
const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:9000' }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send('Token is required');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) return res.status(500).send('Invalid Token');
    req.body.userId = decoded.id;
    next();
  });
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;
  const userRef = db.ref('utilisateurs/' + userId);
  const snapshot = await userRef.once('value');
  const userData = snapshot.val();

  if (userData && userData.isAdmin) {
    next();
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to DoctoPet Backend');
});

interface Utilisateur {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  isAdmin?: boolean;
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

interface Appointment {
  status: string;
  name: string;
  reason: string;
  date: string;
  userId: string;
}

app.get('/utilisateurs/me', verifyToken, (req: Request, res: Response) => {
  const userId = req.body.userId;

  db.ref('utilisateurs/' + userId).once('value', (snapshot) => {
    if (snapshot.exists()) {
      res.status(200).send(snapshot.val());
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }, (error) => {
    res.status(500).send({ message: 'Error fetching user', error });
  });
});

app.put('/utilisateurs/me', verifyToken, async (req: Request, res: Response) => {
  const { nom, prenom, email }: Partial<Utilisateur> = req.body;
  const userId = req.body.userId;

  try {
    await db.ref('utilisateurs/' + userId).update({
      nom,
      prenom,
      email
    });
    res.status(200).send({ id: userId, nom, prenom, email });
  } catch (error) {
    res.status(500).send({ message: 'Error updating profile', error });
  }
});

app.post('/utilisateurs', async (req: Request, res: Response) => {
  const { nom, prenom, email, password, isAdmin = false }: Utilisateur = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUserRef = db.ref('utilisateurs').push();
  await newUserRef.set({
    nom,
    prenom,
    email,
    password: hashedPassword,
    isAdmin
  });

  res.status(201).send({ id: newUserRef.key, nom, prenom, email, isAdmin });
});

app.get('/utilisateurs', verifyAdmin, (req: Request, res: Response) => {
  db.ref('utilisateurs').once('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  }, (error) => {
    res.status(500).send({ message: 'Error fetching users', error });
  });
});

app.get('/utilisateurs/:id', verifyAdmin, (req: Request, res: Response) => {
  db.ref('utilisateurs/' + req.params.id).once('value', (snapshot) => {
    if (snapshot.exists()) {
      res.status(200).send(snapshot.val());
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }, (error) => {
    res.status(500).send({ message: 'Error fetching user', error });
  });
});

app.put('/utilisateurs/:id', verifyAdmin, async (req: Request, res: Response) => {
  const { nom, prenom, email, password, isAdmin = false }: Utilisateur = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    await db.ref('utilisateurs/' + req.params.id).update({
      nom,
      prenom,
      email,
      password: hashedPassword,
      isAdmin
    });

    res.status(200).send({ id: req.params.id, nom, prenom, email, isAdmin });
  } catch (error) {
    res.status(500).send({ message: 'Error updating user', error });
  }
});

app.delete('/utilisateurs/:id', verifyAdmin, async (req: Request, res: Response) => {
  try {
    await db.ref('utilisateurs/' + req.params.id).remove();
    res.status(200).send({ id: req.params.id });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
});

app.post('/animaux', verifyToken, (req: Request, res: Response) => {
  const { nom, type }: Animal = req.body;
  const proprietaireId = req.body.userId; 

  const newAnimalRef = db.ref('animaux').push();
  newAnimalRef.set({
    nom,
    type,
    proprietaireId
  }, (error) => {
    if (error) {
      res.status(500).send({ message: 'Error creating animal', error });
    } else {
      res.status(201).send({ id: newAnimalRef.key, nom, type, proprietaireId });
    }
  });
});

app.get('/animaux', verifyToken, (req: Request, res: Response) => {
  db.ref('animaux').once('value', (snapshot) => {
    const animals = snapshot.val();
    const userId = req.body.userId;
    const userAnimals = Object.entries(animals || {})
      .filter(([key, animal]: [string, any]) => animal.proprietaireId === userId)
      .map(([key, animal]: [string, any]) => ({ id: key, ...animal }));

    res.status(200).send(userAnimals);
  }, (error) => {
    res.status(500).send({ message: 'Error fetching animals', error });
  });
});

app.get('/animaux/:id', verifyToken, (req: Request, res: Response) => {
  db.ref('animaux/' + req.params.id).once('value', (snapshot) => {
    if (snapshot.exists()) {
      res.status(200).send(snapshot.val());
    } else {
      res.status(404).send({ message: 'Animal not found' });
    }
  }, (error) => {
    res.status(500).send({ message: 'Error fetching animal', error });
  });
});

app.put('/animaux/:id', verifyToken, (req: Request, res: Response) => {
  const { nom, type, proprietaireId }: Animal = req.body;

  db.ref('animaux/' + req.params.id).update({
    nom,
    type,
    proprietaireId
  }, (error) => {
    if (error) {
      res.status(500).send({ message: 'Error updating animal', error });
    } else {
      res.status(200).send({ id: req.params.id, nom, type, proprietaireId });
    }
  });
});

app.delete('/animaux/:id', verifyToken, (req: Request, res: Response) => {
  db.ref('animaux/' + req.params.id).remove((error) => {
    if (error) {
      res.status(500).send({ message: 'Error deleting animal', error });
    } else {
      res.status(200).send({ id: req.params.id });
    }
  });
});

app.post('/cabinets', verifyToken, verifyAdmin, (req: Request, res: Response) => {
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

app.get('/cabinets', verifyToken, (req: Request, res: Response) => {
  db.ref('cabinets').once('value', (snapshot) => {
    const cabinets = snapshot.val();
    const cabinetList = Object.entries(cabinets || {})
      .map(([key, cabinet]: [string, any]) => ({ id: key, ...cabinet }));

    res.status(200).send(cabinetList);
  }, (error) => {
    res.status(500).send({ message: 'Error fetching cabinets', error });
  });
});

app.get('/cabinets/:id', verifyToken, (req: Request, res: Response) => {
  db.ref('cabinets/' + req.params.id).once('value', (snapshot) => {
    if (snapshot.exists()) {
      res.status(200).send(snapshot.val());
    } else {
      res.status(404).send({ message: 'Cabinet not found' });
    }
  }, (error) => {
    res.status(500).send({ message: 'Error fetching cabinet', error });
  });
});

app.put('/cabinets/:id', verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  const { nom, adresse, userIds }: Cabinet = req.body;

  try {
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
  } catch (error) {
    res.status(500).send({ message: 'Error updating cabinet', error });
  }
});

app.delete('/cabinets/:id', verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: 'Error deleting cabinet', error });
  }
});

app.post('/appointments', verifyToken, (req: Request, res: Response) => {
  const { status, name, reason, date, userId }: Appointment = req.body;

  const newAppointmentRef = db.ref('appointments').push();
  newAppointmentRef.set({
    status,
    name,
    reason,
    date,
    userId
  }, (error) => {
    if (error) {
      res.status(500).send({ message: 'Error creating appointment', error });
    } else {
      res.status(201).send({ id: newAppointmentRef.key, status, name, reason, date, userId });
    }
  });
});

app.get('/appointments', verifyToken, (req: Request, res: Response) => {
  db.ref('appointments').once('value', (snapshot) => {
    const appointments = snapshot.val();
    const userId = req.body.userId;
    const userAppointments = Object.entries(appointments || {})
      .filter(([key, appointment]: [string, any]) => appointment.userId === userId)
      .map(([key, appointment]: [string, any]) => ({ id: key, ...appointment }));

    res.status(200).send(userAppointments);
  }, (error) => {
    res.status(500).send({ message: 'Error fetching appointments', error });
  });
});

app.get('/appointments/:id', verifyToken, (req: Request, res: Response) => {
  db.ref('appointments/' + req.params.id).once('value', (snapshot) => {
    if (snapshot.exists()) {
      res.status(200).send(snapshot.val());
    } else {
      res.status(404).send({ message: 'Appointment not found' });
    }
  }, (error) => {
    res.status(500).send({ message: 'Error fetching appointment', error });
  });
});

app.put('/appointments/:id', verifyToken, (req: Request, res: Response) => {
  const { status, name, reason, date, userId }: Appointment = req.body;

  db.ref('appointments/' + req.params.id).update({
    status,
    name,
    reason,
    date,
    userId
  }, (error) => {
    if (error) {
      res.status(500).send({ message: 'Error updating appointment', error });
    } else {
      res.status(200).send({ id: req.params.id, status, name, reason, date, userId });
    }
  });
});

app.delete('/appointments/:id', verifyToken, (req: Request, res: Response) => {
  db.ref('appointments/' + req.params.id).remove((error) => {
    if (error) {
      res.status(500).send({ message: 'Error deleting appointment', error });
    } else {
      res.status(200).send({ id: req.params.id });
    }
  });
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
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY as string, {
          expiresIn: 86400 // 24 hours
        });
        const role = user.isAdmin ? 'admin' : 'user';
        res.status(200).send({ auth: true, token: token, role: role });
      } else {
        res.status(401).send({ auth: false, message: 'Invalid password' });
      }
    } else {
      res.status(404).send({ auth: false, message: 'User not found' });
    }
  }).catch((error) => {
    res.status(500).send({ message: 'Server error', error });
  });
});

app.post('/admin-dashboard', (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.ref('utilisateurs').orderByChild('email').equalTo(email).once('value', (snapshot) => {
    const userData = snapshot.val();
    if (userData) {
      const userId = Object.keys(userData)[0];
      const user = userData[userId];
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (passwordIsValid && user.isAdmin) {
        const token = jwt.sign({ id: userId, isAdmin: true }, process.env.SECRET_KEY as string, {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(401).send({ auth: false, message: 'Invalid password or not an admin' });
      }
    } else {
      res.status(404).send({ auth: false, message: 'Admin not found' });
    }
  }).catch((error) => {
    res.status(500).send({ message: 'Server error', error });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});