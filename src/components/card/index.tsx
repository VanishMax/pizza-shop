import React from 'react';
import styles from './card.module.css';
import {ComponentProps} from '../../types';
import composeClasses from '../compose-classes';

type CardProps = {
  className?: string,
}

export default function Card ({children, className = ''}: ComponentProps<CardProps>) {
  return (
    <div className={composeClasses(styles.card, className)}>
      {children}
    </div>
  );
}
