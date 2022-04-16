import { Link } from 'react-router-dom';
import Card from '~/shared/ui/card';
import FormInput from '~/shared/ui/form-input';
import Button from '~/shared/ui/button';
import Form from '~/components/form';
import styles from '~/pages/form.module.css';
import { useLogin } from '../model/use-login';

export default function Page() {
  const { submit, email, setEmail, error } = useLogin();

  return (
    <Card className="mt-2">
      <h2 className={styles.formH2}>Log In</h2>
      <Form submitHandler={submit}>
        <FormInput
          value={email}
          type="text"
          label="Label"
          required
          inputHandler={(val) => setEmail(val)}
        />
        <p className={styles.textLink}>
          If you don&apos;t have an account,&nbsp;
          <Link to="/signup">create it!</Link>
        </p>
        <Button className="mt-2 mb-1" submit>
          Log in
        </Button>

        {error && <p className={styles.bigError}>{error}</p>}
      </Form>
    </Card>
  );
}
