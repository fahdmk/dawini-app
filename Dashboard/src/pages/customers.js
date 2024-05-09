import { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import { format } from "date-fns";
import { Box, Button, Container, Stack, SvgIcon, Typography, Card, InputAdornment, OutlinedInput } from "@mui/material";
import axios from "axios";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { applyPagination } from "src/utils/apply-pagination";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

async function fetchCustomers(page, rowsPerPage) {
  try {
    const response = await axios.get("http://localhost:3000/users", { withCredentials: true });
    const formattedUsers = response.data.map((user) => ({
      ...user,
      creation_date: format(new Date(user.creation_date), "yyyy-MM-dd"),
    }));
    return applyPagination(formattedUsers, page, rowsPerPage);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    if (query.trim() === '') {
      setDisplayUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayUsers(filtered);
    }
    setPage(0);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchCustomers(page, rowsPerPage);
      setUsers(usersData);
      setDisplayUsers(usersData); // synchronize displayUsers with the new users data
    };
    fetchData();
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Users</Typography>
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                fullWidth
                placeholder="Search User"
                onChange={handleSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <MagnifyingGlassIcon />
                    </SvgIcon>
                  </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
              />
            </Card>
            <CustomersTable
              count={displayUsers.length}
              items={displayUsers}
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
