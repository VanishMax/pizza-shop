import React from 'react';
import {Link} from 'react-router-dom';
import styles from './nav.module.css';

export default function Nav () {
  return (
    <header className={styles.nav}>
      <Link to="/">
        <img src="/icons/ps.png" alt="pizza shop logo" />
      </Link>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
