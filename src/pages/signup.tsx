import React, {useState} from 'react';
import Form from '../components/form';
import FormInput from '../components/form-input';
import Button from '../components/button';
import Card from '../components/card';
import styles from './pages.module.css';
import {Link} from 'react-router-dom';

export default function Signup () {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  return (
    <Card className="mt-2">
      <h2 className={styles.formH2}>Sign up</h2>
      <Form>
        <FormInput
          value={name}
          label="Your name"
          type="text"
          required
          changeHandler={(val) => setName(val)}
        />

        <FormInput
          value={email}
          label="Email"
          type="email"
          required
          changeHandler={(val) => setEmail(val)}
        />

        <FormInput
          value={address}
          label="Shipping address"
          type="text"
          changeHandler={(val) => setAddress(val)}
        />

        <FormInput
          value={password}
          error="Some error text"
          className="mt-1"
          label="Password"
          type="password"
          required
          changeHandler={(val) => setPassword(val)}
        />

        <FormInput
          value={passwordConfirm}
          success="Success text"
          className="mt-1"
          label="Confirm password"
          type="password"
          required
          changeHandler={(val) => setPasswordConfirm(val)}
        />

        <p className={styles.textLink}>
          If you already have an account,&nbsp;
          <Link to="/login">log in!</Link>
        </p>
        <Button className="mt-2 mb-1" submit>
          Sign up
        </Button>
      </Form>
    </Card>
  );
}
