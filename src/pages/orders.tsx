import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../components/global-context';
import type {Order, PizzaOrder} from '../types';
import Card from '../components/card';
import request from '../api';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Orders () {
  const ctx = useContext(GlobalContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const rawOrders = ctx.value.auth?.user?.orders || []; // eslint-disable-line react-hooks/exhaustive-deps

  const getOrders = async () => {
    try {
      const res = await request('/api/orders');
      const data = await res.json();
      setOrders(data.orders);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getOrders();
  }, [rawOrders]);

  const getDateFormat = (date: string) => {
    const dat = new Date(date);
    return `${dat.getHours()}:${dat.getMinutes()} ${MONTHS[dat.getMonth()]} ${dat.getDay()}, ${dat.getFullYear()}`;
  };
  const getAllPizzas = (pizzaOrders: PizzaOrder[]) => {
    return pizzaOrders.reduce((accum, ord) => accum + ord.count, 0);
  };

  return (
    <section>
      <Card>
        <h2>My orders</h2>
        <div>
          {orders.map((order) => (
            <div key={order.date}>
              <h3>{getDateFormat(order.date)} – {getAllPizzas(order.orders)} pizzas for {order.finalPrice}</h3>
              <ul>
                {order.orders.map((pizzaOrder) => (
                  <li key={order.date + pizzaOrder.id}>
                    {pizzaOrder.pizza.title} – {pizzaOrder.count} pizzas
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
