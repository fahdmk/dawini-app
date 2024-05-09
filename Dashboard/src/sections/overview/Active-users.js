import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useState, useEffect } from "react";
import { SeverityPill } from 'src/components/severity-pill';
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Scrollbar
} from '@mui/material';

export const ActiveUsers = (props) => {
  const handleViewAllClick = () => {
    window.location.href = 'http://localhost:3000/companies';
  };
  const { products = [], sx } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/sorted-by-appointments', {
                withCredentials: true
            });
            setUsers(response.data);  
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

  return (
    <Card sx={sx} style={{ display: 'flex', flexDirection: 'column' }}>
      <>
      <CardHeader title="Most Active Users" />
      <Divider/>
       <Box sx={{maxHeight:500, overflow: 'auto'}}>
       <List>
        {users.map((users, index) => {
          const hasDivider = index < users.length - 1;
          const ago = formatDistanceToNow(new Date(users.creation_date), { addSuffix: true });
          return (
            <ListItem
              divider={hasDivider}
              key={users.idUser}
            >
              <ListItemAvatar>
              <Box
                  component="img"
                  src={users.photo_uri ||"/hero1.jpg"}
                  sx={{
                    borderRadius: 1,
                    height: 50,
                    width: 50
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={users.fullName}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Created ${ago} `}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <SeverityPill>
              {users.appointmentCount} appointments booked
                      </SeverityPill>
             
            </ListItem>
          );
        })}
      </List>
      </Box>
      <Divider />
      <Box sx={{ backgroundColor: "white", flex: 1, p: 2 }}>
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
          onClick={handleViewAllClick} 
          >
          View all
        </Button>
      </CardActions>
      </Box>
      </>
      </Card>
  );
};

ActiveUsers.propTypes = {
  users: PropTypes.array,
  sx: PropTypes.object
};
