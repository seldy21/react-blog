import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostProp } from "./PostList";
import { db } from "firebaseApp";
import Loader from "./Loader";

export default function PostDetail() {
  const params = useParams();

  const [post, setPost] = useState<PostProp | null>(null);

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProp);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost(params.id);
    }
  }, [params.id]);
  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile"></div>
              <div className="post__authour-name">{post?.author}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__utils-box">
              <div className="post__delete">삭제</div>
              <div className="post__edit">
                <Link to="/posts/edit">수정</Link>
              </div>
            </div>
            <div className="post__text">{post?.content}</div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
