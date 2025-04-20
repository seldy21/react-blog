import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value);
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
      } else if (passwordConfirm.length > 0 && value !== passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
      if (value !== password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
  };
  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <h1>회원가입</h1>
      <div className="form__block-login">
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" name="email" required onChange={onChange} />
      </div>
      <div className="form__block-login">
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required onChange={onChange} />
      </div>
      <div className="form__block-login">
        <label htmlFor="passwordcConfirm">비밀번호 확인</label>
        <input type="password" id="passwordcConfirm" name="passwordConfirm" required onChange={onChange} />
      </div>
      <div className="form__block-login">
        계정이 이미 있으신가요?{" "}
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="error__text">{error}</div>
      <div className="form__block-login">
        <button type="submit" className="form__btn-submit" disabled={error.length > 0}>
          생성
        </button>
      </div>
    </form>
  );
}
