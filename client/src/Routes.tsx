import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from '@components/molecules/Navbar';
import { AuthGuard } from '@services/auth';
import { App } from '@pages/app/App';
import Home from '@pages/Home';
import SignIn from '@pages/SignIn';

export const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route path="/app">
        <AuthGuard>
          <Route exact path="/app" component={App} />
        </AuthGuard>
      </Route>
    </Switch>
  </>
);
