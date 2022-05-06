import Button from '~/components/button';
import type { Pizza } from '~/shared/types';

type PizzaCardProps = JSX.IntrinsicElements['div'] & Readonly<{
  pizza: Pizza
}>;

export default function PizzaCard({ pizza }: PizzaCardProps) {
  return (
    <div
      className="flex flex-col max-w-sm w-sm xs:w-full text-left bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <figure className="relative h-60 overflow-hidden">
        <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-t-lg" src={pizza.photo} alt={pizza.title} />
      </figure>

      <div className="p-5 flex flex-col flex-grow">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pizza.title}
          </h5>
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {pizza.description}
        </p>

        <div className="flex-grow" />

        <Button className="text-center">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
