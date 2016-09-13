import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Playlist from './Playlist';

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
        {pendingCount != 0 ? <a href="#" onClick={this.onLoadMoreClick}>Load more playlists ({pendingCount} left...)</a> : null}
        <ul>
          { _.map(this.props.playlistsData.playlists, (playlist) => <Playlist 
            key={playlist.id}
            playlist={playlist}
            playlistActions={this.props.playlistActions}
            trackSearchData={this.props.trackSearchData}
            trackSearchActions={this.props.trackSearchActions}
            playlistMeta={this.props.apiMeta.playlistTracks[playlist.id]}
            />
          )}
        </ul>
      </div>
    );
  }
}
