import { Link } from "react-router-dom";
import { IoSunnyOutline, IoMoon } from "react-icons/io5";
import { useContext } from "react";
import ThemContext from "context/ThemContext";
import { COLORS } from "utils/COLORS";

export default function Header() {
  const context = useContext(ThemContext);

  return (
    <header>
      <Link to="/" className="header__logo">
        홈으로
      </Link>
      <div className="header__link">
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
      {context.theme === "light" ? (
        <h2>
          <IoSunnyOutline onClick={context.toggleMoode} color={COLORS.black} />
        </h2>
      ) : (
        <h2>
          <IoMoon onClick={context.toggleMoode} color={COLORS.white}/>
        </h2>
      )}
    </header>
  );
}
