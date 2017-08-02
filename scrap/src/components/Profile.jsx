import React from 'react'

class Profile extends React.Component {

  render(){

    if(!this.props.currentUser){
      return null
    }

    return(
      <div className="main-div">

          <h1>Hello {this.props.currentUser.user_name}</h1>
      </div>
    )
  }
}

export default Profile
