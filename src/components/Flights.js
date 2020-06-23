import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Heading, Tabs, Tab } from 'grommet';
import { FormNextLink } from 'grommet-icons';

import FlightInfo from './FlightInfo';

const Flights = () => {
  const {
    depart,
    arrive,
    distance,
    time,
    flightClass,
    setFlightClass,
    price,
  } = useContext(Context);
  const [tab, setTab] = useState(0);

  const setClass = (tab) => {
    if (tab === 0) {
      setFlightClass('Economy');
    } else {
      setFlightClass('Premium');
    }
  };

  useEffect(() => {
    if (flightClass === 'Economy') {
      setTab(0);
    } else {
      setTab(1);
    }
  }, [flightClass]);

  return (
    <>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ horizontal: '15rem' }}
        border={{ size: 'xsmall', side: 'bottom' }}>
        <Box direction="row" align="center">
          <Heading margin="xsmall" level={2} color={'text-strong'}>
            Depart:
          </Heading>
          <Heading margin="xsmall" level={2} color={'text-strong'}>
            {depart}
          </Heading>
          <FormNextLink size="medium" />
          <Heading margin="xsmall" level={2} color={'text-strong'}>
            {arrive}
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
        onActive={(tab) => setClass(tab)}
        activeIndex={tab}>
        <Tab title="Economy Class" focusIndicator={false}>
          <FlightInfo
            flight={{
              speed: '25,000 km/h',
              travelTime: `${time.Economy} Days`,
              distance: `${distance} Mil. km`,
              price: `$${price.Economy}`,
            }}
          />
        </Tab>
        <Tab title="Premium Class" focusIndicator={false}>
          <FlightInfo
            flight={{
              speed: '50,000 km/h',
              travelTime: `${time.Premium} Days`,
              distance: `${distance} Mil. km`,
              price: `$${price.Premium}`,
            }}
          />
        </Tab>
      </Tabs>
      <Link
        to="/low-fares"
        style={{ textDecoration: 'none' }}
        className="button_hover">
        <Box
          className="button_hover"
          direction="row"
          justify="center"
          align="center"
          margin={{ horizontal: '15rem' }}
          background="accent"
          round="xsmall">
          <Heading textAlign="center" level={3} className="button_hover">
            Are Your Dates Flexible? Browse Our Lowest Fares!
          </Heading>
        </Box>
      </Link>
    </>
  );
};

export default Flights;
