import styles from './styles/item.module.css';
import Counter from '../counter';
import React from 'react';
import {CartPizza} from '../../pages/cart';
import {Currency} from '../global-context';
import getCurrency from '../get-currency';

export default function CartItem ({
  item,
  currency,
  removeFromCart,
  updateCounter,
}: {item: CartPizza, currency: Currency|null, removeFromCart: (id: string) => void, updateCounter: (id: string, count: number) => void}) {

  return (
    <div className={styles.cartItem}>
      <div className={styles.description}>
        <div className={styles.remove} onClick={() => removeFromCart(item.id)}>✖</div>
        <img src={item.pizza.photo} alt={item.pizza.title} />
        <div>
          <h3>{item.pizza.title}</h3>
          <p>{getCurrency(currency, item.pizza.price)} each</p>
        </div>
      </div>

      <div className={styles.calculator}>
        <div className={styles.counter}>
          <span>Per unit: {getCurrency(currency, item.pizza.price)}</span>
          <Counter initialCount={item.count} changeHandler={(count) => updateCounter(item.id, count)} />
        </div>

        <div className={styles.price}>
          Total:&nbsp;<b>{getCurrency(currency, '')}{item.pizza.price[currency || 'usd'] * item.count}</b>
        </div>
      </div>
    </div>
  );
}
