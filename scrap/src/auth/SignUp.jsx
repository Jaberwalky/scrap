import React from 'react'

class SignUp extends React.Component {

  render(){
    return(
      <form  className='login-form' >
        <h1>Sign Up</h1>
        {/* <div className="image-uploader">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={(files) => this.onDrop(files)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <img src={this.state.preview} alt=""/>
        </div> */}
        <input type="text" onChange={this.props.handleOnChangeUsername}  placeholder="Username" />
        <input type="text" onChange={this.props.handleOnChangeEmail}  placeholder="Email" />
        <input type="password" onChange={this.props.handleOnChangePassword}  placeholder="Password" />
        <input type="password" onChange={this.props.handleOnChangePassConf}  placeholder="Password Confirmation" />
        <button onClick={this.props.signUp}>  Sign Up </button>
      </form>
    )
  }
}

export default SignUp
