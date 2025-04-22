import { useContext, useEffect, useState } from "react";
import { CommentInterface, PostProp } from "./PostList";
import { db } from "firebaseApp";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface CommentsProps {
  post: PostProp | null;
  getPost: (id: string) => void;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState<string>("");

  // 댓글 내용 작성
  const hnadleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const postRef = doc(db, "posts", post?.id as string);
      if (user?.uid) {
        const commentData = {
          content: comment,
          uid: user.uid,
          email: user.email,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentData),
        });
      }
      getPost(post?.id as string);
      toast.success("댓글이 등록되었습니다! 😁");
      setComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
      toast.error("댓글 등록에 실패했습니다. 😢");
    }
  };

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={handleSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={hnadleChange}
          />
        </div>
        <div className="form__block-submit">
          <input type="submit" value="입력" className="form__input-submit" />
        </div>
      </form>
      <div className="comments__list">
        {post?.comments?.slice(0).reverse().map((item, index) => (
          <div key={`comment_${index}`} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__profile"></div>
              <div className="comment__authour-name">{item.email}</div>
              <div className="comment__date">{item.createdAt}</div>
              <div className="comment__delete">삭제</div>
            </div>
            <div className="comment__text">
              <div className="comment__text">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
