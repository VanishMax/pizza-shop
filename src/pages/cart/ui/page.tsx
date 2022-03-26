import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CartEntity, Pizza } from '~/shared/types';
import { GlobalContext } from '~/components/global-context';
import Receipt from '~/components/cart/receipt';
import CartItem from '~/components/cart/item';
import OrderForm from '~/components/cart/order-form';
import getCurrency from '~/components/get-currency';
import Card from '~/shared/ui/card';
import styles from './page.module.css';

export interface CartPizza extends CartEntity {
  pizza: Pizza;
}

const DELIVERY_COST = {
  usd: 1,
  eur: 0.8,
};
const ADDED_TAX = 0.04;

export default function Page() {
  const ctx = useContext(GlobalContext);
  const [pizzas, setPizzas] = useState<CartPizza[]>([]);
  const [isOrderView, setOrderView] = useState<boolean>(false);

  const updateCartPizzas = () => {
    if (ctx.pizzas.length) {
      setPizzas(
        ctx.value.cart.map((item) => ({
          ...item,
          pizza: ctx.pizzas.find((pizza) => pizza._id === item.id) as Pizza,
        })),
      );
    }
  };

  const removeFromCart = (id: string) => {
    ctx.set?.('cart', {
      id,
      count: -1,
    });
  };

  const updateCounter = (id: string, count: number) => {
    ctx.set?.('cart', { id, count });
  };

  const getSubtotalPrice = () =>
    pizzas.reduce(
      (accum, item) => accum + (item.pizza?.price?.[ctx.value.currency || 'usd'] || 0) * item.count,
      0,
    );
  const getTotalPrice = () => {
    const subtotal = getSubtotalPrice();
    return subtotal + DELIVERY_COST[ctx.value.currency || 'usd'] + subtotal * ADDED_TAX;
  };

  useEffect(updateCartPizzas, [ctx.value.cart, ctx.pizzas]);

  return (
    <section className={styles.cartGrid}>
      <Card className={styles.cartGridLeft}>
        {pizzas.length > 0 ? (
          <>
            {isOrderView ? (
              <OrderForm
                finalPrice={getCurrency(ctx.value.currency, Number(getTotalPrice()).toFixed(2))}
              />
            ) : (
              <>
                {pizzas
                  .filter((item) => item.pizza?.title)
                  .map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      currency={ctx.value.currency}
                      removeFromCart={removeFromCart}
                      updateCounter={updateCounter}
                    />
                  ))}
              </>
            )}
          </>
        ) : (
          <>
            {ctx.pizzas.length ? (
              <>
                <h3>Your cart is still empty :(</h3>
                <p>
                  Start filling it in
                  <Link to="/">the main page</Link>
                </p>
              </>
            ) : (
              <h3>The pizzas are loading. Please, wait...</h3>
            )}
          </>
        )}
      </Card>

      <Receipt
        pizzas={pizzas}
        delivery={getCurrency(ctx.value.currency, DELIVERY_COST)}
        tax={`${ADDED_TAX}%`}
        subtotal={getCurrency(ctx.value.currency, Number(getSubtotalPrice()).toFixed(2))}
        total={getCurrency(ctx.value.currency, Number(getTotalPrice()).toFixed(2))}
        orderView={isOrderView}
        currency={ctx.value.currency}
        changeOrder={() => setOrderView(!isOrderView)}
      />
    </section>
  );
}
