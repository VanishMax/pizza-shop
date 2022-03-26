import { useState, useEffect, type KeyboardEvent, type FormEvent } from 'react';
import styles from './counter.module.css';
import Button from '../../shared/ui/button';
import composeClasses from '../compose-classes';

export default function Counter({
  initialCount = 1,
  changeHandler,
  className = '',
}: {
  initialCount: number;
  changeHandler: (num: number) => void;
  className: string;
}) {
  const [count, setCount] = useState<number>(initialCount);

  const keydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === '.') e.preventDefault();
  };

  const input = (e: FormEvent<HTMLInputElement>) => {
    const val = parseInt(e.currentTarget.value, 10);
    if (val < 1) e.preventDefault();
    setCount(val > 1 ? val : 1);
  };

  const btnClick = (increase: 1 | -1) => {
    const newVal = count + increase;
    if (newVal > 0) setCount(newVal);
  };

  useEffect(() => {
    if (count > 0) changeHandler?.(count);
  }, [count]); // eslint-disable-line

  return (
    <div className={composeClasses(styles.counter, className)}>
      <Button className={styles.button} clickHandler={() => btnClick(-1)}>
        –
      </Button>
      <input
        type="number"
        value={count}
        className={styles.input}
        onKeyDown={keydown}
        onInput={input}
      />
      <Button className={styles.button} clickHandler={() => btnClick(1)}>
        +
      </Button>
    </div>
  );
}
