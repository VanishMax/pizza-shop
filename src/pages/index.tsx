import React, {useContext} from 'react';
import Card from '../components/card';
import Button from '../components/button';
import styles from './styles/home.module.css';
import {GlobalContext} from '../components/global-context';

export default function Home () {
  const ctx = useContext(GlobalContext);

  const addToCart = (pizzaId: string) => {
    ctx.set?.('cart', {
      id: pizzaId,
      count: 1,
    });
  };

  return (
    <section className={styles.pizzaGrid}>
      {ctx.pizzas.map((piece) => (
        <Card key={piece.title} className={styles.pizzaCard}>
          <img src={piece.photo} alt={piece.title} />
          <h3>{piece.title}</h3>
          <p>{piece.description}</p>

          <div className={styles.pizzaCardEmpty} />
          <div className={styles.pizzaCardActions}>
            <span>Price: <b>${piece.price.usd}</b></span>
            <Button
              className={styles.pizzaCardActionsButton}
              clickHandler={() => addToCart(piece._id)}
            >
              Add to cart
            </Button>
          </div>
        </Card>
      ))}
    </section>
  );
}
