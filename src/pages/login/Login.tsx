import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useFormik} from "formik";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import {sendLoginData} from "./loginReducer";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from "@mui/material";

type FormikErrorType = {
    email?: string
    password?: string,
    rememberMe?: boolean
}

const Login = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const navigate = useNavigate()


    useEffect(() => {
        if (isLoggedIn) {
            navigate('/profile')
        }
    }, [isLoggedIn]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
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
                rememberMe: values.rememberMe
            }
            dispatch(sendLoginData(data))
            formik.resetForm()
        },
    })

    return (
        <div className='frame'>
            <div className='title'>Sign in</div>
            <form className="form" onSubmit={formik.handleSubmit}>
                <Input placeholder='Email'
                       {...formik.getFieldProps('email')}
                       error={formik.errors.email && formik.touched.email}
                       errorText={formik.errors.email}/>
                <Input placeholder='Password' password={true} {...formik.getFieldProps('password')}
                       error={formik.errors.password && formik.touched.password}
                       errorText={formik.errors.password}/>
				<FormControlLabel label='Remember me' labelPlacement="start"
								  control={<Checkbox checked={formik.values.rememberMe}
													 {...formik.getFieldProps('rememberMe')}/>}
				/>
                <NavLink className={'login__forgotLink'}
                         to="/password-recovery">Forgot Password</NavLink>
                <div style={{marginTop: '36px', display: 'flex', justifyContent: 'center'}}>
                    <Button title='Sign in' disabled={status === 'loading'} type='submit'/>
                </div>
            </form>
            <div className="login__text">
                'Don’t have an account?'
            </div>
            <NavLink className={'login__link'}
                     to="/registration">Sign Up</NavLink>
        </div>
    );
};

export default Login;
