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
import Rating from '@mui/material/Rating';
import axios from "axios";
export const ProductsTable = (props) => {
  
  const [reviews, setReviews] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reviews", { withCredentials: true });
      setReviews(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleDeleteSelected = async () => {
    const deletePromises = selected.map(idReview => {
        return axios.delete(`http://localhost:3000/api/reviews/${idReview}`);
    });

    try {
        await Promise.all(deletePromises);
        console.log('All selected reviews deleted successfully');
        fetchData();
    } catch (error) {
        console.error('Error deleting reviews:', error);
    }
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
  const selectedSome = (selected.length > 0) && (selected.length < reviews.length);
  const selectedAll = (reviews.length > 0) && (selected.length === reviews.length);
  return (<>
  <Button variant="contained" color="secondary" onClick={handleDeleteSelected} style={{width:200, alignSelf:"flex-end"}}>
    Delete Selected
    </Button>
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
                
                <TableCell>User</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Nurse</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Rating</TableCell>
               
              </TableRow>
            
            </TableHead>
            <TableBody>
            
            {items.map((review) => {
                const isSelected = selected.includes(review.idReview);
    

                return (<>
                
                  <TableRow
                  hover
                  key={review.idReview}  // Add a unique key using product.idproducts
                  selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(review.idReview);
                          } else {
                            onDeselectOne?.(review.idReview);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={review.User.photo_uri}>
                          {getInitials(review.User.fullName)}
                        </Avatar>
                        <Typography variant="subtitle2">{review.User.fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{review.description}</TableCell>
                    <TableCell>{review.Caretaker.fullName}</TableCell>
                    <TableCell>{new Date(review.reviewDate).toISOString().slice(0, 19).replace('T', ' ')}</TableCell>
                    <TableCell><Rating name="read-only" value={review.numberOfStars} readOnly /></TableCell>

                  </TableRow>
                  
                  </>);
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
    
 </> );
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