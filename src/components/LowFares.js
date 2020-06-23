import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import {
  Box,
  Button,
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
    flightClass,
    setFlightClass,
    setDistance,
    setTime,
    setPrice,
  } = useContext(Context);

  const [dates, setDates] = useState([]);
  const [distances, setDistances] = useState([]);
  const history = useHistory();

  const findLowFares = async () => {
    if (!arrive || !depart) {
      // setPlanetError(true);
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
      <Box
        direction="row"
        justify="evenly"
        margin={{ horizontal: '15rem' }}
        border={{ size: 'xsmall', side: 'bottom' }}>
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
        border={{ size: 'xsmall', side: 'bottom' }}>
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
                  Travel Time
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Price
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dates.map((day, i) => (
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
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default LowFares;
