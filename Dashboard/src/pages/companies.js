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
  
    const selectedIds = selected.map((reviewId) => reviewId);

    
    await axios.delete('http://localhost:3000/delete-products', {
      data: { ids: selectedIds }, // Send the selected IDs in the request body
      withCredentials: true,
    });

    onDeselectAll?.();
  } catch (error) {
    console.error('Error deleting products:', error);
  }
};

const usereviews = async (page, rowsPerPage) => {
  try {
    const response = await axios.get("http://localhost:3000/api/reviews", { withCredentials: true });

    const formattedreview = response.data.map((review) => ({
      ...review,
      creation_date: format(new Date(review.reviewDate), 'yyyy-MM-dd'),
    }));

    return applyPagination(formattedreview, page, rowsPerPage);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const usereviewIds = (reviews) => {
  return useMemo(
    () => {
      return reviews.map((formattedreview) => formattedreview.idReview);
    },
    [reviews]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [review, setReview] = useState([]);
  const [reviews, setReviews] = useState([]);  
  const [displayReviews, setDisplayReviews] = useState([]);
  const reviewsIds = usereviewIds(review);
  const reviewsSelection = useSelection(reviewsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );
  const handleSearch = useCallback(
    (query) => {
      if (query.trim() === '') {
        setDisplayReviews(reviews);
      } else {
        const filtered = reviews.filter((review) =>
          review.description.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayReviews(filtered);
        
      }
      setPage(0); 
    },
    [reviews] 
  );
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReviews = await usereviews(page, rowsPerPage);
      setReviews(fetchedReviews);
      setDisplayReviews(fetchedReviews);
    };

    fetchData();
  }, [page, rowsPerPage]);

  
  return (
    <>
      <Head>
        <title>
          Reviews 
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
                  reviews
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
              count={displayReviews.length}
              items={displayReviews}
              onDeselectAll={reviewsSelection.handleDeselectAll}
              onDeselectOne={reviewsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={reviewsSelection.handleSelectAll}
              onSelectOne={reviewsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={reviewsSelection.selected}
            />
           {/* <CreateUserForm /> */}
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
