import React from 'react';
import styles from './card.module.css';
import {ComponentProps} from '../../types';

export default function Card ({children}: ComponentProps<{}>) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}
