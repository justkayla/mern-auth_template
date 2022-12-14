// decode token and retrieve user's information
import decode from "jwt-decode";

// class for handling
class AuthService {
  // get user data
  getDashboard() {
    return decode(this.getToken());
  }

  // check if user is logged in
  loggedIn() {
    // checks if saved (and valid) token
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getToken() {
    // retrieve user token from local storage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // save user token to local storage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // clear user token and data from local storage
    localStorage.removeItem("id_token");
    // reload page, reset application
    window.location.assign("/");
  }
}

export default new AuthService();
