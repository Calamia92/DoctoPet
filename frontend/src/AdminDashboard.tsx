import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField
} from '@mui/material';

interface Utilisateur {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface Animal {
  id?: string;
  nom: string;
  type: string;
  proprietaireId: string;
}

interface Cabinet {
  id?: string;
  nom: string;
  adresse: string;
  userIds: string[];
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [animaux, setAnimaux] = useState<Animal[]>([]);
  const [cabinets, setCabinets] = useState<Cabinet[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [newUser, setNewUser] = useState<Omit<Utilisateur, 'id'>>({ nom: '', prenom: '', email: '', password: '' });
  const [newAnimal, setNewAnimal] = useState<Omit<Animal, 'id'>>({ nom: '', type: '', proprietaireId: '' });
  const [newCabinet, setNewCabinet] = useState<Omit<Cabinet, 'id'>>({ nom: '', adresse: '', userIds: [] });

  const [editingUser, setEditingUser] = useState<Utilisateur | null>(null);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [editingCabinet, setEditingCabinet] = useState<Cabinet | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/utilisateurs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const utilisateurs = Object.keys(userResponse.data).map(key => ({
          id: key,
          ...userResponse.data[key]
        }));
        setUsers(utilisateurs);

        const animauxResponse = await axios.get('http://localhost:3000/animaux', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const animauxData = Object.keys(animauxResponse.data).map(key => ({
          id: key,
          ...animauxResponse.data[key]
        }));
        setAnimaux(animauxData);

        const cabinetsResponse = await axios.get('http://localhost:3000/cabinets', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const cabinetsData = Object.keys(cabinetsResponse.data).map(key => ({
          id: key,
          ...cabinetsResponse.data[key]
        }));
        setCabinets(cabinetsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/utilisateurs', newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers([...users, { ...newUser, id: response.data.id }]);
      setNewUser({ nom: '', prenom: '', email: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = (user: Utilisateur) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      await axios.put(`http://localhost:3000/utilisateurs/${editingUser.id}`, editingUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:3000/utilisateurs/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateAnimal = async () => {
    try {
      const response = await axios.post('http://localhost:3000/animaux', newAnimal, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnimaux([...animaux, { ...newAnimal, id: response.data.id }]);
      setNewAnimal({ nom: '', type: '', proprietaireId: '' });
    } catch (error) {
      console.error('Error creating animal:', error);
    }
  };

  const handleEditAnimal = (animal: Animal) => {
    setEditingAnimal(animal);
  };

  const handleUpdateAnimal = async () => {
    if (!editingAnimal) return;
    try {
      await axios.put(`http://localhost:3000/animaux/${editingAnimal.id}`, editingAnimal, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnimaux(animaux.map(animal => (animal.id === editingAnimal.id ? editingAnimal : animal)));
      setEditingAnimal(null);
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };

  const handleDeleteAnimal = async (animalId: string) => {
    try {
      await axios.delete(`http://localhost:3000/animaux/${animalId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnimaux(animaux.filter(animal => animal.id !== animalId));
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  const handleCreateCabinet = async () => {
    try {
      const response = await axios.post('http://localhost:3000/cabinets', newCabinet, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCabinets([...cabinets, { ...newCabinet, id: response.data.id }]);
      setNewCabinet({ nom: '', adresse: '', userIds: [] });
    } catch (error) {
      console.error('Error creating cabinet:', error);
    }
  };

  const handleEditCabinet = (cabinet: Cabinet) => {
    setEditingCabinet(cabinet);
  };

  const handleUpdateCabinet = async () => {
    if (!editingCabinet) return;
    try {
      await axios.put(`http://localhost:3000/cabinets/${editingCabinet.id}`, editingCabinet, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCabinets(cabinets.map(cabinet => (cabinet.id === editingCabinet.id ? editingCabinet : cabinet)));
      setEditingCabinet(null);
    } catch (error) {
      console.error('Error updating cabinet:', error);
    }
  };

  const handleDeleteCabinet = async (cabinetId: string) => {
    try {
      await axios.delete(`http://localhost:3000/cabinets/${cabinetId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCabinets(cabinets.filter(cabinet => cabinet.id !== cabinetId));
    } catch (error) {
      console.error('Error deleting cabinet:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Utilisateurs" />
        <Tab label="Animaux" />
        <Tab label="Cabinets" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditUser(user)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user.id!)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={2}>
          <Typography variant="h6">Créer Utilisateur</Typography>
          <TextField label="Nom" value={newUser.nom} onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })} />
          <TextField label="Prénom" value={newUser.prenom} onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })} />
          <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <TextField label="Mot de passe" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <Button onClick={handleCreateUser}>Créer Utilisateur</Button>
        </Box>
        {editingUser && (
          <Box my={2}>
            <Typography variant="h6">Modifier Utilisateur</Typography>
            <TextField label="Nom" value={editingUser.nom} onChange={(e) => setEditingUser({ ...editingUser, nom: e.target.value })} />
            <TextField label="Prénom" value={editingUser.prenom} onChange={(e) => setEditingUser({ ...editingUser, prenom: e.target.value })} />
            <TextField label="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
            <TextField label="Mot de passe" type="password" value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} />
            <Button onClick={handleUpdateUser}>Mettre à jour Utilisateur</Button>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Propriétaire</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animaux.map(animal => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.nom}</TableCell>
                  <TableCell>{animal.type}</TableCell>
                  <TableCell>{animal.proprietaireId}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditAnimal(animal)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteAnimal(animal.id!)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={2}>
          <Typography variant="h6">Créer Animal</Typography>
          <TextField label="Nom" value={newAnimal.nom} onChange={(e) => setNewAnimal({ ...newAnimal, nom: e.target.value })} />
          <TextField label="Type" value={newAnimal.type} onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })} />
          <TextField label="Propriétaire ID" value={newAnimal.proprietaireId} onChange={(e) => setNewAnimal({ ...newAnimal, proprietaireId: e.target.value })} />
          <Button onClick={handleCreateAnimal}>Créer Animal</Button>
        </Box>
        {editingAnimal && (
          <Box my={2}>
            <Typography variant="h6">Modifier Animal</Typography>
            <TextField label="Nom" value={editingAnimal.nom} onChange={(e) => setEditingAnimal({ ...editingAnimal, nom: e.target.value })} />
            <TextField label="Type" value={editingAnimal.type} onChange={(e) => setEditingAnimal({ ...editingAnimal, type: e.target.value })} />
            <TextField label="Propriétaire ID" value={editingAnimal.proprietaireId} onChange={(e) => setEditingAnimal({ ...editingAnimal, proprietaireId: e.target.value })} />
            <Button onClick={handleUpdateAnimal}>Mettre à jour Animal</Button>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Utilisateurs</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cabinets.map(cabinet => (
                <TableRow key={cabinet.id}>
                  <TableCell>{cabinet.nom}</TableCell>
                  <TableCell>{cabinet.adresse}</TableCell>
                  <TableCell>{cabinet.userIds ? cabinet.userIds.join(', ') : 'No Users'}</TableCell> {/* Safely handle undefined */}
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditCabinet(cabinet)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteCabinet(cabinet.id!)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={2}>
          <Typography variant="h6">Créer Cabinet</Typography>
          <TextField 
            label="Nom" 
            value={newCabinet.nom} 
            onChange={(e) => setNewCabinet({ ...newCabinet, nom: e.target.value })} 
          />
          <TextField 
            label="Adresse" 
            value={newCabinet.adresse} 
            onChange={(e) => setNewCabinet({ ...newCabinet, adresse: e.target.value })} 
          />
          <TextField 
            label="User IDs (comma-separated)" 
            value={(newCabinet.userIds || []).join(', ')} 
            onChange={(e) => setNewCabinet({ ...newCabinet, userIds: e.target.value.split(', ') })} 
          />
          <Button onClick={handleCreateCabinet}>Créer Cabinet</Button>
        </Box>
        {editingCabinet && (
          <Box my={2}>
            <Typography variant="h6">Modifier Cabinet</Typography>
            <TextField 
              label="Nom" 
              value={editingCabinet.nom} 
              onChange={(e) => setEditingCabinet({ ...editingCabinet, nom: e.target.value })} 
            />
            <TextField 
              label="Adresse" 
              value={editingCabinet.adresse} 
              onChange={(e) => setEditingCabinet({ ...editingCabinet, adresse: e.target.value })} 
            />
            <TextField 
              label="User IDs (comma-separated)" 
              value={(editingCabinet.userIds || []).join(', ')} 
              onChange={(e) => setEditingCabinet({ ...editingCabinet, userIds: e.target.value.split(', ') })} 
            />
            <Button onClick={handleUpdateCabinet}>Mettre à jour Cabinet</Button>
          </Box>
        )}
      </TabPanel>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default AdminDashboard;
