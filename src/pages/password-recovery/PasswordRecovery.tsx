import React, { useState } from 'react';

import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { CustomButton } from '../../components/customButton/CustomButton';
import { Input } from '../../components/input/Input';

import { sendPasswordRecoveryData } from './passwordRecoveryReducer';

type FormikErrorType = {
  email?: string;
};

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch();
  const emailSent = useAppSelector(state => state.passwordRecovery.sendEmailRecovery);
  const status = useAppSelector(state => state.app.status);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const [messageEmail, setMessageEmail] = useState<string>('example@mail.com');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Поле обязательно для заполнения';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email указан некорректно';
      }

      return errors;
    },
    onSubmit: values => {
      setMessageEmail(values.email);
      dispatch(sendPasswordRecoveryData(values.email));
      formik.resetForm();
    },
  });

  if (isLoggedIn) return <Navigate to="/profile" />;

  return (
    <div className="frame">
      <div className="title">Forgot your password?</div>
      {emailSent ? (
        <div className="registration">
          <div className="registration__img" />
        </div>
      ) : (
        <form className="form" onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Email"
            {...formik.getFieldProps('email')}
            error={formik.errors.email && formik.touched.email}
            errorText={formik.errors.email}
          />
          <div className="passwordRecovery__text">
            Enter your email address and we will send you further instructions
          </div>
          <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
            <CustomButton
              title="Send instructions"
              disabled={status === 'loading'}
              submit
            />
          </div>
        </form>
      )}

      <div className="registration__text">
        {emailSent
          ? `We’ve sent an Email with instructions to ${messageEmail}`
          : 'Don’t have an account?'}
      </div>
      <NavLink className="registration__link" to="/">
        Sign In
      </NavLink>
    </div>
  );
};
