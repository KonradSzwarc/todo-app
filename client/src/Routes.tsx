import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from '@components/molecules/Navbar';
import { AuthGuard } from '@services/auth';
import { Home } from '@pages/Home';
import { App } from '@pages/app/App';

export const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/app">
        <AuthGuard>
          <Route exact path="/app" component={App} />
        </AuthGuard>
      </Route>
    </Switch>
  </>
);
