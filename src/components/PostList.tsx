import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigate?: boolean;
  defaultTab?: "all" | "my" | CategoryType;
}

export interface PostProp {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string;
  category: CategoryType;
}

type TabType = "all" | "my";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

export default function PostList({
  hasNavigate = true,
  defaultTab = "all",
}: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );

  const [posts, setPosts] = useState<PostProp[]>([]);

  const getPosts = async () => {
    setPosts([]);
    const postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my") {
      // 나의 글
      postsQuery = query(
        postsRef,
        orderBy("createdAt", "desc"),
        where("author", "==", user?.email)
      );
    } else if (activeTab === "all") {
      // 전체 글
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } else {
      // 카테고리별 글
      postsQuery = query(
        postsRef,
        orderBy("createdAt", "desc"),
        where("category", "==", activeTab)
      );
    }

  
    const querySnapshot = await getDocs(postsQuery);
    querySnapshot.forEach((doc) => {
      const postData = { ...doc.data(), id: doc.id } as PostProp;
      setPosts((prevPosts) => [...prevPosts, postData]);
    });
  };

  useEffect(() => {
    getPosts();
  }, [activeTab, user]);

  //삭제
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        toast.success("삭제되었습니다!");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
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
            className={`${activeTab === "my" ? "post__navigation-active" : ""} post__navigation-link`}
          >
            나의 글
          </div>
          {CATEGORIES.map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              className={`${activeTab === item ? "post__navigation-active" : ""} post__navigation-link`}
            >
              {item}
            </div>
          ))}
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
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(item.id)}
                  >
                    삭제
                  </div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${item.id}`}>수정</Link>
                  </div>
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
