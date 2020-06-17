import React, { useState } from 'react';
import { Box, Select, Text } from 'grommet';

const Splash = () => {
  const [arrive, setArrive] = useState('');
  const [depart, setDepart] = useState('');
  const [numPassengers, setNumPassengers] = useState(1);
  return (
    <>
      <Box direction="row" justify="center">
        <Text margin="small" alignSelf="center" size="large">
          Ready for the trip of a lifetime? Book your next interplanetary
          adventure below!
        </Text>
      </Box>
      <div className="splash_div">
        <Box
          justify="evenly"
          direction="row"
          margin="xlarge"
          background={'background-back'}
          round="xsmall">
          <Select
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
          <Select
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
          <Select
            options={[1, 2, 3, 4]}
            style={{ width: '35px' }}
            value={numPassengers}
            onChange={({ option }) => setNumPassengers(option)}
          />
        </Box>
      </div>
    </>
  );
};

export default Splash;
