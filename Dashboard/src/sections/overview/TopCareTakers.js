import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useState, useEffect } from "react";
import axios from "axios";
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
  const [topcare, settopcare] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/caretaker", { withCredentials: true });
        settopcare(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
   <Card sx={sx}>
      <CardHeader title="Top Care Takers" />
      <Scrollbar sx={{ flexGrow: 1, maxHeight:315}}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Care Taker
                </TableCell>
                <TableCell>
                  nbr of appointments
                </TableCell>
                <TableCell sortDirection="desc">
                  working area
                </TableCell>
                <TableCell>
                  role
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {topcare.map((careTaker) => (
                <TableRow
                  hover
                  key={careTaker.idCareTaker}
                >
                  <TableCell>
                    {careTaker.CaretakerName}
                  </TableCell>
                  <TableCell>
                    {careTaker.NumberOfAppointments}
                  </TableCell>
                  <TableCell>
                    {careTaker.WorkingArea}
                  </TableCell>
                  <TableCell>
                    {careTaker.Role}
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