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
