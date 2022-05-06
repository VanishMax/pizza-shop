import Button from '~/components/button';
import { useAppSelector } from '~/store/store';
import styles from './add-to-cart.module.css';

type AddToCartProps = JSX.IntrinsicElements['button'] &
  Readonly<{
    pizzaId: number;
  }>;

export default function AddToCart({ pizzaId }: AddToCartProps) {
  const cart = useAppSelector((state) => state.cart.items);
  const isDisabled = cart.some((item) => item.id === pizzaId);

  const addToCart = () => {
    // ctx.set?.('cart', {
    //   id: pizzaId,
    //   count: 1,
    // });
  };

  return (
    <Button className={styles.addToCartButton} disabled={isDisabled} clickHandler={addToCart}>
      {isDisabled ? 'In the cart' : 'Add to cart'}
    </Button>
  );
}
