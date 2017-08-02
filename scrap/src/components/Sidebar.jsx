import React from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends React.Component {

  constructor(){
    super()
    this.signOut = this.signOut.bind(this)
  }

  signOut(event){
    event.preventDefault()
    const request = new XMLHttpRequest()
    request.open("DELETE", "http://localhost:5000/users/sign_out.json")
    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
      if (request.status === 204){
        this.props.setUser(null)
      }
    }
    request.send(null)
  }

  render(){

    if(!this.props.currentUser){
      return null
    }

    return(
      <div className="sidebar">
        <ul>
          <Link to="/profile" ><li>Profile</li></Link>
          <Link to="/chat"><li>Chat</li></Link>
          <li onClick={this.signOut}>Sign Out</li>
        </ul>
      </div>
    )

  }
}

export default Sidebar
