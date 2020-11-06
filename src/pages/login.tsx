import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Card from '../components/card';
import FormInput from '../components/form-input';
import Button from '../components/button';
import Form from '../components/form';
import styles from './pages.module.css'

export default function Login () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Card className="mt-2">
      <h2 className={styles.formH2}>Log In</h2>
      <Form>
        <FormInput
          value={email}
          label="Email"
          type="email"
          required
          changeHandler={(val) => setEmail(val)}
        />

        <FormInput
          value={password}
          className="mt-1"
          label="Password"
          type="password"
          required
          changeHandler={(val) => setPassword(val)}
        />

        <p className={styles.textLink}>
          If you don't have an account,&nbsp;
          <Link to="/signup">create it!</Link>
        </p>
        <Button className="mt-2 mb-1" submit>
          Log in
        </Button>
      </Form>
    </Card>
  );
}
