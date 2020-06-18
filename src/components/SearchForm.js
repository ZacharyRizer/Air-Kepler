import React, { useState } from 'react';
import { Box, RadioButton, Select, Text } from 'grommet';
import DateInput from './DateInput';

const SearchForm = () => {
  const [arrive, setArrive] = useState('');
  const [depart, setDepart] = useState('');
  const [numPassengers, setNumPassengers] = useState(1);
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
        <DateInput />
      </Box>
      <Box direction="column">
        <Text
          margin={{
            horizontal: 'small',
            bottom: 'xsmall',
            top: 'medium',
          }}>
          Return Date:
        </Text>
        <DateInput />
      </Box>
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
          value={numPassengers}
          onChange={({ option }) => setNumPassengers(option)}
        />
      </Box>
    </Box>
  );
};

export default SearchForm;
