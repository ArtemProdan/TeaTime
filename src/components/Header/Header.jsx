import Logo from '../../icons/tea.svg'
import s from './Header.module.css'
// import { Login } from './Login'
import { ThemeSwitcher } from './ThemeSwitcher'
import userDefault from '../../img/user_default.png'
import logout from '../../icons/logout.svg'
import { useState } from 'react'
// import { Navigate } from 'react-router-dom'


export const Header = (props) => {
    // debugger
    const { logOut } = props
    const [isMenuActive, setIsMenuActive] = useState(false)
    const handleAvatarClick = () => {
        setIsMenuActive(!isMenuActive)
        if (!props.isAuth) {setIsMenuActive(!isMenuActive)}
    }

    const onAvatarClick = () => { 
        logOut()
        setIsMenuActive(!isMenuActive)
    }   


    return (
        <div className={s.header}>

            <div className={s.header_left}>
                <img src={Logo} alt="" />
                <h1>TeaTime</h1>
            </div>

            <div className={s.header_right}>
                <ThemeSwitcher />

                {/* <div className={s.logined}> {props.isAuth ? props.login : <Navigate to='/login' />} </div> */}

                <img className={s.avatar} src={userDefault} alt="" onClick={handleAvatarClick} />

                <ul className={`${s.menu} ${isMenuActive ? s.active : ''}`}>
                    <li className={s.logout_btn} onClick={onAvatarClick}>
                        <img src={logout} alt="" />
                        <p>Logout</p>
                    </li>
                </ul>
            </div>


        </div >
    )
}