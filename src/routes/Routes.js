import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '../users/components/Menu';
import AllUsers from "../pages/AllUsers";



const Routes = ({ user }) => {

  return (
    <div>
      <Router>
        <Box>
          <Menu />
        </Box>
        <Box   >
          <Switch>
            <Route path="/">
              <AllUsers user={user} />
            </Route>
          </Switch>
        </Box>
      </Router>
    </div>

  );
};

export default Routes;
