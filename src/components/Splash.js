import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Image, Layer, Text } from 'grommet';
import { MapLocation, Schedule } from 'grommet-icons';
import SearchForm from './SearchForm';

const Splash = () => {
  const { arrive, depart, date, numPass } = useContext(Context);
  const [show, setShow] = useState();
  const history = useHistory();

  const handleSearch = () => {
    if (!arrive || !depart) {
      return;
    } else {
      console.log([arrive, depart, date, numPass]);
      history.push('/flights');
    }
  };

  return (
    <>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClick={() => setShow(false)}
          onClickOutside={() => setShow(false)}>
          <Image src="/images/Planets.svg" />
        </Layer>
      )}
      <Box direction="row" justify="center">
        <Text margin="small" alignSelf="center" size="large">
          Ready for the trip of a lifetime? Book your next interplanetary
          adventure below!
        </Text>
      </Box>
      <div className="splash_div">
        <Box
          justify="evenly"
          direction="column"
          margin={{ horizontal: '10rem', top: '10rem' }}
          background={'background-back'}>
          <SearchForm />
          <Box direction="row" id="subBar" justify="between">
            <Box direction="row">
              <Button onClick={() => setShow(true)}>
                <Box
                  direction="row"
                  margin={{
                    horizontal: 'large',
                    top: 'large',
                    bottom: 'medium',
                  }}>
                  <MapLocation color="brand" />
                  <Text margin={{ left: 'small' }}>Where we fly</Text>
                </Box>
              </Button>
              <Button>
                <Link to="/low-fares" style={{ textDecoration: 'none' }}>
                  <Box
                    direction="row"
                    margin={{
                      horizontal: 'large',
                      top: 'large',
                      bottom: 'medium',
                    }}>
                    <Schedule color="brand" />
                    <Text margin={{ left: 'small' }} color="text">
                      Lowest Fare Dates
                    </Text>
                  </Box>
                </Link>
              </Button>
            </Box>
            <Box
              elevation="medium"
              margin={{
                horizontal: 'large',
                top: 'large',
                bottom: 'medium',
              }}>
              <Button primary label="Search" onClick={handleSearch} />
            </Box>
          </Box>
        </Box>
        <Box
          justify="evenly"
          direction="column"
          round="xsmall"
          margin={{ horizontal: '20rem', top: '1rem' }}
          background="brand">
          <Text
            margin="small"
            alignSelf="center"
            textAlign="center"
            size="medium"
            style={{ color: 'white' }}>
            Where is the return date you ask? Due to the length of our voyages,
            and the uncertainties of space travel, there is no way for SpaceWest
            to guarantee the return flight times. All trips are one way.
          </Text>
        </Box>
      </div>
    </>
  );
};

export default Splash;
