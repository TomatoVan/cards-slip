import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { CustomButton } from '../../components/button/CustomButton';
import { Input } from '../../components/input/Input';

import { sendResetPassword } from './passwordNewReducer';

type FormikErrorType = {
  password?: string;
};

export const PasswordNew = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(state => state.app.status);
  const passwordChanged = useAppSelector(state => state.passwordNew.passwordChanged);

  const location = useLocation();

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (location.pathname) {
      const getToken = location.pathname.split('/').reverse()[0];

      setToken(getToken);
    }
  }, [location.pathname]);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.password) {
        errors.password = 'Поле обязательно для заполнения';
      }

      return errors;
    },
    onSubmit: values => {
      dispatch(sendResetPassword(values.password, token));
      formik.resetForm();
    },
  });

  if (passwordChanged) return <Navigate to="/" />;

  return (
    <div className="frame">
      <div className="title">Create new password</div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Password"
          password
          {...formik.getFieldProps('password')}
          error={formik.errors.password && formik.touched.password}
          errorText={formik.errors.password}
        />
        <div className="passwordRecovery__text">
          Create new password and we will send you further instructions to email
        </div>
        <div className="submit">
          <CustomButton
            title="Create new password"
            disabled={status === 'loading'}
            submit
          />
        </div>
      </form>
    </div>
  );
};
