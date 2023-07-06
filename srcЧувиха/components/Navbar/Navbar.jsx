import React from 'react';
import styles from './Navbar.module.css';
import { Routes } from "react-router-dom";
import {NavLink} from "react-router-dom";

const NavbarItem = (props) => {
    return (
        <div className={`${styles.item}`}>
            <NavLink to={props.url} activeClassName={styles.active}>{props.name}</NavLink>
        </div>
    )
}

const Navbar = (props) => {

    let linkElements = props.navbarItem
        .map(link => <NavbarItem name={link.name} url={link.url}  key={link.id}/>);

    return (
        <aside className={props.burgerEditMode ? styles.aside + " " + styles.active : styles.aside} >
            <Routes>
                {linkElements}
            </Routes>
        </aside>
    )
};

export default Navbar;

