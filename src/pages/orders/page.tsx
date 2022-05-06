import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Order, PizzaOrder } from '~/shared/types';
import Card from '~/components/card';
import request from '~/shared/lib/request';
import styles from './page.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Page() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  const getOrders = async () => {
    try {
      const res = await request('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      setOrders([]);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getDateFormat = (date: string) => {
    const dat = new Date(date);
    return `${dat.getHours()}:${dat.getMinutes()} ${
      MONTHS[dat.getMonth()]
    } ${dat.getDay()}, ${dat.getFullYear()}`;
  };
  const getAllPizzas = (pizzaOrders: PizzaOrder[]) =>
    pizzaOrders.reduce((accum, ord) => accum + ord.count, 0);

  return (
    <section>
      <Card>
        <h2>My orders</h2>
        <div>
          {orders ? (
            <>
              {orders.length ? (
                <>
                  {orders.map((order) => (
                    <div key={order.date} className={styles.orderBlock}>
                      <h3>
                        {getDateFormat(order.date)} –{getAllPizzas(order.orders)} pizzas for{' '}
                        {order.finalPrice}
                      </h3>
                      <p>Needs delivery to &quot;{order.address}&quot;</p>
                      <ul>
                        {order.orders.map((pizzaOrder) => (
                          <li key={order.date + pizzaOrder.id}>
                            {pizzaOrder.pizza.title} –{pizzaOrder.count} pizzas
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              ) : (
                <p>
                  Looks like you haven&apos;t done any order. Try
                  <Link to="/">adding pizzas</Link>
                  to the cart first.
                </p>
              )}
            </>
          ) : (
            <p>Loading your pizzas. Please, wait...</p>
          )}
        </div>
      </Card>
    </section>
  );
}
