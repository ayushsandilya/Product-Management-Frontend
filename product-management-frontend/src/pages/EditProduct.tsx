import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: '',
  });

  useEffect(() => {
    axios.get(`/products/${id}`).then(res => {
      const { name, description, category, price, rating } = res.data;
      setForm({ name, description, category, price, rating });
    });
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.patch(`/products/${id}`, {
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
          <Typography variant="h5" gutterBottom>Edit Product</Typography>
          <form onSubmit={handleSubmit}>
            <TextField name="name" label="Name" fullWidth margin="normal" value={form.name} onChange={handleChange} />
            <TextField name="description" label="Description" fullWidth margin="normal" value={form.description} onChange={handleChange} />
            <TextField name="category" label="Category" fullWidth margin="normal" value={form.category} onChange={handleChange} />
            <TextField name="price" label="Price" type="number" fullWidth margin="normal" value={form.price} onChange={handleChange} />
            <TextField name="rating" label="Rating" type="number" fullWidth margin="normal" value={form.rating} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Update</Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
