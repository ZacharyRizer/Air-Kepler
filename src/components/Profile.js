import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Image,
  Layer,
  Text,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from 'grommet';
import { useAuth0 } from '../react-auth0-spa';
import { apiBaseUrl } from '../config';
import PastFlightInfo from './PastFlightInfo';
import moment from 'moment';

const Profile = (props) => {
  const { loading, getTokenSilently, user } = useAuth0();
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState();
  const id = props.match.params.customerId;

  useEffect(() => {
    if (!user) return;

    const fetchFlights = async () => {
      const token = await getTokenSilently();
      const res = await fetch(`${apiBaseUrl}/flights/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const flights = await res.json();
      setFlights(flights);
    };
    fetchFlights();
  }, [user, id, getTokenSilently]);

  useEffect(() => {
    console.log(selectedFlight);
  }, [selectedFlight]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box direction="column" margin={{ horizontal: '15rem' }}>
        <Box
          direction="row"
          justify="between"
          align="center"
          border={{ size: 'small', side: 'bottom', color: 'accent' }}>
          <Box direction="row" align="center" margin="xsmall">
            <Heading margin="small" level={4} color={'text-strong'}>
              Hello {user.nickname}
            </Heading>
          </Box>
          <Box elevation="medium" margin={{ horizontal: 'medium' }}>
            <Link to="/">
              <Button primary label="Book Another Flight" />
            </Link>
          </Box>
        </Box>
        <Box direction="row" justify="between">
          <Box id="prev_fligts" margin="small" basis="3/4">
            <Box border={{ size: 'small', side: 'bottom', color: 'accent' }}>
              <Heading level={4}>Previously Booked Trips:</Heading>
            </Box>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    Flight Number
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Itenerary
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Depart Date
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Total Price
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flights.map((flight) => (
                  <TableRow
                    className="past_flight"
                    key={flight.id}
                    onClick={() => setSelectedFlight(flight)}>
                    <TableCell scope="col">
                      <strong>{flight.id}</strong>
                    </TableCell>
                    <TableCell scope="col">
                      {flight.depart_loc} > {flight.arrive_loc}
                    </TableCell>
                    <TableCell scope="col">
                      {moment(flight.depart_date.split('T')[0]).format(
                        'MMMM Do YYYY'
                      )}
                    </TableCell>
                    <TableCell scope="col">
                      ${flight.ticket_price * flight.num_pass}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box
            id="user_info"
            background={'background-contrast'}
            basis="1/4"
            border={{ size: 'xsmall', color: 'accent' }}
            justify="space-between">
            <Box width="100%" alignSelf="center">
              <Image fit="cover" fill="horizontal" src={user.picture} />
            </Box>
            <Box
              border={{ size: 'xsmall', side: 'bottom' }}
              margin="small"
              alignContent="center">
              <Text textAlign="center" margin="small">
                {user.name}
              </Text>
            </Box>
            <Text textAlign="center" margin="small">
              {user.email}
            </Text>
          </Box>
        </Box>
      </Box>
      {selectedFlight && (
        <Layer
          onEsc={() => setSelectedFlight()}
          onClick={() => setSelectedFlight()}
          onClickOutside={() => setSelectedFlight()}>
          <PastFlightInfo
            flight={selectedFlight}
            setSelectedFlight={setSelectedFlight}
          />
        </Layer>
      )}
    </>
  );
};

export default Profile;
