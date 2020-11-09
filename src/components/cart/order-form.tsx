import React, {useState} from 'react';
import FormInput from '../form-input';
import {FieldElemType} from '../../pages/signup';
import Form from '../form';
import Button from '../button';
import styles from './styles/order.module.css';

type Errors = {
  email: string,
  name: string,
  address: string,
}

export default function OrderForm () {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    email: '',
    name: '',
    address: '',
  });

  const fields: FieldElemType[] = [
    {
      slug: 'email',
      val: email,
      set: setEmail,
      validate: () => '',
      err: errors.email,
      label: 'Your email',
      type: 'email',
    },
    {
      slug: 'name',
      val: name,
      set: setName,
      validate: () => '',
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
      label: 'Address',
      type: 'text',
    },
  ];

  const setValue = (val: string, item: FieldElemType) => {
    item.set(val);
    setErrors({...errors, [item.slug]: item.validate(val)});
  };

  return (
    <>
      <h2 className={styles.heading}>Confirm order</h2>
      <Form className={styles.order}>
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
      </Form>
    </>
  );
}
