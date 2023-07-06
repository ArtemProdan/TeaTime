import React from "react";
import  styles from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItems = (props) => {
    let path = "/dialogs/" + props.id
    return (
        <div className={styles.dialog}>
            <NavLink to={path} activeClassName={styles.active}>{props.name}</NavLink>
            <img className={styles.img} src={props.imageSrc} alt=""/>
        </div>
    )
}

export default  DialogItems;