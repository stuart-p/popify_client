import React from "react";
import { Observer } from "mobx-react";
import { auth, logOut } from "../stores/auth";
import { Link } from "@reach/router";

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
      <ul>
        <li>
          <Link to="/">
            <button>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/search">
            <Observer>
              {() => <button disabled={!auth.loggedIn}>Search</button>}
            </Observer>
          </Link>
        </li>
      </ul>
      <h1>POPIFY</h1>
    </div>
  );
};

export default Header;
