import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Track from './Track'

export default class Playlist extends Component {
  static propTypes = {
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackSearchActions: PropTypes.object.isRequired,
    playlistMeta: PropTypes.object,
    playlist: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.loadTracks = this.loadTracks.bind(this);
    this.onSelectionToggle = this.onSelectionToggle.bind(this);
  }
  onSelectionToggle(event){
    this.props.playlistActions.selectPlaylist(this.props.playlist.id, event.target.checked);
  }
  loadTracks(e){
    e.preventDefault();
    this.props.playlistActions.fetchPlaylistTracks(this.props.playlist.userId, this.props.playlist.id, this.props.playlistMeta.nextOffset);
  }
  render(){
    let tracks = this.props.playlist.tracks;
    let areAllSelected = (tracks.length != 0) ? !_.some(tracks, (track) => !track.isSelected) : false;
    let tracksTotalCount = this.props.playlistMeta.totalCount;
    let tracksFetchedCount = tracks.length;
    let pendingCount = tracksTotalCount - tracksFetchedCount;
    return (
      <div>
        <li><input type="checkbox" checked={areAllSelected} onChange={this.onSelectionToggle}/> {this.props.playlist.name}
          {' '}{ pendingCount != 0 && <a href="#" onClick={this.loadTracks}>Load more tracks ({pendingCount} left...)</a>}
        </li>
        <ul>
          {_.map(tracks, (track) => <Track
            key={track.id}
            track={track}
            playlistId={this.props.playlist.id}
            playlistActions={this.props.playlistActions}
            trackSearchData={this.props.trackSearchData}
            trackSearchActions={this.props.trackSearchActions}/>)}
        </ul>
      </div>
    )
  }
}
