import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('~/pages/home/page'));
// const Cart = lazy(() => import('~/pages/cart/ui/page'));
// const Orders = lazy(() => import('~/pages/orders/ui/page'));
const Login = lazy(() => import('~/pages/login/ui/page'));
const Error = lazy(() => import('~/pages/404/page'));
// <Route path="/orders" element={<Orders />} />
// <Route path="/cart" element={<Cart />} />

export default function Router() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}
