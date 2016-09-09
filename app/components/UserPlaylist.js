import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Playlist extends Component {
  constructor(props){
    super(props);
    this.loadTracks = this.loadTracks.bind(this);
  }
  loadTracks(e){
    e.preventDefault();
    this.props.fetchTracks(this.props.userId, this.props.id);
  }
  render(){
    return (
      <div>
        <li>{this.props.name} ({this.props.totalTracksCount} tracks)</li> <a href="#" onClick={this.loadTracks}>Load Tracks</a>
        <ul>
          {_.map(this.props.tracks, (track) => <li key={track.id}>{track.name}</li>)}
        </ul>
      </div>
    )
  }
}

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
          { _.map(this.props.playlistsData.playlists, (playlist) => <Playlist {...playlist} fetchTracks={this.props.playlistActions.fetchPlaylistTracks}/>)}
        </ul>
      </div>
    );
  }
}
