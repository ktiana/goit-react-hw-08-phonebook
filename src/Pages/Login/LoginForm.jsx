import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from 'redux/user/operations';
import css from './Login.module.css';
import { selectIsLoading } from 'redux/contacts/selectors';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      loginUser({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    ).then(response => {
      toast.success(`Welcome back, ${response.payload.user.name}`);
    });
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" required />
      </label>
      <button type="submit" disabled={isLoading}>
        Log In
      </button>
    </form>
  );
};

export default Login;
