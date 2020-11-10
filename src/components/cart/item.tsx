import styles from './styles/item.module.css';
import Counter from '../counter';
import React from 'react';
import {CartPizza} from '../../pages/cart';

export default function CartItem ({
  item,
  removeFromCart,
  updateCounter,
}: {item: CartPizza, removeFromCart: (id: string) => void, updateCounter: (id: string, count: number) => void}) {

  return (
    <div className={styles.cartItem}>
      <div className={styles.description}>
        <div className={styles.remove} onClick={() => removeFromCart(item.id)}>✖</div>
        <img src={item.pizza.photo} alt={item.pizza.title} />
        <div>
          <h3>{item.pizza.title}</h3>
          <p>${item.pizza.price.usd} each</p>
        </div>
      </div>

      <div className={styles.calculator}>
        <div className={styles.counter}>
          <span>Per unit: ${item.pizza.price.usd}</span>
          <Counter initialCount={item.count} changeHandler={(count) => updateCounter(item.id, count)} />
        </div>

        <div className={styles.price}>
          Total:&nbsp;<b>${item.pizza.price.usd * item.count}</b>
        </div>
      </div>
    </div>
  );
}
