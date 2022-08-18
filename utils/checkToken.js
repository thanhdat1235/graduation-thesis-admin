import jwtDecode from "jwt-decode";
export const checkExpToken = (token) => {
  let date = new Date().getTime() / 1000;
  let expToken = jwtDecode(token).exp;
  if (expToken < date) {
    return false;
  }
  return true;
  // return expToken > date;
};
