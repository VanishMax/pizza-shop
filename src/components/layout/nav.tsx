import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/button';
import { getCurrency } from '~/shared/hooks/use-currency';
import { currencySlice, Currency } from '~/store/currency-slice';
import { useAppSelector, useAppDispatch } from '~/store/store';
import styles from './nav.module.css';

export default function Nav() {
  const dispatch = useAppDispatch();

  const currency = useAppSelector((state) => state.currency.currency);
  const auth = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart.items);

  const logout = (e: MouseEvent) => {
    e.preventDefault();
    // ctx.set?.('auth', null);
  };

  const changeCurrency = () => {
    const newCurrency = currency === 'usd' ? 'eur' : 'usd';
    dispatch(currencySlice.actions.setCurrency(newCurrency));
  };

  return (
    <header className={styles.nav}>
      <Link to="/">
        <img src="/icons/ps.png" alt="pizza shop logo" />
      </Link>
      <nav>
        {!auth?.loading && (
          <>
            <Link to="/cart">
              Cart
              {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
            </Link>
            {auth?.auth ? (
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
              Use {getCurrency(currency === 'usd' ? 'eur' : 'usd', '')}
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
