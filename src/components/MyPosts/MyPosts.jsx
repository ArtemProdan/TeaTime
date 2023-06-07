import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import add from '../../icons/add.svg'
import send from '../../icons/send-paper.svg'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { Textarea } from '../Common/FormsControls/FormsControls'

let key = 0
let maxLength = maxLengthCreator(30)


const MyPosts = (props) => {
    console.log('Вызван MY POSTS')
    let postsList = props.posts.map(post => <Post text={post.text} id={post.id} key={post.id + ++key} likesCount={post.likesCount} />)

    const openBtn = React.useRef()
    const newPostElement = React.useRef()
    const postAddArea = React.useRef()


    const setActiveAddPostArea = () => {
        postAddArea.current.classList.add(`${s.active}`)
        openBtn.current.classList.add(`${s.active}`)
    }

    const removeActiveAddPostArea = () => {
        postAddArea.current.classList.remove(`${s.active}`)
        openBtn.current.classList.remove(`${s.active}`)
    }


    let onAddPost = (values) => {
        if (values.newPost === null ) {
            removeActiveAddPostArea()
        } else {
            props.addPost(values.newPost)
            removeActiveAddPostArea()
            // newPostElement.current.value = ''
        }
    }
    // , maxLength15, minLength2

    const PostSendForm = (props) => {

        return (
            <form className={s.post_add_area} onSubmit={props.handleSubmit} ref={postAddArea}>
                <Field name='newPost' component={Textarea} ref={newPostElement}
                    validate={[required, maxLength]} type='textarea' /> 
                <button className={s.add_post_btn}> <img src={send} alt="" /> </button>
            </form>
        )
    }

    const PostSendFormRedux = reduxForm({ form: 'addMessage' })(PostSendForm)


    return (
        <div className={s.wrapper}>
            <button className={s.open_post_area}
                onClick={setActiveAddPostArea}
                ref={openBtn}>
                <h1>add post</h1>
                <img src={add} alt="" />
            </button>

            <PostSendFormRedux onSubmit={onAddPost} />

            <div className={s.posts}>
                {postsList}
            </div>
        </div>
    )
}

export default MyPosts;


