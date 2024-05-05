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
  Typography,
  Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import axios from "axios";
export const ProductsTable = (props) => {
  
  const [product, setproduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/product", { withCredentials: true });
        setproduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  const handleDeleteSelected = () => {
    const selectedIds = selected.map((productId) => productId);
  

    axios.delete(`http://localhost:3001/product/${selectedIds[0]}`)
      .then((response) => {
        console.log(response.data);
        // Handle success or update UI accordingly
      })
      .catch((error) => {
        console.error('Error deleting products:', error);
        // Handle error or update UI accordingly
      });
  };
  
    const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  const selectedSome = (selected.length > 0) && (selected.length < product.length);
  const selectedAll = (product.length > 0) && (selected.length === product.length);
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                
                <TableCell>product name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>stock</TableCell>
                <TableCell>discounts</TableCell>
                <TableCell>last update</TableCell>
                <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
                  Delete Selected
                  </Button>
              </TableRow>
            
            </TableHead>
            <TableBody>
            {items.map((product) => {
                const isSelected = selected.includes(product.idproducts);
    

                return (
                  <TableRow
                  hover
                  key={product.idproducts}  // Add a unique key using product.idproducts
                  selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(product.idproducts);
                          } else {
                            onDeselectOne?.(product.idproducts);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={product.avatar}>
                          {getInitials(product.productName)}
                        </Avatar>
                        <Typography variant="subtitle2">{product.productName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.Price}</TableCell>
                    <TableCell>{product.Stock}</TableCell>
                    <TableCell>{product.discounts}</TableCell>
                    <TableCell>{new Date(product.lastupdate).toISOString().slice(0, 19).replace('T', ' ')}</TableCell>
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
  
  ProductsTable.propTypes = {
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