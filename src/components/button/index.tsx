import React from 'react';
import styles from './button.module.css';
import {ComponentProps} from '../../types';

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
  className,
  children,
} : ComponentProps<ButtonProps>) {

  return (
    <div className={styles.button + (className ? ' ' + className : '')}>
      <button
        type={submit ? 'submit' : 'button'}
        onClick={(e) => clickHandler?.(e)}
      >
        {children ? children : (label || '')}
      </button>
    </div>
  );
}
