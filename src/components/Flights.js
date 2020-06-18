import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Heading, Image, Layer, Text, Tabs, Tab } from 'grommet';
import { MapLocation, Schedule, FormNextLink } from 'grommet-icons';

import FlightInfo from './FlightInfo';

const Flights = () => {
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
        border={{ size: 'xsmall', side: 'bottom' }}>
        <Box direction="row" align="center">
          <Heading margin="small" level={2} color={'text-strong'}>
            Depart: Depart
          </Heading>
          <FormNextLink size="large" />
          <Heading margin="small" level={2} color={'text-strong'}>
            Arrived
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
      <Tabs
        alignControls="center"
        margin={{ horizontal: '17rem', vertical: '1rem' }}
        onActive={(tab) => setClass(tab)}>
        <Tab title="Economy Class">
          <FlightInfo
            flight={{
              speed: 'slow',
              travelTime: 'long',
              distance: 'long',
              price: 'low',
            }}
          />
        </Tab>
        <Tab title="Premium Class">
          <FlightInfo
            flight={{
              speed: 'fast',
              travelTime: 'show',
              distance: 'show',
              price: 'high',
            }}
          />
        </Tab>
      </Tabs>
      <Box
        direction="row"
        justify="center"
        align="center"
        margin={{ horizontal: '15rem' }}
        background="accent"
        round="xsmall">
        <Heading textAlign="center" level={2}>
          Explore Our Available Options!
        </Heading>
      </Box>
    </>
  );
};

export default Flights;
