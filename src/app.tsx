import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/nav';
import GlobalContext from './components/global-context';

const Home = lazy(() => import('./pages'));
const Cart = lazy(() => import('./pages/cart'));
const Orders = lazy(() => import('./pages/orders'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const Error = lazy(() => import('./pages/error'));

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Nav />

        <Suspense fallback={<div />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
