import { useLocation, navigate, Link } from "@reach/router";
import React from "react";
import { detectTokenQueries } from "../utils/queryHandler";
import { Observer } from "mobx-react";
import {
  auth,
  setAccessToken,
  setRefreshToken,
  setLoginStatus,
  logout,
} from "../stores/auth.js";

const LandingPage = () => {
  const location = useLocation();
  const authData = detectTokenQueries(location.search);
  if (authData.containsAuth) {
    setAccessToken(authData.access_token);
    setRefreshToken(authData.refresh_token);
    setLoginStatus(true);
    navigate("/");
  }
  return (
    <div>
      <h1>Popify</h1>
      <Observer>
        {() =>
          auth.loggedIn && (
            <>
              <Link to="/search">
                <p>search</p>
              </Link>
            </>
          )
        }
      </Observer>
    </div>
  );
};

export default LandingPage;
