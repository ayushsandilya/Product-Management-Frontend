import { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('/products', {
      ...form,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
    });
    navigate('/products');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>Create Product</Typography>
          <form onSubmit={handleSubmit}>
            <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="description" label="Description" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="category" label="Category" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="price" label="Price" type="number" fullWidth margin="normal" onChange={handleChange} />
            <TextField name="rating" label="Rating" type="number" fullWidth margin="normal" onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Create</Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
