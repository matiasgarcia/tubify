import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';


export default class UserPlaylist extends Component {
  static propTypes = {
    playlistsData: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired,
  };
  loadPlaylists(){
    this.props.playlistActions.fetchUserPlaylists();
  }
  componentDidMount() {
    this.loadPlaylists();
  }
  render() {
    return (
      <div>
        <ul>
          { _.map(this.props.playlistsData.playlists, (playlist) => <li key={playlist.id}>{playlist.name}</li>) }
        </ul>
      </div>
    );
  }
}
