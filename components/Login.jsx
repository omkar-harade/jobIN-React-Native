import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput , TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import {LoginAction}  from '../redux/actions/loginAction'

export class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailInput: '',
            passwordInput: ''
        }

        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
      console.log("redux var", this.props.auth)
      const { isLoggedIn} = this.props.auth;
      if (isLoggedIn) {
        this.props.navigation.navigate('Home'); // Redirect to HomeScreen if already logged in
      }
    }
  
    componentDidUpdate() {
      const { isLoggedIn} = this.props.auth;
      if (isLoggedIn) {
        this.props.navigation.navigate('Home'); // Redirect to HomeScreen if logged in during component update
      }
    }


    _validate_email(email){
        console.log("this.state.emailInput",this.state.emailInput);
        let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if (regex.test(email)) {
          return true;
        }
        else return false;
      }
    
      _validate_password(password){
        if(password.length > 0) return true;
        else return false;
      }

      handleEmailInputChange(email) {
        console.log(email)
        this.setState({
          emailInput: email
        })
      }
    
      handlePasswordInputChange(password) {
        console.log(password)
        this.setState({
          passwordInput: password
        })
      }

    handleLogin(){
      console.log("clicked")
        const {
            emailInput,
            passwordInput
        } = this.state;

        const data = {
            email: emailInput,
            password: passwordInput
        }

        console.log(data)

      
        if(!(this._validate_email(data.email) && 
            (this._validate_password(data.password)))
        ){
          console.warn("Invalid email or password")
            this.resetState()
        }


        if(!(data.email === "email@gmail.com" && data.password === "Omkar@1301")){
          console.warn("Incorrect Email or Password")
          this.resetState()
        } 
        else {
             // pass logic 
            console.log("here")
            data.isLoggedIn = true;
            console.log(data)
            this.props.LoginAction(data)
            this.props.navigation.navigate('Home');
        }
    }

    resetState(){
      this.setState({
        emailInput: '',
        passwordInput: ''
      })
    }

    render() {

        const email = this.state.emailInput;
        const password = this.state.passwordInput;

        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style= {{ paddingHorizontal: 25 }}>

                    <Text
                        style={{
                            fontFamily: "Roboto-Medium",
                            fontSize: 28,
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: 30,
                        }}>
                        Login
                    </Text>

                    <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>

                        {/* <MaterialIcons
                            name="  alternate-email"
                            size={20}
                            color="#666"
                            style={{marginRight:5}}
                        /> */}

                        <TextInput 
                          onChangeText={this.handleEmailInputChange}  
                          placeholder='Email ID' 
                          value={email} 
                          style={{flex:1, paddingVertical:0, color: '#333'}}
                        />
                    </View>

                    <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>

                        {/* <MaterialIcons
                            name="lock"
                            size={20}
                            color="#666"
                            style={{marginRight:5}}
                        /> */}

                        <TextInput 
                          onChangeText={this.handlePasswordInputChange} 
                          value={password} 
                          placeholder='Password' 
                          style={{flex:1, paddingVertical:0,color: '#333'}}
                            secureTextEntry={true}/>
                        
                        <TouchableOpacity onPress={() => {} }>
                            <Text style={{color: '#AD40AF', fontWeight: '700',}}> Forgot?</Text>                       
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => { this.handleLogin()}} style={{backgroundColor:'#AD40AF', padding:20, borderRadius:10, marginBottom:30}}>
                        <Text style={{textAlign:'center', fontWeight: '700', fontSize:16, color: '#fff' }}> Login</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text>New to the app ? </Text>
                        <TouchableOpacity onPress={() => {} }>
                            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  LoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);