import { useContext, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.css';
import { GlobalContext } from '../../../components/global-context';
import Button from '../../../shared/ui/button';
import getCurrency from '../../../components/get-currency';

export default function Nav() {
  const ctx = useContext(GlobalContext);

  const logout = (e: MouseEvent) => {
    e.preventDefault();
    ctx.set?.('auth', null);
  };

  const changeCurrency = () => {
    ctx.set?.('currency', ctx.value.currency === 'usd' ? 'eur' : 'usd');
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
                <Link to="/orders">My orders</Link>
                <a href="/logout" onClick={logout}>
                  Log out
                </a>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Button clickHandler={changeCurrency}>
              Use {getCurrency(ctx.value.currency === 'usd' ? 'eur' : 'usd', '')}
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
