import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {loading: true};
    this.addNewMessage = this.addNewMessage.bind(this);
  }
  addNewMessage(userName, message) {
    const newState = this.state;
    newState.messages = [...this.state.messages, {username: userName, content: message, id: generateRandomId()}];
    this.setState(newState)
  }
  componentDidMount() {
    const newState = 
            {
              loading: false,
              currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
              messages: [
                {
                  username: "Bob",
                  content: "Has anyone seen my marbles?",
                },
                {
                  username: "Anonymous",
                  content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                }
              ]
            };
      newState.messages = newState.messages.map(message => {
        message.id = generateRandomId();
        return message
      })
      this.setState(newState); 
      
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      var currentUserName = this.state.currentUser ? this.state.currentUser.name : undefined;
      return (
        <div>
          <MessageList messages={this.state.messages}/>
          <ChatBar addNewMessage={this.addNewMessage} username={currentUserName}/>
        </div>
      );
    }
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

// {
//   loading: false,
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// }

