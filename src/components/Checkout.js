import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet';
import { MapLocation, Schedule, FormNextLink } from 'grommet-icons';

import FlightInfo from './FlightInfo';

const Checkout = () => {
  const { depart, arrive, date, numPass } = useContext(Context);
  const [flightClass, setFlightClass] = useState('Economy');

  const setClass = (tab) => {
    if (tab === 0) {
      setFlightClass('Economy');
    } else {
      setFlightClass('Premium');
    }
  };

  return (
    <>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ horizontal: '15rem' }}
        border={{ size: 'small', side: 'bottom', color: 'accent' }}>
        <Box direction="row" align="center">
          <Heading margin="small" level={2} color={'text-strong'}>
            Trip & Flight Details
          </Heading>
        </Box>
        <Box
          elevation="medium"
          margin={{
            horizontal: 'medium',
          }}>
          <Link to="/">
            <Button primary label="Modify Voyage" />
          </Link>
        </Box>
      </Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ horizontal: '15rem' }}>
        <Box direction="column" fill="horizontal" margin="medium">
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Departure Date:
            </Text>
            <Text margin="small" size="medium">
              Some date
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Voyage Endpoints:
            </Text>
            <Box direction="row" justify="between" align="center">
              <Text margin="small" size="medium">
                Start
              </Text>
              <FormNextLink size="medium" />
              <Text margin="small" size="medium">
                End
              </Text>
            </Box>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Total Travel Time:
            </Text>
            <Text margin="small" size="medium">
              A long time
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Voyage Distance:
            </Text>
            <Text margin="small" size="medium">
              A very long distance
            </Text>
          </Box>
        </Box>
        <Box
          width="30rem"
          justify="center"
          fill="vertical"
          background="background-contrast">
          <Box
            direction="row"
            justify="between"
            alignContent="center"
            margin="small"
            border={{ size: 'xsmall', side: 'bottom' }}>
            <Text margin="small" size="small">
              Price per Passenger:
            </Text>
            <Text margin="small" size="medium" color={'text-strong'}>
              Price
            </Text>
          </Box>
          <Box
            direction="row"
            justify="between"
            align="center"
            margin="small"
            border={{ size: 'xsmall', side: 'bottom' }}>
            <Text margin="small" size="small">
              Passenger(s):
            </Text>
            <Text margin="small" size="medium" color={'text-strong'}>
              x2
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="small">
            <Text margin="small" size="small">
              Voyage Total:
            </Text>
            <Text margin="small" size="medium" color={'text-strong'}>
              Total
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        direction="row"
        justify="center"
        align="center"
        elevation="large"
        margin={{ horizontal: '15rem' }}
        background="accent">
        <Box margin="medium">
          <Link to="/profile">
            <Button primary color={'status-warning'} label="Confirm Booking" />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Checkout;
