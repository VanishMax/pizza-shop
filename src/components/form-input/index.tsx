import React from 'react';
import styles from './input.module.css';
import {ComponentProps} from '../../types';
import composeClasses from '../compose-classes';

type InputProps = {
  value?: string,
  changeHandler?: (val: string) => void,
  id?: string,
  placeholder?: string,
  autocomplete?: 'on'|'off',
  label?: string,
  type: 'text'|'email'|'password'|'number',
  required?: boolean,
  icon?: JSX.Element,
  className?: string,
  error?: string|boolean,
  success?: string|boolean,
}

export default function FormInput ({
  value,
  changeHandler,
  id,
  placeholder,
  autocomplete,
  label,
  type,
  required,
  icon,
  className = '',
  error = false,
  success = false,
} : ComponentProps<InputProps>) {

  return (
    <label className={composeClasses(
      styles.formInput,
      className,
      error ? styles.formInputError : '',
      success ? styles.formInputSuccess : '',
      )}
    >
      {label && (
        <span>
          {label}
          {required && <span className={styles.required}>&nbsp;*</span>}
        </span>
      )}

      <div>
        {icon && (
          <div>{icon}</div>
        )}
        <input
          id={id}
          value={value}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autocomplete}
          onChange={(e) => changeHandler?.(e.target.value as string)}
        />
        {(error && typeof error === 'string') && (
          <span className={composeClasses(styles.infoSpan, styles.infoSpanError)}>{error}</span>
        )}
        {(success && typeof success === 'string') && (
          <span className={composeClasses(styles.infoSpan, styles.infoSpanSuccess)}>{success}</span>
        )}
      </div>
    </label>
  );
}
