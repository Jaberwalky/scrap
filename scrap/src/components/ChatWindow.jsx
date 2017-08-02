import React from 'react'

class ChatWindow extends React.Component {

  render(){

    let comments = this.props.messages.map(function(message, index){
      return(
        <div key={index} className={ this.props.username === message.username ? "my-comment" : "" }>
          <li><strong>{message.username}</strong></li>
          <li>{message.message}</li>
        </div>
      )
    }.bind(this))


    return(
      <div id="chat-window">
        <ul id="chat-ul">
          {comments}
        </ul>
      </div>
    )
  }
}

export default ChatWindow
