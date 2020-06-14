import { detectTokenQueries } from "../utils/queryHandler";
import { navigate } from "@reach/router";
import {
  auth,
  setAccessToken,
  setRefreshToken,
  setLoginStatus,
  logout,
} from "../stores/auth.js";

export const handleLoginStatus = (location) => {
  if (auth.loggedIn) {
    return;
  } else {
    const authData = detectTokenQueries(location.search);
    if (authData.containsAuth) {
      setAccessToken(authData.access_token);
      setRefreshToken(authData.refresh_token);
      setLoginStatus(true);
      navigate("/");
    }
  }
};
