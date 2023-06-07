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
});

const LoginPage = (props) => {
    if (props.isAuth) return <Navigate to='/profile' />;

    return (
        <div className={s.loginPage}>
            <h1>Авторизоваться</h1>
            {props.message && <div>{props.message}</div>}
            <Formik
                initialValues={{ password: '', email: "" }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    props.login(values.email, values.password, true);
                }}
            >
                {({ errors, touched}) => (
                    <Form>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    message: state.auth.message
});

export default connect(mapStateToProps, { login })(LoginPage);
