import { useNavigate } from "react-router-dom";
import { githubClientID } from "./constants";

import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
// import { useNavigate } from "react-router-dom";

export function handleAuth (){
  // window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientID}`
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientID}&scope=repo`;
}
// export function handleAuth() {
//   window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientID}&scope=repo:status,repo:invite,read:repo_hook,read:org,read:user`;
// }



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


// Custom hook for checking the token of the user and loggin out the  user if the token expires
export const useAuthTokenExpiration = (token, setUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    if (timeUntilExpiration <= 0) {
      handleLogout({ setUser });
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      handleLogout({ setUser });
      navigate("/");
    }, timeUntilExpiration);

    return () => clearTimeout(timer);
  }, [token, setUser, navigate]);
};
