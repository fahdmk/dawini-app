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

const NbrcaretakersComponent = (props) => {
  const { sx } = props;
  const [nbrcaretakers, setnbrcaretakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/caretakers", { withCredentials: true });
        setnbrcaretakers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Stack spacing={1}>
      <Typography variant="h4">
        {nbrcaretakers &&
          nbrcaretakers.map((Caretaker) => (
            <span key={Caretaker.id}>{Caretaker.NumberOfCaretakers}</span>
          ))}
      </Typography>
    </Stack>
  );
};

NbrcaretakersComponent.propTypes = {
  sx: PropTypes.object,
};
export const OverviewTotalCustomers = (props) => {
  const { difference, positive = false, sx } = props;

  return (
   
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
          
            <Typography color="text.secondary" variant="overline">
              Total caretakers
            </Typography>
            <NbrcaretakersComponent />
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
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

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
};
