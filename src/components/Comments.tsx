import { useContext, useEffect, useState } from "react";
import { CommentInterface, PostProp } from "./PostList";
import { db } from "firebaseApp";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface CommentsProps {
  post: PostProp | null;
}

export default function Comments({ post }: CommentsProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState<string>("");

  const [commentList, setCommentList] = useState<CommentInterface[]>([]);


  useEffect(() => {}, [post]);
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
        {[...Array(10)].map((item, index) => (
          <div key={index} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__profile"></div>
              <div className="comment__authour-name">작성자</div>
              <div className="comment__date">2023-10-10</div>
              <div className="comment__delete">삭제</div>
            </div>
            <div className="comment__text">
              <div className="comment__text">댓글 내용</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
