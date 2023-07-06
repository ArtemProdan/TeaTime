import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo(props => {
    let postsElements = props.postsData
        .map(post => <Post message={post.message} imgSrc={post.imgSrc} valueLike={post.valueLike} key={post.id}/>)

    const addNewPost = (values) => {
        props.addPost(values.newPost)
    }

    return (
        <div className={styles.container}>
            <h4>My post</h4>
            <NewPostReduxForm onSubmit={addNewPost} />
            <div className="posts">
                {postsElements}
            </div>
        </div>
    )
});

const maxLength15 = maxLengthCreator(15);

const NewPostForm = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div className={styles.newPost}>
                <Field
                    component={Textarea}
                    name={'newPost'}
                    placeholder={'Enter new post'}
                    validate={[required, maxLength15]}
                />
                <button className={styles.button}>Add post</button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm({form: 'post'})(NewPostForm);

export default MyPosts;
