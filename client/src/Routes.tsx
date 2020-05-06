import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from '@components/molecules/Navbar';
import { AuthGuard } from '@services/auth';
import { App } from '@pages/app/App';
import { routing } from './routes/routing';

export const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route {...routing.home.route} />
      <Route {...routing.about.route} />
      <Route {...routing.signIn.route} />
      <Route {...routing.contact.route} />
      <Route path="/app">
        <AuthGuard>
          <Route exact path="/app" component={App} />
        </AuthGuard>
      </Route>
    </Switch>
  </>
);
