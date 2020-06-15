import React from "react";
import { Observer } from "mobx-react";
import { auth, logOut } from "../../stores/auth";
import { Link } from "@reach/router";
import { JumboHeader } from "../../styles/containers.style";
import { BannerHeading } from "../../styles/text.style";
import { NavLinks, StyledButton } from "../../styles/ui.style";

const logOutButton = () => {
  logOut();
};

const Header = () => {
  return (
    <JumboHeader>
      <Observer>
        {() =>
          auth.loggedIn ? (
            <StyledButton loginButton onClick={logOutButton}>
              log out
            </StyledButton>
          ) : (
            <StyledButton loginButton>
              <a href={process.env.REACT_APP_AUTH_SERVER}>
                Login with Spotify account
              </a>
            </StyledButton>
          )
        }
      </Observer>
      <NavLinks>
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
      </NavLinks>
      <BannerHeading>POPIFY</BannerHeading>
    </JumboHeader>
  );
};

export default Header;
