import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Resources from './components/Resources'
import SingleResources from './components/SingleResources'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => { return (<Redirect from="/" to="/resources" />)}} />
          <Route exact path={['/resources', '/']} component={Resources} />
          <Route exact path='/resources/:id' component={SingleResources} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
