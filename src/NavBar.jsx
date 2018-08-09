import React, {Component} from 'react';



class NavBar extends Component {
  render() {
      return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
          <span className="user-counter">{this.props.userCount} users online</span>
      </nav>
    
    );
  }

}

export default NavBar;


// <nav class="navbar">
// <a href="/" class="navbar-brand">Chatty</a>
// </nav>



// {
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


// <div>
// <div className="message">
//   <span className="message-username">{this.props.message.username}</span>
//   <span className="message-content">{this.props.message.content}}</span>
// </div>
// <div className="message system">
//   Anonymous1 changed their name to nomnom.
// </div>
// </div>