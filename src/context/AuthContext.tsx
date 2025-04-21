import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "firebaseApp";
import { createContext, useEffect, useState } from "react";

interface AuthProps {
  children: React.ReactNode;
}

const AuthContext = createContext({ user: null as User | null });

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
