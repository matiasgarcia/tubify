import React, { Component, PropTypes } from 'react';
import Loader from './Loader'

export default class PlaylistsLoader extends Component {
  static propTypes = {
    playlistsData: PropTypes.object.isRequired,
    playlistsMeta: PropTypes.object.isRequired,
    loadPlaylists: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.loadPlaylists = this.loadPlaylists.bind(this);
  }
  loadPlaylists(){
    this.props.loadPlaylists(this.props.playlistsMeta.nextOffset)
  }
  render(){
    let p = this.props;
    return <Loader
      fetchedObject={p.playlistsData}
      nextOffset={p.playlistsMeta.nextOffset}
      remoteObjectsCount={p.playlistsMeta.totalCount}
      fetchedObjectsCount={p.playlistsData.playlists.length}
      load={this.loadPlaylists.bind(this)}
    >
      {this.props.children}
    </Loader>
  }
}
