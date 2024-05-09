import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import axios from "axios";
export const CustomersTable = (props) => {
  
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users", { withCredentials: true });
        setusers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  
  
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  /> */}
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Signed Up
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((users) => {
                const isSelected = selected.includes(users.id);

                return (
                  <TableRow
                    hover
                    key={users.idUser}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(users.idUser);
                          } else {
                            onDeselectOne?.(users.idUser);
                          }
                        }}
                      /> */}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={users.avatar}>
                          {getInitials(users.fullName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {users.fullname}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {users.fullName}
                    </TableCell>
                    <TableCell>
                      {users.email}
                    </TableCell>
                    <TableCell>
                      {users.Adress}
                    </TableCell>
                    <TableCell>
                      {users.phone}
                    </TableCell>
                    <TableCell>
                      {users.creation_date}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25 ,100]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
