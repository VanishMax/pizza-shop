import React from 'react';
import styles from './form.module.css';
import {ComponentProps} from '../../types';

type FormProps = {
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void,
  className?: string,
}

export default function Form ({
  submitHandler,
  className,
  children,
} : ComponentProps<FormProps>) {

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitHandler?.(event);
  };

  return (
    <form
      className={styles.form + (className ? ' ' + className : '')}
      onSubmit={submit}
    >
      {children}
    </form>
  );
}
