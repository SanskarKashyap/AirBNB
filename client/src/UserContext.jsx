// // 1:29
import axios from "axios";
import {createContext, useEffect, useState} from "react";

// import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({children})
{
    const [user,setUser] = useState(null);
    useEffect(() => {
        if (!user)
        {
            const {data} =axios.get('/profile').then(({data}) => {
                setUser(data);
            });
        }
    }
    ,[]);

    return (
        // <div>
        // <UserContext.Provider value={{}}>
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
        // </div>
        
    );
}