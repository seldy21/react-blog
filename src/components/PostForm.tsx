import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { title } from "process";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, CategoryType, PostProp } from "./PostList";

interface PostFormProps {
  title: string;
  summary: string;
  content: string;
  category: CategoryType | string;
}

export default function PostForm() {
  const params = useParams();

  const [post, setPost] = useState<PostProp | null>(null);

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProp);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost(params.id);
    }
  }, [params.id]);

  const { user } = useContext(AuthContext);
  const [content, setContent] = useState<PostFormProps>({
    title: "",
    summary: "",
    content: "",
    category: CATEGORIES[0],
  });

  useEffect(() => {
    if (post) {
      setContent({
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
      });
    }
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title: content.title,
          summary: content.summary,
          content: content.content,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          category: content.category,
        });
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title: content.title,
          summary: content.summary,
          content: content.content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          author: user?.email,
          category: content.category,
        });
      }
      toast.success(
        `포스트가 ${post && post.id ? "업데이트" : "업로드"} 되었어요! 🎉`
      );
      navigate("/");
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
          value={content?.title}
        />
      </div>

      <div className="form__block">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          required
          onChange={handleChange}
          value={content?.category}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          id="summary"
          required
          onChange={handleChange}
          name="summary"
          value={content?.summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          required
          onChange={handleChange}
          name="content"
          value={content?.content}
        ></textarea>
      </div>
      <div>
        <button type="submit" className="form__btn-submit">
          {post && post.id ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
}
