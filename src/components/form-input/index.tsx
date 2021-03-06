import React, {useRef} from 'react';
import styles from './input.module.css';
import {ComponentProps} from '../../types';
import composeClasses from '../compose-classes';

export type InputTypeEnum = 'text'|'email'|'password'|'number';
export type InputProps = {
  value?: string,
  inputHandler?: (val: string) => void,
  changeHandler?: (val: string) => void,
  id?: string,
  placeholder?: string,
  autocomplete?: 'on'|'off',
  label?: string,
  type: InputTypeEnum,
  required?: boolean,
  icon?: JSX.Element,
  className?: string,
  error?: string|boolean,
  success?: string|boolean,
}

export default function FormInput ({
  value,
  changeHandler,
  inputHandler,
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
  const inp = useRef(null);

  const input = (event: React.FormEvent<HTMLInputElement>) => inputHandler?.(event.currentTarget.value);
  const change = (event: React.FormEvent<HTMLInputElement>) => changeHandler?.(event.currentTarget.value);

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
          ref={inp}
          onInput={input}
          onChange={change}
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
