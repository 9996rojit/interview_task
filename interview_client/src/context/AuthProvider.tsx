
import { createContext, ReactNode, useState } from "react";

interface Iprops {
    children:ReactNode | any
}

const AuthContext = createContext({});


export const AuthProvider = (props:Iprops) => {
    const [auth, setAuth] = useState({});
    const [vaccineData,setVaccineData] = useState([])

    return (
        <AuthContext.Provider value={{ auth, setAuth,vaccineData,setVaccineData }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;