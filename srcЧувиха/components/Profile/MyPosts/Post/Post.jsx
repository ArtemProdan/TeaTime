import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styles.item}>
            <div className={styles.post}>
                <img src={props.imgSrc} alt="img" />
                <p>{props.message}</p>
            </div>
            <a className={styles.like}>♥ like <span>{props.valueLike}</span> </a>
        </div>
    )
};

export default Post;
