import React from "react";
import  styles from './../Dialogs.module.css'

const Message = (props) => {
    return (
        <div className={styles.message}><p>{props.message}</p></div>
    );
};

export default Message;