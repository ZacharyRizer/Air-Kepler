import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Heading, ResponsiveContext, Text } from 'grommet';
import moment from 'moment';

const FlightInfo = ({ flight }) => {
  const {
    date,
    depart,
    arrive,
    distance,
    time,
    numPass,
    price,
    flightClass,
  } = useContext(Context);
  const size = useContext(ResponsiveContext);
  const history = useHistory();

  const bookFlight = () => {
    localStorage.setItem(
      'flightInfo',
      JSON.stringify({
        date,
        depart,
        arrive,
        distance,
        time,
        numPass,
        price,
        flightClass,
      })
    );
    history.push('/checkout');
  };
  return (
    <>
      {size !== 'small' ? (
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
              <Button
                primary
                color={'status-warning'}
                label="Book Voyage"
                onClick={bookFlight}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box direction="column" margin="small">
          <Box
            direction="row"
            justify="between"
            align="center"
            margin="xsmall"
            border={{ size: 'xsmall', side: 'bottom' }}>
            <Text margin="small" level={4}>
              Cruising Speed:
            </Text>
            <Text margin="small" level={4}>
              {flight.speed}
            </Text>
          </Box>
          <Box
            direction="row"
            justify="between"
            align="center"
            margin="xsmall"
            border={{ size: 'xsmall', side: 'bottom' }}>
            <Text margin="small" level={4}>
              Total Travel Time:
            </Text>
            <Text margin="small" level={4}>
              {flight.travelTime}
            </Text>
          </Box>
          <Box
            direction="row"
            justify="between"
            align="center"
            margin="xsmall"
            border={{ size: 'xsmall', side: 'bottom' }}>
            <Text margin="small" level={4}>
              Voyage Distance:
            </Text>
            <Text margin="small" level={4}>
              {flight.distance}
            </Text>
          </Box>
          <Box
            direction="row"
            justify="between"
            align="center"
            margin="xsmall"
            border={{ size: 'xsmall', side: 'bottom' }}>
            <Text margin="small" level={4}>
              Price:
            </Text>
            <Text margin="small" level={4}>
              {flight.price}
            </Text>
          </Box>
          <Text margin="small" textAlign="center" color="brand">
            Departing on {moment(date.split('T')[0]).format('MMMM Do YYYY')}
          </Text>
          <Box elevation="medium" margin={{ vertical: 'small' }}>
            <Button
              primary
              color={'status-warning'}
              label="Book Voyage"
              onClick={bookFlight}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FlightInfo;
