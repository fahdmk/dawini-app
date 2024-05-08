import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

const SalesComponent = (props) => {
  const { sx } = props;
  const [sales, setsales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments/accepted-total-price', {
                withCredentials: true
            });
            setsales(response.data.totalAcceptedPrice);  
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);
  return (
    <Stack spacing={1}>
      <Typography variant="h4">
        {sales }          TND
      </Typography>
    </Stack>
  );
};

SalesComponent.propTypes = {
  sx: PropTypes.object,
};


export const OverviewTotalProfit = (props) => {
  const { value, sx } = props;

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
              variant="overline"
            >
              Appointments total
            </Typography>
            <Typography variant="h4">
              <SalesComponent/>
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
