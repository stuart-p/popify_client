import { useLocation, Link } from "@reach/router";
import React from "react";
import { Observer } from "mobx-react";
import { auth } from "../stores/auth.js";
import { handleLoginStatus } from "../utils/loginHandler";

const LandingPage = () => {
  const location = useLocation();
  // const authData = detectTokenQueries(location.search);
  // if (authData.containsAuth) {
  //   setAccessToken(authData.access_token);
  //   setRefreshToken(authData.refresh_token);
  //   setLoginStatus(true);
  //   navigate("/");
  // }
  handleLoginStatus(location);
  return (
    <div>
      <h2>A Spotify Search API</h2>
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
