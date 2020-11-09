import React, {useContext} from 'react';
import styles from './pages.module.css';
import {GlobalContext} from '../components/global-context';

export default function Cart () {
  const ctx = useContext(GlobalContext);

  return (
    <div className={styles.pizzaGrid}>
      {ctx.value.cart.map((item) => (
        <div key={item.id}>
          {item.count}
        </div>
      ))}
    </div>
  );
}
