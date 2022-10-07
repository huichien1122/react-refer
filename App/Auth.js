const Auth = {
  isAuth: false,
  authentiate(cb) {
    // console.log(123);
    this.isAuth = true;
    setTimeout(cb, 100); 
  },
  
  signOut(cb) {
    this.isAuth = false;
    setTimeout(cb, 100);
  }
};

export default Auth;