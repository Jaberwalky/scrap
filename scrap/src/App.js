import React from 'react';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar'
import LoginBox from './auth/LoginBox'
import { BrowserRouter, Route } from 'react-router-dom'
import css from './css/style.css'
import io from 'socket.io-client';

class App extends React.Component {

  constructor(){
    super()
    this.fetchUser = this.fetchUser.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.processMessage = this.processMessage.bind(this)
    this.state = {
      currentUser: null,
      username: "",
      messages: []
    }
    this.socket = io('http://localhost:3010');
    this.socket.on('chat', this.addMessage.bind(this));
  }

  componentDidMount(){
    this.fetchUser()
  }

  fetchUser(){
    const request = new XMLHttpRequest()
    request.open("GET", "http://localhost:5000/users.json")
    request.setRequestHeader("Content-Type", "application/json")
    request.withCredentials = true
    request.onload = () => {
      if(request.status === 200){
        const receivedUser = JSON.parse(request.responseText)
        this.setUser(receivedUser)
      } else if (request.status === 401){
        this.setUser(null)
      }
    }
    request.send(null)
  }

  setUser(user){
    this.setState({currentUser:user})
  }

  setUsername(name){
    this.setState({username: name})
  }

  processMessage(message){
    const newMessage = {
      username: this.state.currentUser.user_name,
      message: message
    }
    this.socket.emit('chat', newMessage);
  }

  addMessage(message){
    let messagesCopy = [...this.state.messages]
    // message["owned"] = true
    messagesCopy.push(message)
    this.setState({messages: messagesCopy})
  }

  render(){
    return(
      <BrowserRouter>
        <div id='main-body'>

          <Route path='/' component={ () => { return <LoginBox
            currentUser={ this.state.currentUser }
            setUser={ this.setUser }
            setUsername={ this.setUsername }
          /> } }/>

          <Route path='/' component={ () => { return <Sidebar
            setUser={ this.setUser }
            currentUser={ this.state.currentUser }
          /> } } />

          <Route path='/profile' component={ () => { return <Profile
            currentUser={ this.state.currentUser }
          /> } }/>

          <Route path='/chat' component={ () => { return <Chat
            currentUser={ this.state.currentUser}
            messages={this.state.messages}
            processMessage={this.processMessage}
          /> } }/>

        </div>
      </BrowserRouter>
    )
  }


}

export default App;
