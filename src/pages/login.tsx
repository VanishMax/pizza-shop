import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Card from '../components/card';
import FormInput from '../components/form-input';
import Button from '../components/button';
import Form from '../components/form';
import styles from './pages.module.css'
import {FieldElemType} from './signup';

export default function Login () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (val: string) => {
    if (!val) return 'Email field cannot be empty';
    if (!val.match(/[^@]+@[^.]+\.[a-zA-Z]+/i)) return 'Wrong email format';
    return '';
  };
  const validatePassword = (val: string) => {
    if (!val) return 'Password field cannot be empty';
    if (val.length < 8) return 'Password is too short';
    return '';
  };

  const setValue = (val: string, item: FieldElemType) => item.set(val);
  const submit = () => {
    let errs: {[key: string]: string} = {};
    fields.forEach((field) => errs[field.slug] = field.validate(field.val));

    const hasErrors = Object.values(errs).some((err) => !!err);
    if (hasErrors) {
      setErrors(errs as {email: string, password: string});
      return;
    }
  };

  const fields: FieldElemType[] = [
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
  ];

  return (
    <Card className="mt-2">
      <h2 className={styles.formH2}>Log In</h2>
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
