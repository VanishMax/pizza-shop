import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav () {
  return (
    <header>
      <img src="/icons/ps.png" alt="pizza shop logo" />
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/signup2">Err</Link>
    </header>
  );
}
