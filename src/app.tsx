import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Nav from './components/nav';
import GlobalContext from './components/global-context';

const Home = lazy(() => import('./pages/index'));
const Cart = lazy(() => import('./pages/cart'));
const Orders = lazy(() => import('./pages/orders'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const Error = lazy(() => import('./pages/error'));

function App () {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Nav />

        <Suspense fallback={<div />}>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{}}
            atActive={{ opacity: 1 }}
            runOnMount
          >
            <Route exact path="/" component={Home}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="*" component={Error}/>
          </AnimatedSwitch>
        </Suspense>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
