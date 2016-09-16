import React, { Component, PropTypes } from 'react';
import Loader from './Loader'

export default class PlaylistTracksLoader extends Component {
  static propTypes = {
    playlistMeta: PropTypes.object.isRequired,
    playlist: PropTypes.object.isRequired,
    loadTracks: PropTypes.func.isRequired
  };
  loadPlaylistTracks(){
    var props = this.props;
    var playlist = props.playlist;
    props.loadTracks(playlist.userId, playlist.id, props.playlistMeta.nextOffset);
  }
  render(){
    let p = this.props;
    return <Loader
      fetchedObject={p.playlist}
      nextOffset={p.playlistMeta.nextOffset}
      remoteObjectsCount={p.playlistMeta.totalCount}
      fetchedObjectsCount={p.playlist.tracks.length}
      load={this.loadPlaylistTracks.bind(this)}
    >
      {this.props.children}
    </Loader>
  }
}
