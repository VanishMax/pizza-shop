import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import styles from './nav.module.css';
import {GlobalContext} from '../global-context';

export default function Nav () {
  const ctx = useContext(GlobalContext);

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    ctx.set?.('auth', null);
  };

  return (
    <header className={styles.nav}>
      <Link to="/">
        <img src="/icons/ps.png" alt="pizza shop logo" />
      </Link>
      <nav>
        {!ctx.value.auth?.loading && (
          <>
            <Link to="/cart">
              Cart
              {ctx.value.cart.length > 0 && (
                <span className={styles.badge}>{ctx.value.cart.length}</span>
              )}
            </Link>
            {ctx.value.auth?.user ? (
              <>
                <a href="/orders">My orders</a>
                <a href="/logout" onClick={logout}>Log out</a>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
