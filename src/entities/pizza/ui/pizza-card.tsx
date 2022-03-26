import Card from '~/shared/ui/card';
import Button from '~/shared/ui/button';
import getCurrency from '~/components/get-currency';
import type { Pizza } from '../model/types';
import styles from './pizza-card.module.css';

interface PizzaCardProps {
  pizza: Pizza;
}

export default function Home({ pizza }: PizzaCardProps) {
  const addToCart = (pizzaId: string) => {
    // ctx.set?.('cart', {
    //   id: pizzaId,
    //   count: 1,
    // });
  };

  const isDisabled = (pizzaId: string) => {
    // ctx.value.cart.some((item) => item.id === pizzaId);
  };

  return (
    <Card key={pizza.title} className={styles.pizzaCard}>
      <img src={pizza.photo} alt={pizza.title} />
      <h3>{pizza.title}</h3>
      <p>{pizza.description}</p>

      <div className={styles.pizzaCardEmpty} />
      <div className={styles.pizzaCardActions}>
        <span>
          Price: <b>{getCurrency(ctx.value.currency, pizza.price)}</b>
        </span>
        <Button
          className={styles.pizzaCardActionsButton}
          disabled={isDisabled(pizza._id)}
          clickHandler={() => addToCart(pizza._id)}
        >
          {isDisabled(pizza._id) ? 'In the cart' : 'Add to cart'}
        </Button>
      </div>
    </Card>
  );
}
