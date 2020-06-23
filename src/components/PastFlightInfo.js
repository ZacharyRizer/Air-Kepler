import React from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import moment from 'moment';
const PastFlightInfo = ({ flight, setSelectedFlight }) => {
  return (
    <>
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ horizontal: '15rem' }}
        border={{ size: 'small', side: 'bottom', color: 'accent' }}>
        <Box direction="row" align="center">
          <Heading margin="small" level={4} color={'text'}>
            Flight #{flight.id}
          </Heading>
        </Box>
        <Box
          elevation="xsmall"
          margin={{
            horizontal: 'medium',
          }}>
          <Button
            primary
            label="X"
            color={'status-critical'}
            onClick={() => setSelectedFlight()}
          />
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
              {moment(flight.depart_date.split('T')[0]).format('MMMM Do YYYY')}
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Voyage Endpoints:
            </Text>
            <Box direction="row" justify="between" align="center">
              <Text margin="small" size="medium">
                {flight.depart_loc}
              </Text>
              <FormNextLink size="medium" />
              <Text margin="small" size="medium">
                {flight.arrive_loc}
              </Text>
            </Box>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Total Travel Time:
            </Text>
            <Text margin="small" size="medium">
              {flight.travel_time} Days
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="xsmall">
            <Text margin="small" size="medium">
              Voyage Distance:
            </Text>
            <Text margin="small" size="medium">
              {flight.distance} Mil. km
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
              {flight.ticket_class} Class
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
              ${flight.ticket_price}
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
              {flight.num_pass}
            </Text>
          </Box>
          <Box direction="row" justify="between" align="center" margin="small">
            <Text margin="small" size="small">
              Voyage Total:
            </Text>
            <Text margin="small" size="medium" color={'text-strong'}>
              ${flight.ticket_price * flight.num_pass}
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
        background="accent"
      />
    </>
  );
};

export default PastFlightInfo;
