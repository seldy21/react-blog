import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { title } from "process";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";

interface PostFormProps {
  title: string;
  summary: string;
  content: string;
}

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState<PostFormProps>({
    title: "",
    summary: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title: content.title,
        summary: content.summary,
        content: content.content,
        createdAt: new Date()?.toLocaleDateString(),
        author: user?.email,
      });
      toast.success("포스트가 업로드 되었어요! 🎉");
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`앗! 포스트가 업로드 되지 않았어요 🙄 : ${error}`);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          required
          onChange={handleChange}
          name="title"
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          id="summary"
          required
          onChange={handleChange}
          name="summary"
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          required
          onChange={handleChange}
          name="content"
        ></textarea>
      </div>
      <div>
        <button type="submit" className="form__btn-submit">
          등록
        </button>
      </div>
    </form>
  );
}
