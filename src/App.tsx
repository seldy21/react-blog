import { useEffect, useState } from "react";
import "./App.css";
import Router from "./components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);
  // 로그인 상태를 관리하기 위한 state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  //auth를 체크하기 전에 loading 상태를 관리하기 위한 state
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      <ToastContainer />
    </>
  );
}

export default App;
