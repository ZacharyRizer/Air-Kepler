import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Box, ResponsiveContext } from 'grommet';
import history from './utils/history';

import Checkout from './components/Checkout';
import Flights from './components/Flights';
import FourOhFour from './components/404';
import LowFares from './components/LowFares';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Splash from './components/Splash';

function App() {
  const size = useContext(ResponsiveContext);

  return (
    <>
      {size !== 'small' ? (
        <Box fill="vertical" margin={{ horizontal: 'xlarge' }}>
          {/* Don't forget to include the history module */}
          <Router history={history}>
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route path="/" exact component={Splash} />
              <Route path="/flights" component={Flights} />
              <Route path="/low-fares" component={LowFares} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute
                path="/profile/:customerId"
                render={(props) => <Profile {...props} />}
              />
              <Route component={FourOhFour} />
            </Switch>
          </Router>
        </Box>
      ) : (
        <Box fill="vertical">
          {/* Don't forget to include the history module */}
          <Router history={history}>
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route path="/" exact component={Splash} />
              <Route path="/flights" component={Flights} />
              <Route path="/low-fares" component={LowFares} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute
                path="/profile/:customerId"
                render={(props) => <Profile {...props} />}
              />
            </Switch>
          </Router>
        </Box>
      )}
    </>
  );
}

export default App;
