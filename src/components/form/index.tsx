import { type FormEvent, type Dispatch } from 'react';
import { InputTypeEnum } from '~/shared/ui/form-input';
import composeClasses from '~/components/compose-classes';
import styles from './form.module.css';

type FormProps = JSX.IntrinsicElements['div'] &
  Readonly<{
    submitHandler?: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
  }>;

export type FieldElemType = {
  slug: string;
  val: string;
  set: Dispatch<any>;
  validate: (val: string) => string;
  err: string;
  label: string;
  type: InputTypeEnum;
  notRequired?: boolean;
};

export default function Form({ submitHandler, className = '', children }: FormProps) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitHandler?.(event);
  };

  return (
    <form className={composeClasses(styles.form, className)} onSubmit={submit}>
      {children}
    </form>
  );
}
