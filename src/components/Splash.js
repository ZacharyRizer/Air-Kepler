import React from 'react';
import { Box, Image, Text } from 'grommet';

const Splash = () => {
  return (
    <>
      <Box direction="row" justify="center">
        <Text margin="small" alignSelf="center" size="large">
          Ready for the trip of a lifetime? Book your next interplanetary
          adventure below!
        </Text>
      </Box>
      <div className="splash_div"></div>
    </>
  );
};

export default Splash;
