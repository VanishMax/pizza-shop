import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import type {CartEntity, Pizza} from '../types';
import {GlobalContext} from '../components/global-context';
import Card from '../components/card';
import styles from './styles/cart.module.css';
import Counter from '../components/counter';
import Button from '../components/button';

interface CartPizza extends CartEntity {
  pizza: Pizza
}

const DELIVERY_COST = {
  usd: 1,
  eur: 0.8,
};
const ADDED_TAX = 0.04;

export default function Cart () {
  const ctx = useContext(GlobalContext);
  const [pizzas, setPizzas] = useState<CartPizza[]>([]);

  const updateCartPizzas = () => {
    if (ctx.pizzas.length) setPizzas(ctx.value.cart.map((item) => ({
      ...item,
      pizza: ctx.pizzas.find((pizza) => pizza._id === item.id) as Pizza,
    })));
  };

  const removeFromCart = (id: string) => {
    ctx.set?.('cart', {
      id,
      count: -1,
    });
  };

  const updateCounter = (id: string, count: number) => {
    ctx.set?.('cart', {id, count});
  };

  const getSubtotalPrice = () => {
    return pizzas.reduce((accum, item) => accum + (item.pizza.price.usd * item.count), 0);
  };
  const getTotalPrice = () => {
    const subtotal = getSubtotalPrice();
    return subtotal - DELIVERY_COST.usd - subtotal * ADDED_TAX;
  }

  useEffect(updateCartPizzas, [ctx.value.cart, ctx.pizzas])

  return (
    <section className={styles.cartGrid}>
      <Card className={styles.cartGridLeft}>
        {pizzas.length > 0 ? (
          <>
            {pizzas.map((item) => (
              <div key={item.id} className={styles.cartItem}>
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
            ))}
          </>
        ) : (
          <>
            <h3>Your cart is still empty :(</h3>
            <p>Start filling it in <Link to="/">the main page</Link></p>
          </>
        )}
      </Card>

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
            <span>${Number(getSubtotalPrice()).toFixed(2)}</span>
          </li>
          <li>
            <span>Delivery costs</span>
            <span />
            <span>${DELIVERY_COST.usd}</span>
          </li>
          <li>
            <span>Value-added tax</span>
            <span />
            <span>{ADDED_TAX * 100}%</span>
          </li>
        </ul>
        <ul className={styles.cartPrice}>
          <li>
            <span>Total cost</span>
            <span />
            <span>${Number(getTotalPrice()).toFixed(2)}</span>
          </li>
        </ul>

        <Button>Make an order</Button>
      </Card>
    </section>
  );
}
