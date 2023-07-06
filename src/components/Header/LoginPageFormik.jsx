import React from "react";
import { Formik, Field, Form } from "formik";
import s from './Header.module.css';
import { login } from '../../redux/auth-reducer';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    // captcha: Yup.string().required('Required'),
});

const LoginPage = ({ message, login, isAuth, captchaURL }) => {
    if (isAuth) return <Navigate to='/profile' />;

    return (
        <div className={s.loginPage}>
            <h1>Авторизоваться</h1>
            {message && <div>{message}</div>}
            <Formik
                initialValues={{ password: '', email: "", rememberMe: false, captcha: '' }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    // alert(JSON.stringify(values, null, 2))
                    // await new Promise((resolve) => setTimeout(resolve, 500));
                    login(values.email, values.password, values.rememberMe, values.captcha);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}

                        <Field name="password" type="password" />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}

                        <h2>Запомнить меня</h2>
                        <Field name="rememberMe" type="checkbox" />

                        {captchaURL && <Field name="captcha" type="text" />}
                        {errors.captcha && touched.captcha ? <div>{errors.captcha}</div> : null}
                        {captchaURL && <img src={captchaURL} alt="captcha" />}
                        
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    message: state.auth.message,
    captchaURL: state.auth.captchaURL
});

export default connect(mapStateToProps, { login })(LoginPage);
