import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios'; // Import Axios
import { Box, Stack, SvgIcon, Typography , Card} from '@mui/material';
const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    price: '',
    company: '',
    producer: '',
    stock: '',
    discounts: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post('http://localhost:3001/createProduct', formData);

     console.log(response.data);

      // Reset the form after successful submission
      setFormData({
        productname: '',
        description: '',
        price: '',
        company: '',
        producer: '',
        stock: '',
        discounts: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
  <Card
  sx={{
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    minWidth: 800
  }}
>
   <Container component="main" maxWidth="xl" >
      <Typography component="h1" variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={2} >
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Product name"
              name="productname"
              value={formData.productname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="price"
              name="price"
              type="int"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="delivery company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="producer"
              name="producer"
              value={formData.producer}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="discounts"
              name="discounts"
              value={formData.discounts}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: 'white' }}
        >
          ADD
        </Button>
      </form>
    </Container>
  </Card>
 );
};

export default CreateUserForm;
