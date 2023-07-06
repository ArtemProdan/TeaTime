import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import imgLogo from '../../assets/images/images.png'
import imgAva from '../../assets/images/ava.jpg'

const  Header = (props) => {

    return (
        <header className={styles.header}>
            
            <div className={"container" +  " " + styles.headerContainer}>
                <div className={styles.logo}>
                    <img className={styles.logoImg} src={imgLogo} alt="img"/>
                    {props.burgerEditMode
                        ? <div onClick={() => {props.setToggleBurgerMenu(false)}} className={styles.headerBurger + " " + styles.active}><span></span></div>
                        : <div onClick={() => {props.setToggleBurgerMenu(true)}} className={styles.headerBurger}><span></span></div>
                    }
                </div>
                <div className={styles.loginBlock}>
                    {props.isAuth
                        ? <div className={styles.block}>
                            {props.imgSrc ? <img className={styles.ava} src={props.imgSrc}/> : <img className={styles.ava} src={imgAva}/>}
                            <span>{props.login}</span>
                            <button className={styles.logout} onClick={props.logout}>Log out</button>
                        </div>
                        : <div className={styles.login}><NavLink to={'/login'}>Login</NavLink></div>
                    }
                </div>
            </div>
        </header>
    )
};

export default Header;