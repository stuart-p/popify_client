import { auth } from "../stores/auth";

export const detectTokenQueries = (path) => {
  const accessRegex = /access_token=([^&]*)/;
  const refreshRegex = /refresh_token=([^&]*)/;

  const authContainter = {
    containsAuth: false,
    access_token: null,
    refresh_token: null,
  };
  if (typeof path !== "string") return authContainter;

  if (path.match(accessRegex) && path.match(refreshRegex)) {
    authContainter.containsAuth = true;
    authContainter.access_token = path.match(accessRegex)[1];
    authContainter.refresh_token = path.match(refreshRegex)[1];
  }

  return authContainter;
};
