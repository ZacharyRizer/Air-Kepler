import React, { useContext } from 'react';
import { Context } from '../Context';
import { Box, Select, Text } from 'grommet';
import DateInput from './DateInput';

const SearchForm = () => {
  const {
    arrive,
    setArrive,
    depart,
    setDepart,
    numPass,
    setNumPass,
  } = useContext(Context);
  return (
    <Box justify="evenly" direction="row">
      <Box direction="column">
        <Text
          margin={{
            horizontal: 'small',
            bottom: 'xsmall',
            top: 'medium',
          }}>
          Departure Planet:
        </Text>
        <Select
          margin={{ bottom: 'medium' }}
          options={[
            'Mercury',
            'Venus',
            'Earth',
            'Mars',
            'Jupiter',
            'Saturn',
            'Uranus',
            'Neptune',
          ]}
          value={depart}
          onChange={({ option }) => setDepart(option)}
        />
      </Box>
      <Box direction="column">
        <Text
          margin={{
            horizontal: 'small',
            bottom: 'xsmall',
            top: 'medium',
          }}>
          Arrival Planet:
        </Text>
        <Select
          margin={{ bottom: 'medium' }}
          options={[
            'Mercury',
            'Venus',
            'Earth',
            'Mars',
            'Jupiter',
            'Saturn',
            'Uranus',
            'Neptune',
          ]}
          value={arrive}
          onChange={({ option }) => setArrive(option)}
        />
      </Box>
      <Box direction="column">
        <Text
          margin={{
            horizontal: 'small',
            bottom: 'xsmall',
            top: 'medium',
          }}>
          Depart Date:
        </Text>
        <DateInput id="departDate" />
      </Box>
      {/* <Box direction="column">
        <Text
          margin={{
            horizontal: 'small',
            bottom: 'xsmall',
            top: 'medium',
          }}>
          Return Date:
        </Text>
        <DateInput id="returnDate" />
      </Box> */}
      <Box direction="column">
        <Text
          margin={{
            horizontal: 'small',
            bottom: 'xsmall',
            top: 'medium',
          }}>
          Passengers:
        </Text>
        <Select
          margin={{ bottom: 'medium' }}
          options={[1, 2, 3, 4]}
          style={{ width: '35px' }}
          value={numPass}
          onChange={({ option }) => setNumPass(option)}
        />
      </Box>
    </Box>
  );
};

export default SearchForm;
