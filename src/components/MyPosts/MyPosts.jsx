import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import add from '../../icons/add.svg'
import send from '../../icons/send-paper.svg'
import { Formik } from "formik";
// import { required, maxLengthCreator } from '../../utils/validators/validators'

let key = 0
// let maxLength = maxLengthCreator(30)


const MyPosts = (props) => {
    console.log('Вызван MY POSTS')
    let postsList = props.posts.map(post => <Post text={post.text} id={post.id} key={post.id + ++key} likesCount={post.likesCount} />)

    const openBtn = React.useRef()
    // const newPostElement = React.useRef()
    // const postAddArea = React.useRef()


    // const setActiveAddPostArea = () => {
    //     postAddArea.current.classList.add(`${s.active}`)
    //     openBtn.current.classList.add(`${s.active}`)
    // }

    // const removeActiveAddPostArea = () => {
    //     postAddArea.current.classList.remove(`${s.active}`)
    //     openBtn.current.classList.remove(`${s.active}`)
    // }


    let onAddPost = (values) => {
        // if (values.newPost === null) {
        //     removeActiveAddPostArea()
        // } else {
            // console.log(values)
            alert(JSON.stringify(values))
            props.addPost(values)
            // removeActiveAddPostArea()
            // newPostElement.current.value = ''
            // }
        }

        return (
            <div className={s.wrapper}>

                <button className={s.open_post_area}
                    // onClick={setActiveAddPostArea}
                    ref={openBtn}>
                    <h1>add post</h1>
                    <img src={add} alt="" />
                </button>

                <Formik
                    initialValues={{ value: '' }}
                    onSubmit={(values) => {
                        onAddPost(values)
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values}
                                // name="name"
                            />
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                            <button type="submit" className={s.add_post_btn}> <img src={send} alt="" /> </button>

                        </form>
                    )}
                </Formik>
                {/* <button type="submit" className={s.add_post_btn}> <img src={send} alt="" /> </button> */}

                <div className={s.posts}>
                    {postsList}
                </div>

            </div>
        )
    }

    export default MyPosts;


