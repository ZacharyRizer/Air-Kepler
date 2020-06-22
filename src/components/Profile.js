import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
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
import { MapLocation, Schedule, FormNextLink } from 'grommet-icons';
import { useAuth0 } from '../react-auth0-spa';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
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
        <Box id="prev_fligts" margin="small" basis="2/3">
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
                  Price
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell scope="col">
                  <strong>1</strong>
                </TableCell>
                <TableCell scope="col">Earth > Mars</TableCell>
                <TableCell scope="col">2020-12-12</TableCell>
                <TableCell scope="col">$100,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box
          id="user_info"
          margin="small"
          background={'background-contrast'}
          basis="1/3">
          <Box height="small" width="small" alignSelf="center">
            <Image fit="cover" src={user.picture} />
          </Box>
          <Text textAlign="center" margin="small">
            {user.name}
          </Text>
          <Text textAlign="center" margin="small">
            {user.email}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
