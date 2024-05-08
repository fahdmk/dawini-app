import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
  Text
} from '@mui/material';
const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

const NbappointmentsComponent = (props) => {
  const { sx } = props;
  const [nbrappointments, setnbrappointments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments/accepted-count', {
                withCredentials: true
            });
            setnbrappointments(response.data.acceptedCount);  
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);
  
  return (
    <Stack spacing={1}>
      <Typography variant="h4">
        {nbrappointments }
      </Typography>
    </Stack>
  );
  
};
export const OverviewTasksProgress = (props) => {
  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Number of accepted appointments
            </Typography>
            <Typography variant="h4">
              <NbappointmentsComponent/>
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
