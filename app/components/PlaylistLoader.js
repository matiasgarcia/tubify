import React, { Component, PropTypes } from 'react';

export default class PlaylistLoader extends Component {
  static propTypes = {
    playlistMeta: PropTypes.object.isRequired,
    playlist: PropTypes.object.isRequired,
    loadTracks: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.loadPlaylistTracks = this.loadPlaylistTracks.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.playlist.tracks.length == nextProps.playlistMeta.totalCount) return;
    let tracksPending = !nextProps.playlist.isFetching && nextProps.playlistMeta.nextOffset > 0;
    let playlistChanged = nextProps.playlist.id != this.props.playlist.id;
    if (tracksPending || playlistChanged) this.loadPlaylistTracks(nextProps);
  }
  componentDidMount(){
    this.loadPlaylistTracks(this.props);
  }
  loadPlaylistTracks(props){
    props.loadTracks(props.playlist.userId, props.playlist.id, props.playlistMeta.nextOffset);
  }
  render(){
    return this.props.children;
  }
}
