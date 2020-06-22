import React, { useContext } from 'react';
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
    arrive,
    date,
    numPass,
    time,
    distance,
    price,
    flightClass,
  } = useContext(Context);

  const { getTokenSilently, user } = useAuth0();
  const history = useHistory();

  const bookFlight = async () => {
    const token = await getTokenSilently();
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
    history.push('/profile');
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
              {moment(date.split('T')[0]).format('MMMM Do YYYY')}
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Voyage Endpoints:
            </Text>
            <Box direction="row" justify="between" align="center">
              <Text margin="small" size="medium">
                {depart}
              </Text>
              <FormNextLink size="medium" />
              <Text margin="small" size="medium">
                {arrive}
              </Text>
            </Box>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Total Travel Time:
            </Text>
            <Text margin="small" size="medium">
              {time[flightClass]} Days
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Voyage Distance:
            </Text>
            <Text margin="small" size="medium">
              {distance} Mil. km
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
              {flightClass} Class
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
              ${price[flightClass]}
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
              {numPass}
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="small">
            <Text margin="small" size="small">
              Voyage Total:
            </Text>
            <Text margin="small" size="medium" color={'text-strong'}>
              ${price[flightClass] * numPass}
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
  );
};

export default Checkout;
