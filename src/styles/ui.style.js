import styled, { css } from "styled-components";
import { theme } from "./theme";

export const NavLinks = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 2rem 5rem 1rem 5rem;
  @media (max-width: 600px) {
    margin: 1rem 2rem 1rem 2rem;
  }
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

      &:hover:enabled {
        color: ${theme.c};
        background-color: ${theme.e};

        cursor: pointer;
      }

      &:disabled {
        color: gray;
      }
    }
    /* &:first-of-type {
      a button {
        padding-left: 0;
      }
    } */
  }
`;

export const StyledButton = styled.button`
  background: rgba(0, 0, 0, 0);
  color: ${theme.e};
  border: none;
  border: solid 2px ${theme.e};
  padding: 0.8rem 0.8rem;
  z-index: 5;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all ease 0.5s;

  &:hover:enabled {
    color: ${theme.c};
    background-color: ${theme.e};
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: ${theme.a};

    &:visited {
      color: ${theme.a};
    }
  }

  ${(props) =>
    props.loginButton &&
    css`
      color: ${theme.a};
      margin: 2rem 5rem 1rem 5rem;
      @media (max-width: 600px) {
        margin: 1rem 2rem 1rem 2rem;
      }
      border: solid 2px ${theme.a};
    `}
  ${(props) =>
    props.swapImgOrientation &&
    css`
      img {
        transform: rotate(180deg);
      }
    `}
`;

export const TypeSelectorForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const SearchForm = styled.form`
  input {
    padding: 8px 30px;
    border: none;
    border-radius: 20px;
    margin: 0 5px;
    font-size: 1.2rem;
    @media (max-width: 600px) {
      font-size: 0.8rem;
    }
  }

  button {
    height: 39px;
    padding: 0 0.8rem;
  }
`;

export const ResultsList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 1rem;
  padding: 0;
`;

export const ResultItemCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 250px;
  background-color: ${theme.f};
  border-radius: 30px;
  padding: 1rem;
  margin: 1rem;

  span img {
    border-radius: 50%;
  }
  h4 {
    max-width: 100%;
    align-self: flex-start;
    text-align: left;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 1rem 0;
  }

  h5 {
    max-width: 100%;
    align-self: flex-start;
    text-align: left;
    font-family: "Montserrat", sans-serif;
    font-weight: normal;
    font-size: 0.7rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0.2rem 0;
  }
`;
