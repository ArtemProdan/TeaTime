import s from './Header.module.css'
import { NavLink } from 'react-router-dom'


export const Login = () => {
    return (
        <div className={s.loginBlock}>
            <NavLink to={'/login'}>Log In</NavLink>
        </div>
    )
}