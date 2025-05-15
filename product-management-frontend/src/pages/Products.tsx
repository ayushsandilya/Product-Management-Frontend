import { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, Button, TextField, Grid
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const navigate = useNavigate();

  const fetchProducts = () => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    axios.get(`/products?${query.toString()}`)
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box mt={5}>
          <Typography variant="h4" gutterBottom>Products</Typography>
          <Box mb={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/products/create')}>
              + Add Product
            </Button>
          </Box>

          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField label="Search" name="search" value={filters.search} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Category" name="category" value={filters.category} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField label="Min Price" name="minPrice" type="number" value={filters.minPrice} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField label="Max Price" name="maxPrice" type="number" value={filters.maxPrice} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" onClick={fetchProducts} fullWidth>Search</Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((p: any) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell>{p.rating}</TableCell>
                    <TableCell>
                      <Button onClick={() => navigate(`/products/edit/${p._id}`)}>Edit</Button>
                      <Button color="error" onClick={() => handleDelete(p._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
