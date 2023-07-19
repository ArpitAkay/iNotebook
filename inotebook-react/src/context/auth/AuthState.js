import { useState } from "react"
import AuthContext from "./AuthContext"

const AuthState = (props) => {

    const [auth, setAuth] = useState({
        isAuthenticated: false,
        authToken: ""
    })

    const updateAuth = (isAuthenticated, authToken) => {
        setAuth({
            isAuthenticated: isAuthenticated,
            authToken: authToken
        })
    }

    return (
        <AuthContext.Provider value={{auth, updateAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;