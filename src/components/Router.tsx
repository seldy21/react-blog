import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import PostList from 'pages/posts';
import PostNew from 'pages/posts/new';
import PostEdit from 'pages/posts/edit';
import ProfilePage from 'pages/profile';
import SignUp from 'pages/signup';
import Login from 'pages/login';
import PostPage from 'pages/posts/detail';

function Router() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/posts/:id" element={<PostPage/>} />
        <Route path="/posts/new" element={<PostNew/>} />
        <Route path="/posts/edit" element={<PostEdit/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Navigate to="/" />} /> {/*default route*/}
      </Routes>
  );
}

export default Router;
