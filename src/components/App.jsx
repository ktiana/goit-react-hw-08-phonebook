import { useEffect, lazy } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { selectIsRefreshing } from 'redux/user/selectors';
import { refreshUser } from 'redux/user/operations';
import { HashLoader } from 'react-spinners';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import css from './App.module.css';

const Layout = lazy(() => import('./Layout/Layout'));
const HomePage = lazy(() => import('Pages/HomePage/HomePage'));
const Register = lazy(() => import('Pages/Register/RegisterForm'));
const Login = lazy(() => import('Pages/Login/LoginForm'));
const ContactsPage = lazy(() => import('Pages/ContactsPage/ContactsPage'));
const NotFound = lazy(() => import('./NotFound/NotFound'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div className={css.loader}>
      <HashLoader color="#36d7b7" size={150} />
    </div>
  ) : (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
