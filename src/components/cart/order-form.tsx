import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../global-context';
import type {FieldElemType} from '../../pages/signup';
import type {User} from '../../types';
import request from '../../api';
import FormInput from '../form-input';
import Form from '../form';
import Button from '../button';
import styles from './styles/order.module.css';

type Errors = {
  email: string,
  name: string,
  address: string,
}

export default function OrderForm ({
  finalPrice,
}: {finalPrice: string}) {
  const ctx = useContext(GlobalContext);
  const routerHistory = useHistory();

  const [email, setEmail] = useState<string>(ctx.value.auth?.user?.email || '');
  const [name, setName] = useState<string>(ctx.value.auth?.user?.name || '');
  const [address, setAddress] = useState<string>(ctx.value.auth?.user?.address || '');
  const [bigError, setBigError] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    email: '',
    name: '',
    address: '',
  });

  const validateEmail = (val: string) => {
    if (!val) return 'Email field cannot be empty';
    if (!val.match(/[^@]+@[^.]+\.[a-zA-Z]+/i)) return 'Wrong email format';
    return '';
  };
  const validateName = (val: string) => {
    if (!val) return 'Name field cannot be empty';
    if (val.match(/[^A-Za-z ]/)) return 'Names can have only English letters or spaces';
    if (val.length < 3) return 'Name is too short';
    return '';
  };
  const validateAddress = (val: string) => {
    if (!val) return 'Address field cannot be empty';
    if (val.length < 3) return 'Address is too short';
    return '';
  };

  const fields: FieldElemType[] = [
    {
      slug: 'email',
      val: email,
      set: setEmail,
      validate: validateEmail,
      err: errors.email,
      label: 'Your email',
      type: 'email',
    },
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
      validate: validateAddress,
      err: errors.address,
      label: 'Address',
      type: 'text',
    },
  ];

  const setValue = (val: string, item: FieldElemType) => item.set(val);
  const submit = async () => {
    let errs: {[key: string]: string} = {};
    fields.forEach((field) => errs[field.slug] = field.validate(field.val));

    const hasErrors = Object.values(errs).some((err) => !!err);
    setErrors(errs as Errors);
    if (hasErrors) return;

    try {
      const res = await request('/api/order', {
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          address,
          finalPrice,
          orders: ctx.value.cart,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBigError('');

        // ctx.set?.('auth', data as {token: string, user: User});
        // routerHistory.push('/');
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
    <>
      <h2 className={styles.heading}>Confirm order</h2>
      <Form className={styles.order} submitHandler={submit}>
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

        <Button className="mt-2 mb-1" submit>
          Confirm order
        </Button>

        {bigError && (
          <p className={styles.bigError}>{bigError}</p>
        )}
      </Form>
    </>
  );
}
