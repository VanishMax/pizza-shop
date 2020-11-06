import React, {useState} from 'react';
import Card from '../components/card';
import FormInput from '../components/form-input';
import Button from '../components/button';
import Form from '../components/form';

export default function Login () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  return (
    <Card className="mt-2">
      <h2>Log In</h2>
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

        <FormInput
          value={passwordConfirm}
          className="mt-1"
          label="Confirm password"
          type="password"
          required
          changeHandler={(val) => setPasswordConfirm(val)}
        />

        <Button className="mt-2" submit>
          Submit
        </Button>

        <p>
          {email}
          {password}
          {passwordConfirm}
        </p>
      </Form>
    </Card>
  );
}
