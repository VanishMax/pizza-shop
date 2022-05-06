import styles from './styles/receipt.module.css';
import Button from '../button';
import Card from '../card';
import { CartPizza } from '../../pages/cart/page';
import { Currency } from '../global-context';
import getCurrency from '../../shared/hooks/use-currency';

export default function Receipt({
  pizzas,
  subtotal,
  total,
  delivery,
  tax,
  orderView,
  currency,
  changeOrder,
}: {
  pizzas: CartPizza[];
  subtotal: string;
  total: string;
  delivery: string;
  tax: string;
  orderView: boolean;
  currency: Currency | null;
  changeOrder: () => void;
}) {
  return (
    <Card className={styles.cartGridRight}>
      <h3>Order receipt</h3>
      <ul className={styles.cartPrice}>
        {pizzas
          .filter((item) => item.pizza?.title)
          .map((item) => (
            <li key={item.id}>
              <span>{item.pizza.title}</span>
              <span />
              <span>
                {getCurrency(currency, '')}
                {item.pizza.price[currency || 'usd'] * item.count}
              </span>
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

      <Button disabled={!pizzas.length} clickHandler={changeOrder}>
        {orderView ? 'See the cart' : 'Make an order'}
      </Button>
    </Card>
  );
}
