import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deletePost } from './postsSlice';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'

const PostsExcerpt = ({ post }) => {
    const navigate = useNavigate()

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)

    const dispatch = useDispatch()

    const onDeletePostClicked = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post',title,content, err)
        }
    }
    return (
        <div className="post">
            
        <label className='subtitle' style={{marginRight:'78%'}}>Title:</label>
        <div className="control-buttons">
        <h2 className="post_title">{post.title}<hr/>
        <div className="control-buttons">
            <span className='idd'>Id : {post.id}</span>
            <button className='edit1'><Link style={{color: 'white', textDecoration: 'none'}} to={`/post/edit/${post.id}`}>Edit Post</Link></button>
            <button  className='delete1' onClick={onDeletePostClicked}>Delete Post</button>
        </div>
        </h2>
        <hr className='hr'/>
        <img src={post.body} className='image' alt='pic'/>
        </div>
        
        </div>
    )
}
export default PostsExcerpt