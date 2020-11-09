import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import type {CartEntity, Pizza} from '../types';
import {GlobalContext} from '../components/global-context';
import Card from '../components/card';
import styles from './styles/cart.module.css';
import Counter from '../components/counter';

interface CartPizza extends CartEntity {
  pizza: Pizza
}

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
        <h2>Complete order</h2>
      </Card>
    </section>
  );
}
