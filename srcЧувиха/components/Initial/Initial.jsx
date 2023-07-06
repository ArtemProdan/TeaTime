import React from 'react';
import styles from './Initial.module.css'

const Initial = (props) => {
    return <div>
        <div className={styles.title}>SOCIAL NETWORK FOR PROGRAMMERS</div>
        <div  className={styles.img}>
            <img src={'https://lvivity.com/wp-content/uploads/2020/02/highest-paying.jpg'} alt=''/>
        </div>


    </div>
}

export default Initial;