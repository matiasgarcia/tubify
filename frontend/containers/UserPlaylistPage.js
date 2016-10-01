import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserPlaylists, fetchPlaylistTracks } from '../actions/playlists';
import { searchTrack, downloadTrack, selectTrack, selectTracks } from '../actions/tracks';
import UserPlaylist from '../components/playlists/UserPlaylist';

function mapStateToProps(state) {
  return {
    playlistsData: state.playlists,
    trackSearchData: state.trackSearch,
    apiMeta: state.apiMeta,
    tracks: state.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ fetchUserPlaylists, fetchPlaylistTracks }, dispatch),
    trackActions: bindActionCreators({ searchTrack, downloadTrack, selectTrack, selectTracks }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist);
