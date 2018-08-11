import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      loading: true,
      userCount: 1,
      messages: [] };
    this.addMessage = this.addMessage.bind(this);
  }
  // send message over socket given message type
  socketSend(notificationType, jsonMsg) {
    jsonMsg.type = notificationType;
    this.socket.send(JSON.stringify(jsonMsg))
  }
  // messages added by current user
  addMessage(userName, message) {
    const newState = this.state;
    var oldUsername = this.state.currentUser.name;
    var nameChanged = oldUsername !== userName;

    if(nameChanged) {
      this.state.currentUser.name = userName
      this.socketSend("postNotification", {currentUser: this.state.currentUser, content: `**${oldUsername}** changed their name to **${userName}**`});
    }
    if(message) {
      const newMessage = {color: this.state.color, user: this.state.currentUser, content: message};
      this.socketSend("postMessage", newMessage)
    }
  }
  // all messages from server processed here by type
  processIncomingMessage(data) {
    var newState = this.state;
    var message = JSON.parse(data);
    if(message.type === "incomingUserSetup") {
      newState.currentUser = message.content;
      newState.loading = false;
    }
    if(message.type === "incomingAllMessages") {
      newState.messages = message.content;
    }
    if(message.type === "incomingDefaultColor") {
      newState.color = message.content;
    }
    if(message.type === "IncomingUserNotifiation") {
      newState.userCount = message.userCount;
    }
    if((message.type === "incomingMessage" || message.type === "incomingNotification" || 
      message.type === "IncomingSessionTerminationNotification" || 
      message.type === "IncomingSessionConnectionNotification")
      && (!this.state.messages.some(each => each.type === message.type && each.id === message.id))) {
        newState.messages = [...this.state.messages, message];
      }
    this.setState(newState);
  }
  // after inital render, setup websocket and incoming message callback
  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001")
    this.socket.onopen = (ev) => {
      this.socket.onmessage = (ev) => {
        this.processIncomingMessage(ev.data)
      }
    }
  }
  render() {
    if(this.state.loading)
      return (<div><h1> Loading... </h1></div>)
    else
       return (
        <div>
          <NavBar userCount={this.state.userCount} />
          <div>
            <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
            <ChatBar addMessage={this.addMessage} currentUserName={this.state.currentUser.name}/>
          </div>
        </div>
            );
  }
}

export default App;
