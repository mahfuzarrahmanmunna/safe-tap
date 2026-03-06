// Authentication utility functions

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("authToken");
  }
  return false;
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const setAuthData = (token, user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userInfo", JSON.stringify(user));
  }
};

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  }
  return null;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
  }
};
