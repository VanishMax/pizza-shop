import { useEffect } from 'react';
import { useAppDispatch } from '~/store/store';
import { pizza } from '~/shared/api/pizza';
import { pizzaSlice } from '~/store/pizza-slice';
import Nav from './nav';

export default function Layout({ children }: JSX.IntrinsicElements['div']) {
  const dispatch = useAppDispatch();
  const fetchPizzas = async () => {
    const pizzas = await pizza.list();
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
