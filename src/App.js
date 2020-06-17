import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import theme from './theme';
import history from './utils/history';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Splash from './components/Splash';

function App() {
  return (
    <Grommet theme={theme} full>
      <Box fill="vertical" margin={{ horizontal: 'xlarge' }}>
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact component={Splash} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
