import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './button.module.css';
import { ComponentProps } from '../../types';
import composeClasses from '../compose-classes';

type ButtonProps = {
  submit?: boolean;
  label?: string | JSX.Element;
  link?: string;
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  clickHandler,
  label,
  submit = false,
  link = '',
  className = '',
  children,
  disabled = false,
}: ComponentProps<ButtonProps>) {
  return (
    <div className={composeClasses(styles.button, className, disabled ? styles.disabled : '')}>
      {link ? (
        <Link to={link}>{children || label || ''}</Link>
      ) : (
        <button type={submit ? 'submit' : 'button'} onClick={(e) => clickHandler?.(e)}>
          {children || label || ''}
        </button>
      )}
    </div>
  );
}
