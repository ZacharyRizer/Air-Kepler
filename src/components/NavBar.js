import React, { useEffect, useContext, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Heading, Image, Menu, ResponsiveContext } from 'grommet';

const NavBar = () => {
  const history = useHistory();
  const size = useContext(ResponsiveContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  return (
    <>
      {size !== 'small' ? (
        <Box
          direction="row"
          align="center"
          justify="around"
          border={{ color: 'brand', size: 'xsmall', side: 'bottom' }}
          pad="small">
          <Link to="/">
            <Button focusIndicator={false}>
              <Box direction="row" align="center" justify="evenly">
                <Heading
                  className="button_hover"
                  level="3"
                  margin="small"
                  color="brand">
                  AirKepler
                </Heading>
                <Box height="xxsmall" width="xxsmall" margin="small">
                  <Image fit="cover" src="/images/orbiting.svg" />
                </Box>
              </Box>
            </Button>
          </Link>
          {!isAuthenticated && (
            <Button
              label="Login"
              margin="5px"
              onClick={() => loginWithRedirect({})}
            />
          )}
          {isAuthenticated && (
            <Box direction="row">
              <Link
                to={`/profile/${userId}`}
                style={{ textDecoration: 'none' }}>
                <Button label="Account" margin="5px" color="brand" />
              </Link>
              <Button
                label="Logout"
                margin="5px"
                color="brand"
                onClick={() => logout()}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box
          direction="row"
          align="center"
          justify="between"
          border={{ color: 'brand', size: 'xsmall', side: 'bottom' }}>
          <Link to="/">
            <Button focusIndicator={false}>
              <Box direction="row" align="center" justify="evenly">
                <Box height="xxsmall" width="xxsmall" margin="small">
                  <Image fit="cover" src="/images/orbiting.svg" />
                </Box>
                <Heading
                  className="button_hover"
                  level="6"
                  margin="small"
                  color="brand">
                  AirKepler
                </Heading>
              </Box>
            </Button>
          </Link>
          {!isAuthenticated && (
            <Menu
              items={[
                { label: 'Login', onClick: () => loginWithRedirect({}) },
                {
                  label: 'Find Low Fares',
                  onClick: () => history.push('/low-fares'),
                },
                {
                  label: 'Travel Calculations',
                  onClick: () => history.push('/about'),
                },
              ]}
            />
          )}
          {isAuthenticated && (
            <Menu
              items={[
                {
                  label: 'Account',
                  onClick: () => history.push(`/profile/${userId}`),
                },
                {
                  label: 'Find Low Fares',
                  onClick: () => history.push('/low-fares'),
                },
                {
                  label: 'Travel Calculations',
                  onClick: () => history.push('/about'),
                },
                { label: 'Logout', onClick: () => logout() },
              ]}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default NavBar;
