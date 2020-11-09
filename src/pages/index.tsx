import React, {useEffect, useState} from 'react';
import type {Pizza} from '../types';
import Card from '../components/card';
import Button from '../components/button';
import styles from './pages.module.css';

export default function Home () {
  const [pizza, setPizza] = useState<Pizza[]>([]);

  const loadPizza = async () => {
    const res = await fetch('/api/pizza');
    try {
      const data = await res.json();
      console.log(data);
      setPizza(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPizza();
  }, []);

  return (
    <div className={styles.pizzaGrid}>
      {pizza.map((piece) => (
        <Card key={piece.title} className={styles.pizzaCard}>
          <img src={piece.photo} alt={piece.title} />
          <h3>{piece.title}</h3>
          <p>{piece.description}</p>

          <div className={styles.pizzaCardEmpty} />
          <div className={styles.pizzaCardActions}>
            <span>Price: <b>${piece.price.usd}</b></span>
            <Button className={styles.pizzaCardActionsButton}>Add to cart</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
