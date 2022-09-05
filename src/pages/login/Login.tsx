import React, { useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { CustomButton } from '../../components/customButton/CustomButton';
import { Input } from '../../components/input/Input';

import { sendLoginData } from './loginReducer';

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.app.status);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Поле обязательно для заполнения';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email указан некорректно';
      }
      if (!values.password) {
        errors.password = 'Поле обязательно для заполнения';
      }

      return errors;
    },
    onSubmit: values => {
      const data = {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      };

      dispatch(sendLoginData(data));
      formik.resetForm();
    },
  });

  return (
    <div className="frame">
      <div className="title">Sign in</div>
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
        <FormControlLabel
          label="Remember me"
          labelPlacement="start"
          control={
            <Checkbox
              checked={formik.values.rememberMe}
              {...formik.getFieldProps('rememberMe')}
            />
          }
        />
        <NavLink className="login__forgotLink" to="/password-recovery">
          Forgot Password
        </NavLink>
        <div className="submit">
          <CustomButton title="Sign in" disabled={status === 'loading'} submit />
        </div>
      </form>
      <div className="login__text">Don’t have an account?</div>
      <NavLink className="login__link" to="/registration">
        Sign Up
      </NavLink>
    </div>
  );
};
