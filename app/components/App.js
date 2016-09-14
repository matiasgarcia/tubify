import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

export default class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    let userImageUrl = this.props.auth.userData.images[0].url;
    let userAvatar = <Avatar src={userImageUrl}/>;
    return (
      <Paper>
        <AppBar
          title="Tubify"
          iconElementRight={userAvatar}
        />
        {this.props.children}
      </Paper>
    );
  }
}
