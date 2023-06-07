import MyPosts from './MyPosts'
import { addPost} from '../../redux/posts-reducer'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
    return {
        posts : state.postsData.posts 
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost}) (MyPosts)
export default MyPostsContainer;
