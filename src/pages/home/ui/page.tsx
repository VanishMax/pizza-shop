import { useAppSelector } from '~/app/store';
import { PizzaCard } from '~/entities/pizza';
import styles from './page.module.css';

export default function Home() {
  const pizzas = useAppSelector((state) => state.pizza.pizzas);

  return (
    <section className={styles.pizzaGrid}>
      {pizzas.length ? (
        <>
          {pizzas.map((pizza) => (
            <PizzaCard pizza={pizza} />
          ))}
        </>
      ) : (
        <h2>Loading all pizzas. Please, wait...</h2>
      )}
    </section>
  );
}
