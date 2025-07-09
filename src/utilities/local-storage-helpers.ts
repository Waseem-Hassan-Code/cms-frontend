const AUTH_TOKEN = "AUTH_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

const setAccessToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN, token);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

const getAccessToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN);
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN);
};

const removeAccessToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

const LocalStorageHelpers = {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
};
export default LocalStorageHelpers;
