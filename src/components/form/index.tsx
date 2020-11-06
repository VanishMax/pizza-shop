import React from 'react';
import styles from './form.module.css';
import {ComponentProps} from '../../types';
import composeClasses from '../compose-classes';

type FormProps = {
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void,
  className?: string,
}

export default function Form ({
  submitHandler,
  className = '',
  children,
} : ComponentProps<FormProps>) {

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitHandler?.(event);
  };

  return (
    <form
      className={composeClasses(styles.form, className)}
      onSubmit={submit}
    >
      {children}
    </form>
  );
}
