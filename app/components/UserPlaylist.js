import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Track extends Component {
  static propTypes = {
    select: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
    this.onSelectionToggle = this.onSelectionToggle.bind(this);
  }
  onSelectionToggle(event){
    this.props.select(this.props.playlistId, this.props.id, event.target.checked);
  }
  render(){
    let props = this.props;
    return <li><input type="checkbox" checked={props.isSelected} onChange={this.onSelectionToggle}/>{props.name}</li>;
  }
}

class Playlist extends Component {
  static propTypes = {
    fetchTracks: PropTypes.func.isRequired,
    selectTrack: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
    this.loadTracks = this.loadTracks.bind(this);
    this.onSelectionToggle = this.onSelectionToggle.bind(this);
  }
  onSelectionToggle(event){
    this.props.select(this.props.id, event.target.checked);
  }
  loadTracks(e){
    e.preventDefault();
    this.props.fetchTracks(this.props.userId, this.props.id);
  }
  render(){
    let tracks = this.props.tracks;
    let areAllSelected = (tracks.length != 0) ? !_.some(tracks, (track) => !track.isSelected) : false;
    return (
      <div>
        <li><input type="checkbox" checked={areAllSelected} onChange={this.onSelectionToggle}/> {this.props.name} ({this.props.totalTracksCount} tracks)</li> <a href="#" onClick={this.loadTracks}>Load Tracks</a>
        <ul>
          {_.map(this.props.tracks, (track) => <Track key={track.id} {...track} playlistId={this.props.id} select={this.props.selectTrack}/>)}
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
          { _.map(this.props.playlistsData.playlists, (playlist) => <Playlist 
            key={playlist.id}
            {...playlist} 
            fetchTracks={this.props.playlistActions.fetchPlaylistTracks}
            selectTrack={this.props.playlistActions.selectTrack}
            select={this.props.playlistActions.selectPlaylist}
            />
          )}
        </ul>
      </div>
    );
  }
}
