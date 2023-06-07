import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Gallery from '../../icons/gallery.svg'
import Groups from '../../icons/groups.svg'
import Messages from '../../icons/messages.svg'
import Music from '../../icons/music.svg'
import News from '../../icons/news.svg'
import ProfileIcon from '../../icons/profile.svg'
import catIcon from '../../icons/catSVG.svg'
import shestil from '../../icons/tea.svg'


export const Navbar = () => {

    let activeStyle = {
        color: "green",
        fontWeight: "bold",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    };
    // let activeClassName = 'active';

    let NavItem = (props) => {
        return (
            <div className='nav__item'>
                <NavLink to={props.to} style={({ isActive }) => isActive ? activeStyle : undefined}>
                    <img src={props.src} alt="" />
                    <p> {props.name} </p>
                </NavLink>
            </div>
        )
    }

    return (
        <nav className="nav">
            <NavItem to='/profile' src={ProfileIcon} name='Profile' />
            <NavItem to='/dialogs' src={Messages} name='Messages' />
            <NavItem to='/music' src={Music} name='Music' />
            <NavItem to='/news' src={News} name='News' />
            <NavItem to='/users' src={Groups} name='Users' />
            <NavItem to='/gallery' src={Gallery} name='Gallery' />
            <NavItem to='/groups' src={catIcon} name='Cat' />
            <NavItem to='/shestil' src={shestil} name='Shestil' />
        </nav>

    )
}