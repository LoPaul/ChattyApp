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
      userCount: 1,
      currentUser: {name: "Bob"},
      messages: [] };
    this.addMessage = this.addMessage.bind(this);
  }
  socketSend(notificationType, jsonMsg) {
    jsonMsg.type = notificationType;
    console.log("Send", jsonMsg)
    this.socket.send(JSON.stringify(jsonMsg))
  }
  addMessage(userName, message) {
    console.log(userName, message)
    const newState = this.state;
    var oldUsername = this.state.currentUser.name;
    console.log("OldUsername", oldUsername);
    console.log("NewUsername", userName)
    var nameChanged = oldUsername !== userName;

    if(nameChanged) {
      this.state.currentUser = {name: userName}
      this.socketSend("postNotification", {content: `***${oldUsername}** changed their name to **${userName}**`});
    }
    if(message) {
      const newMessage = {color: this.state.color, username: userName, content: message};
      this.socketSend("postMessage", newMessage)
    }
  }
  processIncomingMessage(data) {
    var newState = this.state;
    console.log("incoming message", data)
    var message = JSON.parse(data);
    console.log("Current State", this.state)
    console.log("Incoming Message", message)
    
    if(message.type === "incomingAllMessages") {
      newState.messages = message.content;
    }
    if(message.type === "incomingDefaultColor") {
      newState.color = message.content;
    }
    if(message.type === "IncomingUserNotifiation") {
      newState.userCount = message.userCount;
    }

    if(!this.state.messages.some(each => each.type === message.type && each.id === message.id)) {
      console.log("state messages", this.state.messages);
      console.log("incoming message", message)
        // const newMessage = {id: message.id, username: message.username, content: message.content};
        newState.messages = [...this.state.messages, message];
    }
    console.log("NewState", newState)
    this.setState(newState);
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001")

    this.socket.onopen = (ev) => {
      console.log("Connected to server!");
      this.socket.onmessage = (ev) => {
        // const newState = this.state;
        // newState.messages = [...this.state.messages, JSON.parse(ev.data)];
        // this.setState(newState);
        this.processIncomingMessage(ev.data)
      }
    }

    const newState = this.state;
        newState.messages = newState.messages.map(message => {
        message.id = generateRandomId();
        return message
      })
      this.setState(newState); 
      console.log(newState)
  }

  render() {
      return (
        <div>
          <NavBar userCount={this.state.userCount} />
          <div>
            <MessageList messages={this.state.messages}/>
            <ChatBar addMessage={this.addMessage} currentUserName={this.state.currentUser.name}/>
          </div>
        </div>
      );
  }
}

const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");


export default App;
