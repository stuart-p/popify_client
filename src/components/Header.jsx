import React from "react";
import { Observer } from "mobx-react";
import { auth, logOut } from "../stores/auth";

const logOutButton = () => {
  logOut();
};

const Header = () => {
  return (
    <div>
      <Observer>
        {() =>
          auth.loggedIn ? (
            <button onClick={logOutButton}>log out</button>
          ) : (
            <a href="http://localhost:8080/auth/login">
              <button>login with Spotify account</button>
            </a>
          )
        }
      </Observer>
    </div>
  );
};

export default Header;
