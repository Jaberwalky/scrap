import React from 'react'

class SignIn extends React.Component {

  render(){
    return(
      <form  className='login-form' >
        <h1>Sign In</h1>
        <input type="text" onChange={this.props.handleOnChangeEmail}  placeholder="Email" />
        <input type="password" onChange={this.props.handleOnChangePassword}  placeholder="Password" />
        <button onClick={this.props.signIn}> Sign In </button>
      </form>
    )
  }
}

export default SignIn
