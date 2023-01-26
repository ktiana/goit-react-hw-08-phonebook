import { useDispatch, useSelector } from 'react-redux';

import { registerUser } from 'redux/user/operations';
import css from './Register.module.css';
import { selectIsLoading } from 'redux/contacts/selectors';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const override = {
    display: 'block',
    margin: '0 auto',
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      registerUser({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    ).then(response => {
      toast.success(
        `${response.payload.user.name} you have successfully registered`
      );
    });
    form.reset();
  };

  return (
    <>
      {isLoading ? (
        <HashLoader color="#36d7b7" size={150} cssOverride={override} />
      ) : (
        <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
          <label className={css.label}>
            Username
            <input
              type="text"
              name="name"
              required
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, Aragorn son of Aratorn"
            />
          </label>
          <label className={css.label}>
            Email
            <input
              type="email"
              name="email"
              required
              pattern="[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-z]{2,4}$"
              title="Email example User@mail.com"
            />
          </label>
          <label className={css.label}>
            Password
            <input
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              required
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            />
          </label>
          <button type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
      )}
    </>
  );
};

export default Register;
