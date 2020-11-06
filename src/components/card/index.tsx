import React from 'react';
import styles from './card.module.css';
import {ComponentProps} from '../../types';

type CardProps = {
  className?: string,
}

export default function Card ({children, className}: ComponentProps<CardProps>) {
  return (
    <div className={styles.card + (className ? ' ' + className : '')}>
      {children}
    </div>
  );
}
