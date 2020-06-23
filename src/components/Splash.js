import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Box, Button, Image, Layer, Text } from 'grommet';
import { MapLocation, Schedule } from 'grommet-icons';
import SearchForm from './SearchForm';
import { apiBaseUrl } from '../config';

const Splash = () => {
  const { arrive, depart, date, setDistance, setTime, setPrice } = useContext(
    Context
  );
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
        const timeEco = Math.floor(data.distance / 25000 / 24);
        const timePrem = Math.floor(data.distance / 50000 / 24);
        const priceEco = Math.floor((data.distance / 100) * 0.005);
        const pricePrem = Math.floor((data.distance / 100) * 0.008);
        setDistance(distance);
        setTime({ Economy: timeEco, Premium: timePrem });
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
              {planetError ? (
                <Box
                  direction="row"
                  margin={{
                    left: 'large',
                    right: 'medium',
                    top: 'large',
                    bottom: 'medium',
                  }}>
                  <Text alignSelf="center" color={'status-critical'}>
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
          margin={{ horizontal: '20rem', top: '1rem' }}
          background="brand">
          <Text
            margin="small"
            alignSelf="center"
            textAlign="center"
            size="medium"
            style={{ color: 'white' }}>
            Where is the return date you ask? Due to the length of our voyages,
            and the uncertainties of space travel, there is no way for AirKepler
            to guarantee the return flight times. All trips are one way.
          </Text>
        </Box>
      </div>
    </>
  );
};

export default Splash;
