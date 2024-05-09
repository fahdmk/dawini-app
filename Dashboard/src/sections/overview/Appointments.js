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

export const Appointments = (props) => {
  const { sx } = props;
  const [appoint, setAppoint] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments/all', {
                withCredentials: true
            });
            setAppoint(response.data);  
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1, maxHeight:315}}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Requested by
                </TableCell>
                <TableCell>
                  Nurse
                </TableCell>
                <TableCell sortDirection="desc">
                  requested at
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appoint.map((appoint) => {
                
                return (
                  <TableRow
                    hover
                    key={appoint.idAppointment}
                  >
                    <TableCell>
                      {appoint.Patient.fullName}
                    </TableCell>
                    <TableCell>
                      {appoint.Caretaker.fullName}
                    </TableCell>
                    <TableCell>
                      {appoint.Date}
                    </TableCell>
                    <TableCell>
                      <SeverityPill>
                      {appoint.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
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

Appointments.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
