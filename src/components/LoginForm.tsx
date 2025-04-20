import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form className="form form--lg" action="/login" method="POST">
      <h1>로그인</h1>
      <div className="form__block-login">
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" required />
      </div>
      <div className="form__block-login">
        <label htmlFor="password">패스워드</label>
        <input type="text" id="password" required />
      </div>
      <div className="form__block-login">
        계정이 없으신가요? <Link to="/signUp" className="form__link">회원가입하기</Link>
      </div>
      <div className="form__block-login">
        <button type="submit" className="form__btn-submit">
          로그인
        </button>
      </div>
    </form>
  );
}
