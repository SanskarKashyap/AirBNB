// // 1:29
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  //   useEffect(() => {
  //     if (!user) {
  //       axios.get("/profile").then(({ data }) => {
  //         setUser(data);
  //         setReady(true);
  //       });
  //     } else {
  //       // If user is already set, mark ready as true
  //       setReady(true);
  //     }
  //   }, [user]);  // Add user as a dependency
  useEffect(() => {
    if (!user) {
      const { data } = axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    // <div>
    // <UserContext.Provider value={{}}>
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
    // </div>
  );
}
