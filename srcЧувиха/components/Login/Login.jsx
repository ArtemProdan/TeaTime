import React from "react";
import {reduxForm} from "redux-form";
import {fieldCreator, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from './../common/FormsControls/FormsControls.module.css'


const Login = (props) => {
    if (props.isAuth){
        return <Navigate to={'/profile'} />
    }

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                {fieldCreator( Input,'email', [required], 'Email',)}
                {fieldCreator( Input,'password', [required], 'Password', 'password')}
                <div className={styles.checkbox}>
                    {fieldCreator( Input,'rememberMe', [], null, 'checkbox', 'remember me')}
                </div>

                {error && <div className={styles.totalError}>{error}</div>}
                {captchaUrl && <img src={captchaUrl} alt="img"/>}
                {captchaUrl && fieldCreator(Input, 'captcha', [required], 'Symbols from image', 'text')}
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, {login})(Login);