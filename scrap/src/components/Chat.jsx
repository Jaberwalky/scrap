import React from 'react'
import ChatWindow from "./ChatWindow"

class Chat extends React.Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      messageText: ""
    }
  }

  handleClick(event){
    event.preventDefault()
    this.props.processMessage(this.state.messageText)
  }

  handleChange(event){
    this.setState({messageText: event.target.value})
  }

  render(){

    if(!this.props.currentUser){
      return null
    }

    return(
      <div className="main-div">

        <ChatWindow className="chat-window" username={this.props.currentUser.user_name} messages={this.props.messages}  />

        <div id="chat-submit">
          <input
            type="text"
            placeholder="Message"
            id="messageBox"
            onChange={this.handleChange} />
          <input type="submit" onClick={this.handleClick} />
        </div>

      </div>
    )
  }
}

export default Chat
