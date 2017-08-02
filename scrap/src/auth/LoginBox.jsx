import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Sidebar from '../components/Sidebar'

class LoginBox extends React.Component {

  constructor(){
    super()
    this.signIn = this.signIn.bind(this)
    this.signUp = this.signUp.bind(this)
    this.handleOnChangeUsername = this.handleOnChangeUsername.bind(this)
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
    this.handleOnChangePassConf = this.handleOnChangePassConf.bind(this)
    this.toggleLogins = this.toggleLogins.bind(this)
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation : "",
      active : "LOGIN",
      toggleText: "Create Account"
    }
  }

  signIn(event){
    event.preventDefault()
    const request = new XMLHttpRequest()
    const url="http://localhost:5000/users/sign_in.json"
    request.open("POST", url)
    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
      if(request.status === 201){
        let user = JSON.parse(request.responseText)
        this.props.setUser(user)
      }
    }
    const data = {
      user:{
        email:this.state.email,
        password:this.state.password
      }
    }
    request.send(JSON.stringify(data))
  }

  signUp(event){
    event.preventDefault()
    const request = new XMLHttpRequest()
    request.open("POST", "http://localhost:5000/users.json")
    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
      console.log(request.responseText);
      if (request.status === 201){
        const user = JSON.parse(request.responseText)
        this.props.setUser(user)
        this.props.setUsername(this.state.username)
      } else {
      }
    }
    const data = {
      user:{
        user_name: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    console.log(data)
    request.send(JSON.stringify(data))
  }

  toggleLogins(){
    var active = this.state.active
    var newActive = active === 'LOGIN' ? 'SIGNUP' : 'LOGIN'
    let toggleText = newActive === 'LOGIN' ? "Create Account" : "Log In"
    this.setState({
      active: newActive,
      toggleText
    })
  }

  handleOnChangeUsername(event) {
    this.setState({username: event.target.value})
  }

  handleOnChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleOnChangePassword(event) {
    this.setState({password: event.target.value})
  }

  handleOnChangePassConf(event) {
    this.setState({passwordConfirmation: event.target.value})
  }

  render(){
    var active = this.state.active
    var mainDiv =
      <div className="bg-div">
        { active === "LOGIN" ? ( <SignIn
          signIn={this.signIn}
          handleOnChangeEmail={this.handleOnChangeEmail}
          handleOnChangePassword={this.handleOnChangePassword}
          setUser={this.props.setUser} />
        ) : active === "SIGNUP" ? ( <SignUp
          signUp={this.signUp}
          handleOnChangeUsername={this.handleOnChangeUsername}
          handleOnChangeEmail={this.handleOnChangeEmail}
          handleOnChangePassword={this.handleOnChangePassword}
          handleOnChangePassConf={this.handleOnChangePassConf}
          setUser={this.props.setUser} /> ) : null }
        <a onClick={this.toggleLogins}>{this.state.toggleText}</a>
      </div>

    if (this.props.currentUser) {
      mainDiv = <div>
        <Sidebar setUser={ this.props.setUser }/>
      </div>
    }

    return(
      <div>
        {mainDiv}
      </div>
    )
  }

}

export default LoginBox
