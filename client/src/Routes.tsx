import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Navbar } from '@/components/molecules/Navbar';
import Tasks from '@/pages/app/Tasks';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';

import { AuthorizedRoute, UnauthorizedRoute } from './services/auth';

export const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <UnauthorizedRoute exact path="/sign-in" component={SignIn} />
      <Route path="/app">
        <Switch>
          <AuthorizedRoute path="/app/tasks" component={Tasks} />
          <Redirect from="/app" to="/app/tasks" />
        </Switch>
      </Route>
    </Switch>
  </>
);
