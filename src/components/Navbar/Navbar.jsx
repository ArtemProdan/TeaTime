import './Navbar.css'
import { NavLink } from 'react-router-dom'
// import Gallery from '../../icons/gallery.svg'
// import Groups from '../../icons/groups.svg'
// import Messages from '../../icons/messages.svg'
// import Music from '../../icons/music.svg'
// import News from '../../icons/news.svg'
// import ProfileIcon from '../../icons/profile.svg'
// import catIcon from '../../icons/catSVG.svg'
// import shestil from '../../icons/tea.svg'
import { FaUserAlt, FaRegComments, FaMusic, FaRegNewspaper, FaUsers, FaImages, FaCat } from 'react-icons/fa';
import { GiTeapotLeaves } from 'react-icons/gi';




export const Navbar = () => {

    let activeStyle = {
        color: "green",
        fontWeight: "bold",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    };
    // let activeClassName = 'active';

    // const Icons = {
    //     ProfileIcon: <FaUserAlt />,
    // };

    let NavItem = (props) => {
        return (
            <div className='nav__item'>
                <NavLink to={props.to} style={({ isActive }) => isActive ? activeStyle : undefined}>
                    {/* <img src={props.src} alt="" /> */}
                    {props.src}
                    <p> {props.name} </p>
                </NavLink>
            </div>
        )
    }

    return (
        <nav className="nav">
            <NavItem to='/profile' src={<FaUserAlt />} name='Profile' />
            <NavItem to='/dialogs' src={<FaRegComments />} name='Messages' />
            <NavItem to='/music' src={<FaMusic />} name='Music' />
            <NavItem to='/news' src={<FaRegNewspaper />} name='News' />
            <NavItem to='/users' src={<FaUsers />} name='Users' />
            <NavItem to='/gallery' src={<FaImages />} name='Gallery' />
            <NavItem to='/groups' src={<FaCat />} name='Cat' />
            <NavItem to='/shestil' src={<GiTeapotLeaves />} name='Shestil' />
        </nav>

    )
}