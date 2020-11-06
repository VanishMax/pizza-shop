import React from 'react';
import styles from './button.module.css';
import {ComponentProps} from '../../types';
import composeClasses from '../compose-classes';

type ButtonProps = {
  submit?: boolean,
  label?: string|JSX.Element,
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  className?: string,
}

export default function Button ({
  clickHandler,
  label,
  submit = false,
  className = '',
  children,
} : ComponentProps<ButtonProps>) {

  return (
    <div className={composeClasses(styles.button, className)}>
      <button
        type={submit ? 'submit' : 'button'}
        onClick={(e) => clickHandler?.(e)}
      >
        {children ? children : (label || '')}
      </button>
    </div>
  );
}
