import React, {useState} from 'react';
import styles from './counter.module.css';
import Button from '../button';

export default function Counter ({
  initialCount = 0,
  changeHandler,
}: {initialCount?: number, changeHandler?: (num: number) => void}) {
  const [count, setCount] = useState(initialCount)
  return (
    <div className={styles.counter}>
      <Button className={styles.button}>–</Button>
      <input type="number" value={count} className={styles.input} />
      <Button className={styles.button}>+</Button>
    </div>
  );
}
