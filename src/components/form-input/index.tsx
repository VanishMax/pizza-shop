import React from 'react';
import styles from './input.module.css';
import {ComponentProps} from '../../types';

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
  className,
} : ComponentProps<InputProps>) {

  return (
    <label className={styles.formInput + (className ? ' ' + className : '')}>
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
      </div>
    </label>
  );
}
