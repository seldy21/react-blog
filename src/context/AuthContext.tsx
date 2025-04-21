import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "firebaseApp";
import { createContext, useEffect, useState } from "react";

interface AuthProps {
<<<<<<< HEAD
  children: React.ReactNode;}

const AuthContext = createContext({ user: null as User | null });

export const AuthContextProvider = ({children}: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [auth]);
=======
  children: React.ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(user);
      }
    });
  }, [auth]);

>>>>>>> 7ea940ccae91584eb13736b59fd02e14a61be98c
  return <AuthContext.Provider value={{ user: currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;