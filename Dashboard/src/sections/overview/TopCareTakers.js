import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useState, useEffect } from "react";
import axios from "axios";
import Rating from '@mui/material/Rating';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

  
export const TopCareTakers = (props) => {
  const { sx } = props;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/reviews", { withCredentials: true });
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("eeeeeeeeeeee",reviews)
  return (
   <Card sx={sx}>
      <CardHeader title="Reviews" />
      <Scrollbar sx={{ flexGrow: 1, maxHeight:315}}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  User
                </TableCell>
                <TableCell>
                  Stars
                </TableCell>
                <TableCell sortDirection="desc">
                  Nurse
                </TableCell>
                <TableCell>
                  role
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {reviews.map((reviews) => (
                <TableRow
                  hover
                  key={reviews.idReview}
                >
                  <TableCell>
                    {reviews.User.fullName}
                  </TableCell>
                  <TableCell>
                  <Rating name="read-only" value={reviews.numberOfStars} readOnly />
                  </TableCell>
                  <TableCell>
                   {reviews.Caretaker.fullName}
                  </TableCell>
                  <TableCell>
                  {reviews.description}
 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end"}}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

TopCareTakers.propTypes = {
  topcare: PropTypes.array,
  sx: PropTypes.object
};