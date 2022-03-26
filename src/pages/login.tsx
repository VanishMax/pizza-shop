import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/card';
import FormInput from '../components/form-input';
import Button from '../components/button';
import Form from '../components/form';
import { FieldElemType } from './signup';
import { User } from '../types';
import { GlobalContext } from '../components/global-context';
import styles from './styles/form.module.css';

type Errors = {
  email: string;
  password: string;
};

export default function Login() {
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [bigError, setBigError] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
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

  const setValue = (val: string, item: FieldElemType) => item.set(val);
  const submit = async () => {
    const errs: { [key: string]: string } = {};
    fields.forEach((field) => {
      errs[field.slug] = field.validate(field.val);
    });

    const hasErrors = Object.values(errs).some((err) => !!err);
    setErrors(errs as Errors);
    if (hasErrors) return;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBigError('');

        ctx.set?.('auth', data as { token: string; user: User });
        navigate('/');
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
          If you don&apos;t have an account,&nbsp;
          <Link to="/signup">create it!</Link>
        </p>
        <Button className="mt-2 mb-1" submit>
          Log in
        </Button>

        {bigError && <p className={styles.bigError}>{bigError}</p>}
      </Form>
    </Card>
  );
}
