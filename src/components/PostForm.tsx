export default function PostForm() {
  return (
    <form className="form" action="/posts/new" method="POST">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input type="text" id="title" required />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input type="text" id="summary" required />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea id="content" required></textarea>
      </div>
      <div>
        <button type="submit" className="form__btn-submit">등록</button>
      </div>
    </form>
  );
}
