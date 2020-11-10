import React, {useContext} from 'react';
import Card from '../components/card';
import Button from '../components/button';
import styles from './styles/home.module.css';
import {GlobalContext} from '../components/global-context';
import getCurrency from '../components/get-currency';

export default function Home () {
  const ctx = useContext(GlobalContext);

  const addToCart = (pizzaId: string) => {
    ctx.set?.('cart', {
      id: pizzaId,
      count: 1,
    });
  };

  const isDisabled = (pizzaId: string) => {
    return ctx.value.cart.some((item) => item.id === pizzaId);
  };

  return (
    <section className={styles.pizzaGrid}>
      <>
        {ctx.pizzas.length ? (
          <>
            {ctx.pizzas.map((piece) => (
              <Card key={piece.title} className={styles.pizzaCard}>
                <img src={piece.photo} alt={piece.title} />
                <h3>{piece.title}</h3>
                <p>{piece.description}</p>

                <div className={styles.pizzaCardEmpty} />
                <div className={styles.pizzaCardActions}>
                  <span>
                    Price: <b>{getCurrency(ctx.value.currency, piece.price)}</b>
                  </span>
                  <Button
                    className={styles.pizzaCardActionsButton}
                    disabled={isDisabled(piece._id)}
                    clickHandler={() => addToCart(piece._id)}
                  >
                    {isDisabled(piece._id) ? 'In the cart' : 'Add to cart'}
                  </Button>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <h2>Loading all pizzas. Please, wait...</h2>
        )}
      </>
    </section>
  );
}
