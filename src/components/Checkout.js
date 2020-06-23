import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Heading, Text } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import moment from 'moment';
import { useAuth0 } from '../react-auth0-spa';
import { apiBaseUrl } from '../config';

const Checkout = () => {
  const {
    depart,
    setDepart,
    arrive,
    setArrive,
    date,
    setDate,
    numPass,
    setNumPass,
    time,
    setTime,
    distance,
    setDistance,
    price,
    setPrice,
    flightClass,
    setFlightClass,
  } = useContext(Context);

  const flightInfo = JSON.parse(localStorage.getItem('flightInfo'));
  const { getTokenSilently, user } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!flightInfo) return;
    setDepart(flightInfo.depart);
    setArrive(flightInfo.arrive);
    setDate(flightInfo.date);
    setNumPass(flightInfo.numPass);
    setTime(flightInfo.time);
    setDistance(flightInfo.distance);
    setPrice(flightInfo.price);
    setFlightClass(flightInfo.flightClass);
  }, []);

  const resetState = () => {
    setDepart('');
    setArrive('');
    setDate(new Date().toISOString());
    setNumPass(1);
    setTime({});
    setDistance(0);
    setPrice({});
    setFlightClass('Economy');
  };

  const bookFlight = async () => {
    const token = await getTokenSilently();
    try {
      const res = await fetch(`${apiBaseUrl}/flights`, {
        method: 'POST',
        body: JSON.stringify({
          customer_id: user.userId,
          depart_date: date,
          depart_loc: depart,
          arrive_loc: arrive,
          num_pass: numPass,
          ticket_price: price[flightClass],
          ticket_class: flightClass,
          distance: distance,
          travel_time: time[flightClass],
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Something went wrong with fetch');
      }
      localStorage.removeItem('flightInfo');
      resetState();
      history.push(`/profile/${user.userId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {!flightInfo ? null : (
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
              <Box
                direction="row"
                justify="between"
                align="center"
                margin="xsmall">
                <Text margin="small" size="medium">
                  Departure Date:
                </Text>
                <Text margin="small" size="medium">
                  {moment(flightInfo.date.split('T')[0]).format('MMMM Do YYYY')}
                </Text>
              </Box>
              <Box
                direction="row"
                justify="between"
                align="center"
                margin="xsmall">
                <Text margin="small" size="medium">
                  Voyage Endpoints:
                </Text>
                <Box direction="row" justify="between" align="center">
                  <Text margin="small" size="medium">
                    {flightInfo.depart}
                  </Text>
                  <FormNextLink size="medium" />
                  <Text margin="small" size="medium">
                    {flightInfo.arrive}
                  </Text>
                </Box>
              </Box>
              <Box
                direction="row"
                justify="between"
                align="center"
                margin="xsmall">
                <Text margin="small" size="medium">
                  Total Travel Time:
                </Text>
                <Text margin="small" size="medium">
                  {flightInfo.time[flightInfo.flightClass]} Days
                </Text>
              </Box>
              <Box
                direction="row"
                justify="between"
                align="center"
                margin="xsmall">
                <Text margin="small" size="medium">
                  Voyage Distance:
                </Text>
                <Text margin="small" size="medium">
                  {flightInfo.distance} Mil. km
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
                border={{ size: 'small', side: 'bottom', color: 'text' }}>
                <Text margin="small" size="medium" color={'text-strong'}>
                  {flightInfo.flightClass} Class
                </Text>
              </Box>
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
                  ${flightInfo.price[flightInfo.flightClass]}
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
                  {flightInfo.numPass}
                </Text>
              </Box>
              <Box
                direction="row"
                justify="between"
                align="center"
                margin="small">
                <Text margin="small" size="small">
                  Voyage Total:
                </Text>
                <Text margin="small" size="medium" color={'text-strong'}>
                  $
                  {flightInfo.price[flightInfo.flightClass] *
                    flightInfo.numPass}
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
              <Button
                primary
                color={'status-warning'}
                label="Confirm Booking"
                onClick={bookFlight}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Checkout;
