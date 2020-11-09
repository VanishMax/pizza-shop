import styles from '../../pages/styles/cart.module.css';
import Button from '../button';
import Card from '../card';
import React from 'react';
import {CartPizza} from '../../pages/cart';

export default function Receipt ({
  pizzas,
  subtotal,
  total,
  delivery,
  tax,
}: {pizzas: CartPizza[], subtotal: string, total: string, delivery: string, tax: string}) {
  return (
    <Card className={styles.cartGridRight}>
      <h3>Complete order</h3>
      <ul className={styles.cartPrice}>
        {pizzas.map((item) => (
          <li key={item.id}>
            <span>{item.pizza.title}</span>
            <span />
            <span>${item.pizza.price.usd * item.count}</span>
          </li>
        ))}
      </ul>
      <ul className={styles.cartPrice}>
        <li>
          <span>Subtotal price</span>
          <span />
          <span>{subtotal}</span>
        </li>
        <li>
          <span>Delivery costs</span>
          <span />
          <span>{delivery}</span>
        </li>
        <li>
          <span>Value-added tax</span>
          <span />
          <span>{tax}</span>
        </li>
      </ul>
      <ul className={styles.cartPrice}>
        <li>
          <span>Total cost</span>
          <span />
          <span>{total}</span>
        </li>
      </ul>

      <Button disabled={!pizzas.length}>Make an order</Button>
    </Card>
  );
}
