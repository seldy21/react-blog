import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyle } from "utils/toastStyle";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value?.match(validEmail)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    } else if (name === "password") {
      setPassword(value);
      if (value.length < 8) {
        setError("비밀번호는 최소 8자 이상이어야 합니다.");
      } else {
        setError("");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("로그인에 성공하였습니다! 🦄", toastStyle);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(`로그인에 실패하였습니다. 😢 ${error?.code}`, toastStyle);
    }
  }

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <h1>로그인</h1>
      <div className="form__block-login">
        <label htmlFor="id">아이디(이메일)</label>
        <input type="text" id="email" name="email" required onChange={onChange} value={email}/>
      </div>
      <div className="form__block-login">
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required onChange={onChange} value={password}/>
      </div>
      <div className="form__block-login">
        계정이 없으신가요? <Link to="/signUp" className="form__link">회원가입하기</Link>
      </div>
      <div className="error__text">{error}</div>
      <div className="form__block-login">
        <button type="submit" className="form__btn-submit" disabled={error.length > 0}>
          로그인
        </button>
      </div>
    </form>
  );
}
