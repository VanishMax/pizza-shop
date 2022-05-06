import PizzaCard from '~/components/pizza-card';
import pizzas from '~/shared/data/pizzas';

export default function Home() {
  return (
    <div className={'flex flex-wrap justify-between gap-4'}>
      {pizzas.map(pizza => (
        <PizzaCard key={pizza.title} pizza={pizza} />
      ))}
    </div>
  );
}
