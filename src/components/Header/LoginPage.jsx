import s from './Header.module.css'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../Common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { login } from '../../redux/auth-reducer'
import errorCss from '../Common/FormsControls/FormsControls.module.css'

let maxLength = maxLengthCreator(100)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <Field placeholder='email' name={'email'} component={Input} validate={[required, maxLength]} />
            <Field placeholder='password' name={'password'} type='password' component={Input} validate={[required, maxLength]} />

            {/* <ul className={`${s.menu} ${isMenuActive ? s.active : ''}`}> */}

            {/* {props.error &&  */}
            <div className={`${errorCss.form_summary_error} ${props.error ? errorCss.active : ''}`}>
                    {props.error}
                </div>
                {/* } */}

            <div className={s.remember}>
                <button>Войти</button>
                <input type="checkbox" name={'rememberMe'} />
                <h2>Запомнить меня</h2>
            </div>
            <div className={s.bottom}>
                <h2>Забыли пароль?</h2>
                <h2>Зарегестрироваться</h2>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) { return <Navigate to='/' /> }

    return (
        <div className={s.loginPage}>
            <h1>Введите логин и пароль</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div >
    )
}

const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth })

export default connect(mapStateToProps, { login })(LoginPage)
/*
connect
    LoginPage
        LoginReduxForm
            LoginForm
*/