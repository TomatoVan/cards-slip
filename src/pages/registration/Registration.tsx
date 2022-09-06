import React from 'react';

import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { CustomButton } from '../../components/customButton/CustomButton';
import { Input } from '../../components/input/Input';

import { sendRegistrationData } from './registrationReducer';

type FormikErrorType = {
  email?: string;
  password?: string;
  confirm_password?: string;
};

export const Registration = () => {
  const dispatch = useAppDispatch();
  const send = useAppSelector(state => state.registration.send);
  const status = useAppSelector(state => state.app.status);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Поле обязательно для заполнения';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email указан некорректно';
      }
      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Пароли должны совпадать';
      }
      if (!values.password) {
        errors.password = 'Поле обязательно для заполнения';
      }
      if (!values.confirm_password) {
        errors.confirm_password = 'Поле обязательно для заполнения';
      }

      return errors;
    },
    onSubmit: values => {
      const data = {
        email: values.email,
        password: values.password,
      };

      dispatch(sendRegistrationData(data));
      formik.resetForm();
    },
  });

  if (send) return <Navigate to="/" />;
  if (isLoggedIn) return <Navigate to="/packs?accessory=All" />;

  return (
    <div className="frame">
      <div className="title">Sign Up</div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Email"
          {...formik.getFieldProps('email')}
          error={formik.errors.email && formik.touched.email}
          errorText={formik.errors.email}
        />
        <Input
          placeholder="Password"
          password
          {...formik.getFieldProps('password')}
          error={formik.errors.password && formik.touched.password}
          errorText={formik.errors.password}
        />
        <Input
          placeholder="Confirm password"
          password
          {...formik.getFieldProps('confirm_password')}
          error={formik.errors.confirm_password && formik.touched.confirm_password}
          errorText={formik.errors.confirm_password}
        />
        <div className="submit">
          <CustomButton title="Sign Up" disabled={status === 'loading'} submit />
        </div>
      </form>
      <div className="registration__text">Already have an account?</div>
      <NavLink className="registration__link" to="/">
        Sign In
      </NavLink>
    </div>
  );
};
