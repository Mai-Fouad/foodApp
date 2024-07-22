const BASE_URL = `https://upskilling-egypt.com:3006/api/v1/`;

const BASE_USERS = `${BASE_URL}/Users`;

export const userURLs = {
  base: BASE_USERS,
  loginAPI: `${BASE_USERS}/Login`,
  forgetPassAPI: `${BASE_USERS}/Reset/Request`,
  resetPassAPI: `${BASE_USERS}/Reset`,
  registerAPI: `${BASE_USERS}/Register`,
  verifyUserAPI: `${BASE_USERS}/verify`,
  changePassAPI: `${BASE_USERS}/ChangePassword`,
};
