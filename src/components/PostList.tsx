import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigate?: boolean;
}

export interface PostProp {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigate = true }: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const [posts, setPosts] = useState<PostProp[]>([]);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const postData = { ...doc.data(), id: doc.id } as PostProp;
      setPosts((prevPosts) => [...prevPosts, postData]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  //삭제
  const handleDelete = async () => {
    
  };
  return (
    <>
      {hasNavigate && (
        <div className="post__navigation">
          <div
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation-active" : ""}
          >
            전체
          </div>
          <div
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation-active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <div key={`post_${index}`} className="post__box">
              <Link to={`/posts/${item.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__authour-name">{item.author}</div>
                  <div className="post__date">{item.createdAt}</div>
                </div>
                <div className="post__title">{item.title}</div>
                <div className="post__text">{item.summary}</div>
                
              </Link>
                {user?.email === item.author && (
                  <div className="post__utils-box">
                    <div className="post__delete" onClick={handleDelete}>삭제</div>
                    <div className="post__edit"><Link to={`/posts/edit/${item.id}`}>수정</Link></div>
                  </div>
                )}
            </div>
          ))
        ) : (
          <>게시글이 없습니다.</>
        )}
      </div>
    </>
  );
}
