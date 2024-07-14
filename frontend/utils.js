import { useNavigate } from "react-router-dom";
import { githubClientID } from "./constants";

export function handleAuth (){
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientID}`
}


// export function handleLogout (setUser){
//   // const navigate=useNavigate()
//   localStorage.setItem("user", JSON.stringify({ is_authenticated: false }))
//   setUser({ is_authenticated: false })
//   navigate("/")
// }

export const handleLogout = async ({ setUser }) => {
  try {
    // Perform your logout operations here (e.g., API call)
    localStorage.removeItem('user');
    localStorage.setItem("user", JSON.stringify({ is_authenticated: false }))
    setUser({ is_authenticated: false });
    // navigate("/")
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

