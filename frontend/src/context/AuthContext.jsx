import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { getCurrentUser } from "../features/auth/api";
import { logoutUser } from "../features/auth/api";
import { Navigate, useNavigate } from "react-router-dom";
const AuthContext = createContext();
 export function AuthProvider({children}) {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(()=>{
            checkAuth()
        },[]);
    async function checkAuth(){
            try{
                const data = await getCurrentUser();
                setUser(data.user);
            }catch(err){
                setUser(null);
            }
            finally{
                setLoading(false);
            }
    }
    const logout = async () => {

  try {
    await logoutUser(); // API call
  } finally {
    
    setUser(null); // always clear local state
  }

};
    const value ={
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        logout
    };
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
 }
 export function useAuth(){
    return useContext(AuthContext);
 }