import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '../post/components/Menu';
import AllUsers from "../post/pages/AllUsers";



const Routes = ({ user }) => {

  return (
    <div>
      <Router>
        <Box bgcolor="#eeeeee">
          <Menu />
        </Box>
        <Box   >
          <Switch>
        {/* <Route path="/user/:id">
                <User />
            </Route> */}
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
