import React, {useContext, useState} from 'react';
import Form from '../components/form';
import FormInput, {InputTypeEnum} from '../components/form-input';
import Button from '../components/button';
import Card from '../components/card';
import styles from './styles/form.module.css';
import {Link, useHistory} from 'react-router-dom';
import {User} from '../types';
import {GlobalContext} from '../components/global-context';

export type FieldElemType = {
  slug: string,
  val: string,
  set: React.Dispatch<any>,
  validate: (val: string) => string,
  err: string,
  label: string,
  type: InputTypeEnum,
  notRequired?: boolean,
};

type Errors = {
  name: string,
  email: string,
  address: string,
  password: string,
  passwordConfirm: string,
}

export default function Signup () {
  const ctx = useContext(GlobalContext);
  const routerHistory = useHistory();

  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [bigError, setBigError] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    name: '',
    address: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const validateName = (val: string) => {
    if (!val) return 'Name field cannot be empty';
    if (val.match(/[^A-Za-z ]/)) return 'Names can have only English letters or spaces';
    if (val.length < 3) return 'Name is too short';
    return '';
  };
  const validateEmail = (val: string) => {
    if (!val) return 'Email field cannot be empty';
    if (!val.match(/[^@]+@[^.]+\.[a-zA-Z]+/i)) return 'Wrong email format';
    return '';
  };
  const validatePassword = (val: string) => {
    if (!val) return 'Password field cannot be empty';
    if (val.length < 8 || !val.match(/[a-zA-Z]/) || !val.match(/[0-9]/)) return 'Password should be longer than 8 characters and contain both numbers and English letters';
    return '';
  };
  const validatePasswordConfirm = (val: string) => {
    if (!val) return 'Password confirmation field cannot be empty';
    if (val !== password) return 'Passwords do not match';
    return '';
  };

  const setValue = (val: string, item: FieldElemType) => {
    item.set(val);
    setErrors({...errors, [item.slug]: item.validate(val)});
  };

  const fields: FieldElemType[] = [
    {
      slug: 'name',
      val: name,
      set: setName,
      validate: validateName,
      err: errors.name,
      label: 'Your name',
      type: 'text',
    },
    {
      slug: 'address',
      val: address,
      set: setAddress,
      validate: () => '',
      err: errors.address,
      label: 'Shipping address',
      notRequired: true,
      type: 'text',
    },
    {
      slug: 'email',
      val: email,
      set: setEmail,
      validate: validateEmail,
      err: errors.email,
      label: 'Email',
      type: 'email',
    },
    {
      slug: 'password',
      val: password,
      set: setPassword,
      validate: validatePassword,
      err: errors.password,
      label: 'Password',
      type: 'password',
    },
    {
      slug: 'passwordConfirm',
      val: passwordConfirm,
      set: setPasswordConfirm,
      validate: validatePasswordConfirm,
      err: errors.passwordConfirm,
      label: 'Confirm password',
      type: 'password',
    },
  ];

  const submit = async () => {
    let errs: {[key: string]: string} = {};
    fields.forEach((field) => errs[field.slug] = field.validate(field.val));

    const hasErrors = Object.values(errs).some((err) => !!err);
    setErrors(errs as Errors);
    if (hasErrors) return;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          address,
          password,
          passwordConfirm,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setBigError('');

        ctx.set?.('auth', data as {token: string, user: User});
        routerHistory.push('/');
      } else {
        if (data?.fieldErrors) setErrors(data.fieldErrors as Errors);
        if (data?.error) setBigError(data.error as string);
      }
    } catch (e) {
      console.error(e);
      setBigError('An error occurred on the server');
    }
  };

  return (
    <Card className="mt-2">
      <h2 className={styles.formH2}>Sign up</h2>
      <Form submitHandler={submit}>
        <>
          {fields.map((item) => (
            <FormInput
              key={item.slug}
              value={item.val}
              label={item.label}
              type={item.type}
              required={!item.notRequired}
              error={item.err}
              inputHandler={(val) => setValue(val, item)}
            />
          ))}
        </>

        <p className={styles.textLink}>
          If you already have an account,&nbsp;
          <Link to="/login">log in!</Link>
        </p>
        <Button className="mt-2 mb-1" submit>
          Sign up
        </Button>

        {bigError && (
          <p className={styles.bigError}>{bigError}</p>
        )}
      </Form>
    </Card>
  );
}
