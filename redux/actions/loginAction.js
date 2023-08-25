export const LoginAction = (user) => {
    return {
      type: "LOGIN",
      payload: {
       username : user.email,
       password : user.password,
       isLoggedIn: true
      }
    }
}

export const LogoutAction = (user) => {
    return {type: 'LOGOUT',}
}

