import { makeAutoObservable } from "mobx";

class AuthState {
    loggedIn = false;
    constructor() {
        makeAutoObservable(this);
    }

    setLoggedIn(loggedInStatus) {
        this.loggedIn = loggedInStatus;
    }

}

export default AuthState
  
