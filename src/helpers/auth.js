import jwt_decode from "jwt-decode";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.removeToken();
    cb();
  }

  isAuthenticated() {
    this.checkValidity();
    return this.authenticated;
  }

  saveToken(data) {
    //save the token to local storage
    localStorage.setItem("auth", JSON.stringify(data));
  }

  getToken() {
    //get the token from local storage
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (
      auth !== "undefined" ||
      auth !== "null" ||
      auth !== null ||
      auth !== undefined
    ) {
      return auth;
    } else {
      return false;
    }
  }

  removeToken() {
    //remove the token to local storage
    localStorage.removeItem("auth");
  }

  checkValidity() {
    let token = this.getToken();
    if (token) {
      var decoded = jwt_decode(token.access_token);
      if (decoded.exp > Date.now() / 1000) {
        this.authenticated = true;
        //return true;
      } else {
        this.removeToken();
        this.authenticated = false;
        
        // return false;
      }
    } else {
      this.removeToken();
      this.authenticated = false;

      //return false;
    }

    //return decoded;
  }
}

export default new Auth();
