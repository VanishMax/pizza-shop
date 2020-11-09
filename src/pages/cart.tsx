import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import type {CartEntity, Pizza} from '../types';
import {GlobalContext} from '../components/global-context';
import Card from '../components/card';
import styles from './styles/cart.module.css';
import Receipt from '../components/cart/receipt';
import CartItem from '../components/cart/item';

export interface CartPizza extends CartEntity {
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
  const [isOrder, setOrder] = useState<boolean>(false);

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
  };

  useEffect(updateCartPizzas, [ctx.value.cart, ctx.pizzas])

  return (
    <section className={styles.cartGrid}>
      <Card className={styles.cartGridLeft}>
        {pizzas.length > 0 ? (
          <>
            {pizzas.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateCounter={updateCounter}
              />
            ))}
          </>
        ) : (
          <>
            {ctx.pizzas.length ? (
              <>
                <h3>Your cart is still empty :(</h3>
                <p>Start filling it in <Link to="/">the main page</Link></p>
              </>
            ) : (
              <>
                <h3>The pizzas are loading. Please, wait...</h3>
              </>
            )}
          </>
        )}
      </Card>

      <Receipt
        pizzas={pizzas}
        delivery={'$' + DELIVERY_COST.usd}
        tax={DELIVERY_COST.usd + '%'}
        subtotal={'$' + Number(getSubtotalPrice()).toFixed(2)}
        total={'$' + Number(getTotalPrice()).toFixed(2)}
      />
    </section>
  );
}
