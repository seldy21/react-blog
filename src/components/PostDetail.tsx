import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostProp } from "./PostList";
import { db } from "firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function PostDetail() {
  const params = useParams();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        toast.success("삭제되었습니다!");
        navigate("/");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };
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
              <div className="post__category">{post?.category}</div>
              <div className="post__delete" onClick={handleDelete}>
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
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
