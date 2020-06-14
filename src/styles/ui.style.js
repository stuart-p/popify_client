import styled, { css } from "styled-components";
import { theme } from "./theme";

export const NavLinks = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 2rem 5rem 1rem 5rem;

  z-index: 5;
  list-style-type: none;

  li {
    margin: 0;
    border-right: 2px solid ${theme.e};

    &:last-of-type {
      border-right: none;
    }

    a button {
      font-family: "Open Sans", sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: ${theme.e};
      background: none;
      border: none;
      padding: 0.6rem 2rem;
      transition: all ease 0.5s;

      &:hover {
        color: ${theme.c};
        background-color: ${theme.e};
        cursor: pointer;
      }

      &:disabled {
        color: gray;
      }
    }
  }
`;

export const StyledButton = styled.button`
  background: rgba(0, 0, 0, 0);
  color: ${theme.a};
  border: none;
  border: solid 2px ${theme.a};
  padding: 0.8rem 0.8rem;
  z-index: 5;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all ease 0.5s;

  &:hover {
    color: ${theme.c};
    background-color: ${theme.e};
    cursor: pointer;
  }
  a {
    text-decoration: none;

    &:visited {
      color: ${theme.a};
    }
  }

  ${(props) =>
    props.loginButton &&
    css`
      margin: 2rem 5rem 1rem 5rem;
    `}
`;
