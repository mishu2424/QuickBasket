import { useContext } from "react"
import AuthContext from "../Providers/AuthContext"

const useAuth=()=>{
    const all = useContext(AuthContext);
    return all;
}

export default useAuth;