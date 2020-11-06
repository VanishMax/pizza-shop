import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
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
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{}}
          atActive={{ opacity: 1 }}
          runOnMount
        >
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="*" component={Error}/>
        </AnimatedSwitch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
