import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <form className="form form--lg" action="/login" method="POST">
      <h1>회원가입</h1>
      <div className="form__block-login">
        <label htmlFor="id">이메일</label>
        <input type="text" id="id" required />
      </div>
      <div className="form__block-login">
        <label htmlFor="password">비밀번호</label>
        <input type="text" id="password" required />
      </div>
      <div className="form__block-login">
        <label htmlFor="passwordcConfirm">비밀번호 확인</label>
        <input type="text" id="passwordcConfirm" required />
      </div>
      <div className="form__block-login">
        계정이 이미 있으신가요? <Link to="/login" className="form__link">로그인하기</Link>
      </div>
      <div className="form__block-login">
        <button type="submit" className="form__btn-submit">
          생성
        </button>
      </div>
    </form>
  );
}
