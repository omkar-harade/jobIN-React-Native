const initialState = {
    username: '',
    password: '',
    isLoggedIn: false
  };
  export default  (state = initialState, action) => {
      switch (action.type) {
        case "LOGIN":
           return {
             username : action.payload.username,
             password : action.payload.password,
             isLoggedIn: action.payload.isLoggedIn
           };  
        default:
            return state;
        }  
};

