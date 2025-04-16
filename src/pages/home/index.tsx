import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <Link to="/post/new">글쓰기</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/profile">프로필</Link>
        </div>
      </header>
      <div className="post-list">postlist</div>
      <footer>
        <div>menu1</div>
        <div>menu2</div>
        <div>menu3</div>
      </footer>
    </div>
  );
}