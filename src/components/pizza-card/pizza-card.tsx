import Card from '~/components/card';
import { useCurrency } from '~/shared/hooks/use-currency';
import AddToCart from '~/components/add-to-cart/add-to-cart';
import type { Pizza } from '~/shared/types/pizza';
import styles from './pizza-card.module.css';

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const price = useCurrency({
    eur: pizza.priceEur,
    usd: pizza.priceUsd,
  });

  return (
    <Card key={pizza.title} className={styles.pizzaCard}>
      <img src={pizza.photo} alt={pizza.title} />
      <h3>{pizza.title}</h3>
      <p>{pizza.description}</p>

      <div className={styles.pizzaCardEmpty} />
      <div className={styles.pizzaCardActions}>
        <span>
          Price: <b>{price}</b>
        </span>
        <AddToCart pizzaId={pizza.id} />
      </div>
    </Card>
  );
}
