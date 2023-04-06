import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState();

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
                dispatch(addNewPost({ title, body: URL.createObjectURL(content) })).unwrap()

                setTitle('')
                setContent('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }
    const onCancelPostClicked = () => {
        setTitle('')
        setContent('')
        navigate('/')
    }


    return (
        <div className="post-container" style={{marginTop:'8%'}}>
        <h1 className="post_heading">Create Post</h1>
        <form className="form">
    <label className='subtitle' htmlFor="postTitle" style={{marginRight:'78%'}}>Title:</label>
    <input required
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={onTitleChanged} placeholder="Enter Post Title" /><br /><br />
         <label className='subtitle' htmlFor="postContent" style={{marginRight:'75%'}}>Photo:</label>
            <input type="file" required style={{backgroundColor:'white'}}
            id="postContent"
            name="postContent"
            onChange={onContentChanged} accept="image/*"
        /><br /><br />
        </form>
        <div className="control-buttons">
          <button className='edit' 
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
                <button className='delete' 
                    type="button"
                    onClick={onCancelPostClicked}
                >Cancel</button>
        </div>
      </div>
    )
}
export default AddPostForm