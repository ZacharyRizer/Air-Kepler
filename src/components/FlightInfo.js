import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Heading } from 'grommet';
import moment from 'moment';

const FlightInfo = ({ flight }) => {
  const { date } = useContext(Context);
  return (
    <Box direction="column" margin={{ vertical: '1rem' }}>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin="xsmall"
        border={{ size: 'xsmall', side: 'bottom' }}>
        <Heading margin="small" level={4}>
          Cruising Speed:
        </Heading>
        <Heading margin="small" level={4}>
          {flight.speed}
        </Heading>
      </Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin="xsmall"
        border={{ size: 'xsmall', side: 'bottom' }}>
        <Heading margin="small" level={4}>
          Total Travel Time:
        </Heading>
        <Heading margin="small" level={4}>
          {flight.travelTime}
        </Heading>
      </Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin="xsmall"
        border={{ size: 'xsmall', side: 'bottom' }}>
        <Heading margin="small" level={4}>
          Voyage Distance:
        </Heading>
        <Heading margin="small" level={4}>
          {flight.distance}
        </Heading>
      </Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin="xsmall"
        border={{ size: 'xsmall', side: 'bottom' }}>
        <Heading margin="small" level={4}>
          Price:
        </Heading>
        <Heading margin="small" level={4}>
          {flight.price}
        </Heading>
      </Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ vertical: 'medium' }}>
        <Heading margin="small" level={5} color="brand">
          Departing on {moment(date.split('T')[0]).format('MMMM Do YYYY')}
        </Heading>
        <Box elevation="medium">
          <Link to="/checkout">
            <Button primary color={'status-warning'} label="Book Voyage" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightInfo;
