import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import axios from 'axios';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProductsTable } from 'src/sections/customer/ProductsTable';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import CreateUserForm from '../components/Forum';

const now = new Date();
const handleDeleteSelected = async () => {
  try {
  
    const selectedIds = selected.map((productId) => productId);

    
    await axios.delete('http://localhost:3000/delete-products', {
      data: { ids: selectedIds }, // Send the selected IDs in the request body
      withCredentials: true,
    });

    onDeselectAll?.();
  } catch (error) {
    console.error('Error deleting products:', error);
  }
};
const useproducts = async (page, rowsPerPage) => {
  try {
    const response = await axios.get("http://localhost:3000/product", { withCredentials: true });

    const formattedproduct = response.data.map((product) => ({
      ...product,
      creation_date: format(new Date(product.lastupdate), 'yyyy-MM-dd'),
    }));

    return applyPagination(formattedproduct, page, rowsPerPage);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const useproductIds = (products) => {
  return useMemo(
    () => {
      return products.map((formattedproduct) => formattedproduct.id);
    },
    [products]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [product, setproduct] = useState([]);
  const productsIds = useproductIds(product);
  const productsSelection = useSelection(productsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );
  const handleSearch = useCallback(
    (query) => {
      const filtered = product.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      setproduct(filtered); 
      setPage(0);
      console.log(query);
    },
    [product]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const productData = await useproducts(page, rowsPerPage);
      setproduct(productData);
    };

    fetchData();
  }, [page, rowsPerPage]);

  
  return (
    <>
      <Head>
        <title>
          Products 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
        <Stack spacing={3} >
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Products
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                </Stack>
              </Stack>
            </Stack>
            <CustomersSearch onSearch={handleSearch} /> 
            <ProductsTable
              count={product.length}
              items={product}
              onDeselectAll={productsSelection.handleDeselectAll}
              onDeselectOne={productsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={productsSelection.handleSelectAll}
              onSelectOne={productsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={productsSelection.selected}
            />
           <CreateUserForm />
          </Stack>
        
        </Container>
        
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
