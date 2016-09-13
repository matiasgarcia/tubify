import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Track extends Component {
  static propTypes = {
    track: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackSearchActions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.onSelectionToggle = this.onSelectionToggle.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }
  onSearchClick(event){
    event.preventDefault();
    this.props.trackSearchActions.searchTrack(this.props.track);
  }
  onSelectionToggle(event){
    let props = this.props;
    props.playlistActions.selectTrack(props.playlistId, props.track.id, event.target.checked);
  }
  render(){
    let props = this.props;
    let trackSearchData = this.props.trackSearchData[props.track.id];
    //TODO: Remove DIV, illegal HTML.
    return (
      <div>
        <li><input type="checkbox" checked={props.track.isSelected} onChange={this.onSelectionToggle}/>{props.track.name}</li>
        <a href="#" onClick={this.onSearchClick}>Search Track</a>
        <ul>{trackSearchData && _.map(trackSearchData.results, (r) => <li key={r.id}>{r.url}</li>)}</ul>
      </div>
    )
  }
}

class Playlist extends Component {
  static propTypes = {
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackSearchActions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.loadTracks = this.loadTracks.bind(this);
    this.onSelectionToggle = this.onSelectionToggle.bind(this);
  }
  onSelectionToggle(event){
    this.props.playlistActions.selectPlaylist(this.props.id, event.target.checked);
  }
  loadTracks(e){
    e.preventDefault();
    this.props.playlistActions.fetchPlaylistTracks(this.props.userId, this.props.id);
  }
  render(){
    let tracks = this.props.tracks;
    let areAllSelected = (tracks.length != 0) ? !_.some(tracks, (track) => !track.isSelected) : false;
    return (
      <div>
        <li><input type="checkbox" checked={areAllSelected} onChange={this.onSelectionToggle}/> {this.props.name} ({this.props.totalTracksCount} tracks)</li> <a href="#" onClick={this.loadTracks}>Load Tracks</a>
        <ul>
          {_.map(tracks, (track) => <Track 
            key={track.id} 
            track={track} 
            playlistId={this.props.id} 
            playlistActions={this.props.playlistActions} 
            trackSearchData={this.props.trackSearchData} 
            trackSearchActions={this.props.trackSearchActions}/>)}
        </ul>
      </div>
    )
  }
}

export default class UserPlaylist extends Component {
  static propTypes = {
    playlistsData: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackSearchActions: PropTypes.object.isRequired,
    apiMeta: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
  }
  loadPlaylists(offset = 0){
    this.props.playlistActions.fetchUserPlaylists(offset);
  }
  componentDidMount() {
    this.loadPlaylists();
  }
  onLoadMoreClick(event){
    event.preventDefault();
    this.loadPlaylists(this.props.apiMeta.playlists.nextOffset);
  }
  render() {
    let tracksTotalCount = this.props.apiMeta.playlists.totalCount;
    let tracksFetchedCount = this.props.playlistsData.playlists.length;
    let pendingCount = tracksTotalCount - tracksFetchedCount;
    return (
      <div>
        {this.props.apiMeta.playlists.nextOffset != 0 ? <a href="#" onClick={this.onLoadMoreClick}>Load more tracks({pendingCount} left...)</a> : null}
        <ul>
          { _.map(this.props.playlistsData.playlists, (playlist) => <Playlist 
            key={playlist.id}
            {...playlist}
            playlistActions={this.props.playlistActions}
            trackSearchData={this.props.trackSearchData}
            trackSearchActions={this.props.trackSearchActions}
            />
          )}
        </ul>
      </div>
    );
  }
}
