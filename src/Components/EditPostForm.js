import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setContent(e.target.files[0]);
        }
    }

    const canSave = [title, content].every(Boolean);

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                dispatch(updatePost({ id: post.id, title, body: URL.createObjectURL(content)})).unwrap()

                setTitle('')
                setContent('')
                navigate(`/`)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const onCancelPostClicked = () => {
        navigate('/')
    }

    return (
        <div className="post" style={{marginTop:'10%'}}>
        <h1 style={{marginTop:'-20px'}} className="post_heading">Edit Post</h1>
         <form className="form">
        <label className='subtitle' htmlFor="postTitle" style={{marginRight:'78%'}}>Title:</label>
        <input required
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged} placeholder="Enter Post Title" /><br /><br />
            <label className='subtitle' htmlFor="postContent" style={{marginRight:'68%'}}>Photo: <img className='image1' alt='pic' src={content}/></label>
            <input required
            type='file' style={{backgroundColor:'white'}}
            id="postContent"
            name="postContent"
            onChange={onContentChanged} accept="image/*"/>
          <br /><br />
        </form>
        <div className="control-buttons">
          <button className="edit" onClick={onSavePostClicked}>Edit Post</button>
          <button className="delete" onClick={onCancelPostClicked}>Cancel</button>
        </div>
        </div>
    )
}

export default EditPostForm