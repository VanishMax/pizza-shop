import { useEffect } from 'react';
import { useAppDispatch } from '~/app/store';
import { pizzaSlice, pizzaApi } from '~/entities/pizza';
import Nav from './nav';

export default function Layout({ children }: JSX.IntrinsicElements['div']) {
  const dispatch = useAppDispatch();
  const fetchPizzas = async () => {
    const pizzas = await pizzaApi.list();
    dispatch(pizzaSlice.actions.setPizzas(pizzas));
  };

  useEffect(() => {
    fetchPizzas();
  }, []);
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
