import s from './Post.module.css'
import profile from '../../../img/profile.jpg'
import like from '../../../icons/heart.svg'
import del from '../../../icons/delete.svg'

const removePost = () => {

}


const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={profile} alt="" />
            <p> {props.text} </p>
            <div className={s.right_block}>
                <span> {props.likesCount} <img src={like} alt="" /> </span>
                <button onClick={removePost}> <img src={del} alt="" /> </button>
            </div>
        </div >
    )
}

export default Post;