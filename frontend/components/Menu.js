import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import { openInFileExplorer } from '../utils/interactions';

export default class Menu extends Component {
  static propTypes = {
    user: PropTypes.shape({
      images: PropTypes.array
    }).isRequired,
    config: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
    this.handleOpenDownload = this.handleOpenDownload.bind(this);
  }
  handleOpenDownload(e) {
    e.preventDefault();
    openInFileExplorer(this.props.config.downloadPath);
  }
  render() {
    let userImageUrl = this.props.user.images[0].url;
    let userAvatar = <Avatar src={userImageUrl}/>;
    let menu = <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem
        containerElement={<Link to="/" />}
        primaryText="Playlists"
      />
      <MenuItem
        containerElement={<Link to="/tracks" />}
        primaryText="Tracks"
      />
      <MenuItem
        primaryText="Open Download Folder"
        onClick={this.handleOpenDownload}
      />
    </IconMenu>;
    return <AppBar
      title="Tubify"
      iconElementLeft={menu}
      iconElementRight={userAvatar}
    />;
  }
}
