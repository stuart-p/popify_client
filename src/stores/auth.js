import { observable, action } from "mobx";

export const auth = observable({
  access_token: null,
  refresh_token: null,
  loggedIn: false,
  userID: null,
  expires: null,
});

export const setAccessToken = action((token) => {
  auth.access_token = token;
});

export const setRefreshToken = action((token) => {
  auth.refresh_token = token;
});

export const setLoginStatus = action((isLoggedIn) => {
  auth.loggedIn = isLoggedIn;
});

export const logOut = action(() => {
  auth.access_token = null;
  auth.refresh_token = null;
  auth.loggedIn = false;
  auth.userID = null;
  auth.expires = null;
});
