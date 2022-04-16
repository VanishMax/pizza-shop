import { useRef, type FormEvent } from 'react';
import styles from './input.module.css';
import composeClasses from '../../../components/compose-classes';

export type InputTypeEnum = 'text' | 'email' | 'password' | 'number';
type InputProps = JSX.IntrinsicElements['label'] &
  Readonly<{
    value?: string;
    inputHandler?: (val: string) => void;
    changeHandler?: (val: string) => void;
    id?: string;
    placeholder?: string;
    autocomplete?: 'on' | 'off';
    label?: string;
    type: InputTypeEnum;
    required?: boolean;
    icon?: JSX.Element;
    className?: string;
    error?: string | boolean;
    success?: string | boolean;
  }>;

export default function FormInput({
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
}: InputProps) {
  const inp = useRef(null);

  const input = (event: FormEvent<HTMLInputElement>) => inputHandler?.(event.currentTarget.value);
  const change = (event: FormEvent<HTMLInputElement>) => changeHandler?.(event.currentTarget.value);

  return (
    <label
      htmlFor={id}
      className={composeClasses(
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
        {icon && <div>{icon}</div>}
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
        {error && typeof error === 'string' && (
          <span className={composeClasses(styles.infoSpan, styles.infoSpanError)}>{error}</span>
        )}
        {success && typeof success === 'string' && (
          <span className={composeClasses(styles.infoSpan, styles.infoSpanSuccess)}>{success}</span>
        )}
      </div>
    </label>
  );
}
