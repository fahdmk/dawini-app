import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import { useState, useEffect } from "react";
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

export const OverviewLatestProducts = (props) => {
  const handleViewAllClick = () => {
    window.location.href = 'http://localhost:3000/companies';
  };
  const { products = [], sx } = props;
  const [product, setproduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product", { withCredentials: true });
        setproduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
       <List sx={{maxHeight:475}}>
        {product.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(new Date(product.lastupdate), { addSuffix: true });

          return (
            <ListItem
              divider={hasDivider}
              key={product.idproducts}
            >
              <ListItemAvatar>
                {
                  product.photo
                    ? (
                      <Box
                        component="img"
                        src={product.photo}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.productName}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} `}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
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
          onClick={handleViewAllClick} // Attach the click handler
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  product: PropTypes.array,
  sx: PropTypes.object
};
