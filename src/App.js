import PostsList from "./Components/PostsList";
import AddPostForm from "./Components/AddPostForm";
import EditPostForm from "./Components/EditPostForm";
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>

        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
