import { useState } from "react";

export default function Comments() {
  const [comment, setComment] = useState<string>("");
  const hnadleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <div className="comments">
      <form className="comments__form">
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
