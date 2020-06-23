import React, { useEffect, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Image } from 'grommet';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  return (
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
          <Link to={`/profile/${userId}`} style={{ textDecoration: 'none' }}>
            <Button label="Profile" margin="5px" color="brand" />
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
  );
};

export default NavBar;
