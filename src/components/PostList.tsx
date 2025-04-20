import firebase from "firebaseApp";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigate?: boolean;
}

console.log(firebase)
type TabType = "all" | "my";

export default function PostList({ hasNavigate = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  return (
    <>
      {hasNavigate && (
        <div className="post__navigation">
          <div onClick={()=>setActiveTab("all")} className={activeTab === "all" ? "post__navigation-active" : ""}>
            전체
          </div>
          <div onClick={()=>setActiveTab("my")} className={activeTab === "my" ? "post__navigation-active" : ""}>
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {[...Array(10)].map((_, index) => (
          <div key={`post_${index}`} className="post__box">
            <Link to={`/posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div className="post__authour-name">이름</div>
                <div className="post__date">2023-10-01</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                r since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
