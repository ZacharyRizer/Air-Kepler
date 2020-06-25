import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import {
  Box,
  Button,
  Heading,
  ResponsiveContext,
  Select,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  Text,
} from 'grommet';
import moment from 'moment';
import DateInput from './DateInput';
import { apiBaseUrl } from '../config';

const LowFares = () => {
  const {
    depart,
    setDepart,
    arrive,
    setArrive,
    date,
    setDate,
    setDistance,
    setTime,
    setPrice,
  } = useContext(Context);
  const size = useContext(ResponsiveContext);

  const [dates, setDates] = useState([]);
  const [distances, setDistances] = useState([]);
  const [minDistance, setMinDistance] = useState([]);
  const history = useHistory();

  const findLowFares = async () => {
    if (!arrive || !depart) {
      return;
    } else {
      let tempDates = [];
      // create a list of months based off of current date out 1 year
      for (let i = 1; i <= 12; i++) {
        tempDates.push(
          moment(date.split('T')[0]).add(i, 'month').format('YYYY-MM-DD')
        );
      }
      setDates(tempDates);

      const formatDepart = depart.toLowerCase();
      const formatArrive = arrive.toLowerCase();
      const body = {
        depart: formatDepart,
        arrive: formatArrive,
        dates: tempDates,
      };

      const res = await fetch(`${apiBaseUrl}/calculate-low-fares`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res) {
        const data = await res.json();
        setDistances(data.distances);
        setMinDistance(
          data.distances.reduce(
            (min, distance, i) => {
              if (distance < min[0]) {
                return [distance, i];
              } else {
                return min;
              }
            },
            [Infinity, 0]
          )
        );
      }
    }
  };

  const selectFlight = (i) => {
    setDate(moment(dates[i]).toISOString());
    setDistance((distances[i] / 1000000).toFixed(2));
    const timeEco = Math.floor(distances[i] / 25000 / 24);
    const timePrem = Math.floor(distances[i] / 50000 / 24);
    const priceEco = Math.floor((distances[i] / 100) * 0.005);
    const pricePrem = Math.floor((distances[i] / 100) * 0.008);
    setTime({ Economy: timeEco, Premium: timePrem });
    setPrice({ Economy: priceEco, Premium: pricePrem });

    history.push('/flights');
  };

  useEffect(() => {
    if (!arrive || !depart) {
      return;
    } else {
      findLowFares();
    }
  }, []);

  return (
    <>
      {size !== 'small' ? (
        <>
          <Box
            direction="row"
            justify="evenly"
            margin={{ horizontal: '15rem' }}>
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
                required
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
                Search Start Date:
              </Text>
              <DateInput id="departDate" />
            </Box>
            <Box direction="row" align="center">
              <Button
                margin={{ top: 'medium' }}
                primary
                label="Browse Fares"
                onClick={findLowFares}
              />
            </Box>
          </Box>
          <Box
            margin={{ horizontal: '15rem' }}
            round="xsmall"
            border={{ size: 'small', side: 'horizontal', color: 'accent' }}>
            {!distances.length ? (
              <Box
                direction="row"
                justify="center"
                align="center"
                margin={{ vertical: 'xlarge', horizontal: 'large' }}
                background="accent"
                round="xsmall">
                <Heading textAlign="center" level={3}>
                  Please Select Departure and Arrival Locations
                </Heading>
              </Box>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell scope="col" border="bottom">
                      Date
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      Distance
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      Travel Time
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      Price
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dates.map((day, i) =>
                    minDistance[1] !== i ? (
                      <TableRow
                        className="past_flight"
                        key={i}
                        onClick={() => selectFlight(i)}>
                        <TableCell scope="col">
                          {moment(day).format('MMMM YYYY')}
                        </TableCell>
                        <TableCell scope="col">
                          {(distances[i] / 1000000).toFixed(2)} Mil. km
                        </TableCell>
                        <TableCell scope="col">
                          {Math.floor(distances[i] / 25000 / 24)} Days
                        </TableCell>
                        <TableCell scope="col">
                          ${Math.floor((distances[i] / 100) * 0.005)}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow
                        className="past_flight lowest_fare"
                        key={i}
                        onClick={() => selectFlight(i)}>
                        <TableCell scope="col">
                          {moment(day).format('MMMM YYYY')}
                        </TableCell>
                        <TableCell scope="col">
                          {(distances[i] / 1000000).toFixed(2)} Mil. km
                        </TableCell>
                        <TableCell scope="col">
                          {Math.floor(distances[i] / 25000 / 24)} Days
                        </TableCell>
                        <TableCell scope="col">
                          ${Math.floor((distances[i] / 100) * 0.005)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}
          </Box>
        </>
      ) : (
        <>
          <Box direction="column" fill="vertical">
            <Box basis="1/3">
              <Box direction="row">
                <Box direction="column">
                  <Text margin="xsmall">Departure Planet:</Text>
                  <Select
                    margin="xsmall"
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
                    required
                  />
                </Box>
                <Box direction="column">
                  <Text margin="xsmall">Arrival Planet:</Text>
                  <Select
                    margin="xsmall"
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
              </Box>
              <Button
                margin={{ horizontal: 'large', vertical: 'xsmall' }}
                primary
                label="Browse Fares"
                onClick={findLowFares}
              />
            </Box>
            <Box
              overflow="auto"
              basis="2/3"
              border={{ size: 'xsmall', side: 'horizontal', color: 'accent' }}>
              {!distances.length ? null : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell scope="col" border="bottom">
                        Date
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Distance
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Price
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dates.map((day, i) =>
                      minDistance[1] !== i ? (
                        <TableRow
                          className="past_flight"
                          key={i}
                          onClick={() => selectFlight(i)}>
                          <TableCell scope="col">
                            {moment(day).format('MMMM YYYY')}
                          </TableCell>
                          <TableCell scope="col">
                            {(distances[i] / 1000000).toFixed(2)} Mil. km
                          </TableCell>
                          <TableCell scope="col">
                            ${Math.floor((distances[i] / 100) * 0.005)}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow
                          key={i}
                          className="lowest_fare"
                          onClick={() => selectFlight(i)}>
                          <TableCell scope="col">
                            {moment(day).format('MMMM YYYY')}
                          </TableCell>
                          <TableCell scope="col">
                            {(distances[i] / 1000000).toFixed(2)} Mil. km
                          </TableCell>
                          <TableCell scope="col">
                            ${Math.floor((distances[i] / 100) * 0.005)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default LowFares;
