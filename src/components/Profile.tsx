import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyle } from "utils/toastStyle";

export default function Profile() {
  const auth = getAuth(app);

  const user = auth.currentUser;
  console.log(user);

  const onSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다. 또 와요! 👻", toastStyle);
    } catch (error) {
      console.error(error);
      toast.error("로그아웃에 실패했습니다.", toastStyle);
    }
  };
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName ?? "사용자"}</div>
        </div>
      </div>
      <div role="presentation" className="profile__logout" onClick={onSignOut}>
        로그아웃
      </div>
    </div>
  );
}
