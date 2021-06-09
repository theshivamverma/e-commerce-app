import { Route, Navigate } from "react-router-dom"
import { useAuth } from "../auth"

export default function PrivateRoute({ path, ...props }){
    const { login } = useAuth()
    return(
        login ? <Route {...props} path={path} /> : <Navigate replace to="/login" state={{ from: path }} />
    )
}