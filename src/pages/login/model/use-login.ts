import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '~/app/store';
import { userSlice } from '~/entities/user';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const login = () => {
    dispatch(userSlice.actions.setUser(null));
  };

  const validateEmail = (val: string) => {
    if (!val) return 'Email field cannot be empty';
    if (!val.match(/[^@]+@[^.]+\.[a-zA-Z]+/i)) return 'Wrong email format';
    return '';
  };

  const submit = async () => {
    setError('');
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }

    // navigate('/');
    try {
      console.log(email);
    } catch (e) {
      console.error(e);
      setError('An error occurred on the server');
    }
  };

  return {
    email,
    error,
    submit,
    setEmail,
  };
};
