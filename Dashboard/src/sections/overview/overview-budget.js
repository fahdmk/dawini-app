import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import axios from "axios";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

const NbrUsersComponent = (props) => {
  const { sx } = props;
  const [nbrusers, setnbrusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/count', {
                withCredentials: true
            });
            setnbrusers(response.data.totalUsers);  
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);
  return (
    <Stack spacing={1}>
      <Typography color="text.secondary" variant="overline">
        Total patients
      </Typography>
      <Typography variant="h4">
        {nbrusers}
      </Typography>
    </Stack>
  );
};

NbrUsersComponent.propTypes = {
  sx: PropTypes.object,
};

export const OverviewBudget = (props) => {
  const { difference, positive = false, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <NbrUsersComponent sx={sx} />
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        
      </CardContent>
    </Card>
  );
};

OverviewBudget.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
};
