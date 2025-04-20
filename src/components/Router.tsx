import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import PostList from "pages/posts";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import Login from "pages/login";
import PostPage from "pages/posts/detail";
import SignUpPage from "pages/signup";
import { useState } from "react";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //firebase auth state

  return (
    <Routes>
      {isAuthenticated ? (
        <>{/* 로그인 된 경우 */}
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit" element={<PostEdit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} /> {/*default route*/}
        </>
      ) : (
        <>{/* 로그인 안 된 경우 */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} /> {/*default route*/}
        </>
      )}
    </Routes>
  );
}

export default Router;
