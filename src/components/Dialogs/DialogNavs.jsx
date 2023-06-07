import s from './Dialogs.module.css'
import avatar from '../../img/profile.jpg'
import { NavLink } from 'react-router-dom'

export const DialogNavs = () => {
    return (
        <div className={s.dialogNavs}>
            <NavLink to='/'>
                < img src={avatar} alt="" />
                <h1>Jenna Lee</h1>
            </NavLink>
        </div >
    )
}