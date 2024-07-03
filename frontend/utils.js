import { githubClientID } from "./constants";

export function handleAuth (){
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientID}`
}
