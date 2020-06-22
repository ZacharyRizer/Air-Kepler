import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ContextProvider } from './Context';
import { Box, Grommet } from 'grommet';
import theme from './theme';
import history from './utils/history';

import Checkout from './components/Checkout';
import Flights from './components/Flights';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Splash from './components/Splash';

function App() {
  return (
    <ContextProvider>
      <Grommet theme={theme} full>
        <Box fill="vertical" margin={{ horizontal: 'xlarge' }}>
          {/* Don't forget to include the history module */}
          <Router history={history}>
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route path="/" exact component={Splash} />
              <Route path="/flights" component={Flights} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute
                path="/profile/:customerId"
                render={(props) => <Profile {...props} />}
              />
            </Switch>
          </Router>
        </Box>
      </Grommet>
    </ContextProvider>
  );
}

export default App;
