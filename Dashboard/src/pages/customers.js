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
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';

const useCustomers = async (page, rowsPerPage) => {
  try {
    const response = await axios.get("http://localhost:3001/users", { withCredentials: true });

    const formattedUsers = response.data.map((user) => ({
      ...user,
      creation_date: format(new Date(user.creation_date), 'yyyy-MM-dd'),
    }));

    return applyPagination(formattedUsers, page, rowsPerPage);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const useCustomerIds = (users) => {
  return useMemo(
    () => {
      return users.map((user) => user.idUser);
    },
    [users]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const customersSelection = useSelection([]);
  const CustomerIds = useCustomerIds(users);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleSearch = useCallback(
    (query) => {
      const filtered = users.filter((users) =>
        users.fullname.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filtered); 
      setPage(0);
      console.log(query);
    },
    [users]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await useCustomers(page, rowsPerPage);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
      }
    };
  
    fetchData();
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Users
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              <div>
                {/* <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <CustomersSearch onSearch={handleSearch} /> 
            <CustomersTable
              count={users.length}
              items={users}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
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
