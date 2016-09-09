import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserPlaylists, fetchPlaylistTracks } from '../actions/user';
import UserPlaylist from '../components/UserPlaylist'

function mapStateToProps(state) {
  return {
    playlistsData: state.playlists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({fetchUserPlaylists, fetchPlaylistTracks}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist);
