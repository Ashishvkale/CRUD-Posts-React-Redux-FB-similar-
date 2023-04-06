import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { Link } from "react-router-dom"

const PostsList = () => {

    const posts = useSelector(selectAllPosts);

    let content;
    
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)


    return (
        <div>
            <div className="App">
            <div className="navbar">
                <h2 className="center" style={{marginLeft:'30px'}}>Post</h2>
                <button className='cut'style={{marginRight:'30px'}}><Link style={{color: 'white', textDecoration: 'none'}} to="/post">New Post</Link></button>
            </div>
        </div>
        <br/><br/>
        <section>
            {content}
        </section>
        </div>
    )
}
export default PostsList