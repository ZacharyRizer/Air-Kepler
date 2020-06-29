import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Image, Layer, ResponsiveContext, Text } from 'grommet';
import { MapLocation, Schedule } from 'grommet-icons';
import SearchForm from './SearchForm';
import { apiBaseUrl } from '../config';

const Splash = () => {
  const { arrive, depart, date, setDistance, setTime, setPrice } = useContext(
    Context
  );
  const size = useContext(ResponsiveContext);
  const [show, setShow] = useState();
  const [planetError, setPlanetError] = useState(false);
  const history = useHistory();

  const handleSearch = async () => {
    if (!arrive || !depart) {
      setPlanetError(true);
      return;
    } else {
      const formatDate = date.split('T')[0];
      const formatDepart = depart.toLowerCase();
      const formatArrive = arrive.toLowerCase();
      const body = {
        depart: formatDepart,
        arrive: formatArrive,
        date: formatDate,
      };

      const res = await fetch(`${apiBaseUrl}/calculate-trip`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res) {
        const data = await res.json();
        const distance = (data.distance / 1000000).toFixed(2);
        const time = Math.floor(data.distance / 25000 / 24);
        const priceEco = Math.floor((data.distance / 100) * 0.005);
        const pricePrem = Math.floor((data.distance / 100) * 0.008);
        setDistance(distance);
        setTime(time);
        setPrice({ Economy: priceEco, Premium: pricePrem });
        history.push('/flights');
      }
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
      {size !== 'small' ? (
        <>
          <Text margin="small" alignSelf="center" size="large">
            Ready for the trip of a lifetime? Book your next interplanetary
            adventure below!
          </Text>
          <div className="splash_div">
            <Box
              justify="evenly"
              direction="column"
              margin={{ horizontal: 'auto', top: '10rem' }}
              width="72rem"
              background={'background-back'}>
              <SearchForm />
              <Box direction="row" id="subBar" justify="between">
                <Box direction="row">
                  <Button focusIndicator={false} onClick={() => setShow(true)}>
                    <Box
                      direction="row"
                      margin={{
                        horizontal: 'large',
                        top: 'large',
                        bottom: 'medium',
                      }}>
                      <MapLocation color="brand" />
                      <Text className="button_hover" margin={{ left: 'small' }}>
                        Where we fly
                      </Text>
                    </Box>
                  </Button>
                  <Button focusIndicator={false}>
                    <Link to="/low-fares" style={{ textDecoration: 'none' }}>
                      <Box
                        direction="row"
                        margin={{
                          horizontal: 'large',
                          top: 'large',
                          bottom: 'medium',
                        }}>
                        <Schedule color="brand" />
                        <Text
                          className="button_hover"
                          margin={{ left: 'small' }}
                          color="text">
                          Browse Lowest Fares
                        </Text>
                      </Box>
                    </Link>
                  </Button>
                  {planetError ? (
                    <Box
                      direction="row"
                      margin={{
                        left: 'medium',
                        right: 'medium',
                        top: 'large',
                        bottom: 'medium',
                      }}>
                      <Text
                        alignSelf="center"
                        weight="bold"
                        color={'status-critical'}>
                        Please Select a Departure and Arrival Location
                      </Text>
                    </Box>
                  ) : null}
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
              width="55rem"
              margin={{ horizontal: 'auto', top: 'medium' }}
              background="brand">
              <Text
                margin="small"
                textAlign="center"
                size="medium"
                style={{ color: 'white' }}>
                Where is the return date you ask? Due to the length of our
                voyages, and the uncertainties of space travel, there is no way
                for AirKepler to guarantee the return flight times. All trips
                are one way.
              </Text>
            </Box>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <Box
                className="button_hover"
                direction="row"
                justify="center"
                round="xsmall"
                width="40rem"
                margin={{ horizontal: 'auto', top: '13rem' }}
                background="brand">
                <Text
                  textAlign="center"
                  size="medium"
                  margin={{ vertical: 'small' }}>
                  To learn about how the distances and travel times are
                  estimated, click here!
                </Text>
              </Box>
            </Link>
          </div>
        </>
      ) : (
        <Box direction="column" flex="false" overflow="auto">
          <Box direction="row" justify="center" background="brand">
            <Text margin="xsmall" alignSelf="center" size="xsmall">
              Ready for the trip of a lifetime? Book Now!
            </Text>
          </Box>
          <Box justify="evenly" direction="column" margin="small">
            <SearchForm />
            {planetError ? (
              <Text alignSelf="center" color={'status-critical'}>
                Please Select Destinations
              </Text>
            ) : null}
            <Box
              elevation="medium"
              margin={{
                horizontal: 'large',
                top: 'large',
                bottom: 'medium',
              }}>
              <Button primary label="Find A Flight" onClick={handleSearch} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Splash;
