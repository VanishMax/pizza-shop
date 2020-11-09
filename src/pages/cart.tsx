import React, {useContext, useEffect, useState} from 'react';
import type {CartEntity, Pizza} from '../types';
import {GlobalContext} from '../components/global-context';
import Card from '../components/card';
import styles from './styles/cart.module.css';

interface CartPizza extends CartEntity {
  pizza: Pizza
}

export default function Cart () {
  const ctx = useContext(GlobalContext);
  const [pizzas, setPizzas] = useState<CartPizza[]>([]);

  const updateCartPizzas = () => {
    setPizzas(ctx.value.cart.map((item) => ({
      ...item,
      pizza: ctx.pizzas.find((pizza) => pizza._id === item.id) as Pizza,
    })));
  };

  useEffect(updateCartPizzas, [ctx.value.cart, ctx.pizzas])

  return (
    <section className={styles.cartGrid}>
      <Card className={styles.cartGridLeft}>
        {pizzas.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.pizza.photo} alt={item.pizza.title} />
            <h3>{item.pizza.title}</h3>

            <div>
              <span>{item.pizza.price.usd}</span>
              {item.count}
            </div>

            <div>{item.pizza.price.usd * item.count}</div>
          </div>
        ))}
      </Card>
      <Card className={styles.cartGridRight}>
        <h2>Complete order</h2>
      </Card>
    </section>
  );
}
