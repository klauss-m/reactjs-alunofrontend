import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Students } from './pages/Students';
import { StudentForm } from './pages/Form';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/students" exact component={Students} />
      <Route path="/students_new" exact component={StudentForm} />
      <Route path="/students/:id" exact component={StudentForm} />
    </Switch>
  );
}
