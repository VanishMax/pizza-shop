import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/nav';

const Home = lazy(() => import('./pages/index'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const Error = lazy(() => import('./pages/error'));

function App () {
  return (
    <BrowserRouter>
      <Nav />

      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="*" component={Error}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
