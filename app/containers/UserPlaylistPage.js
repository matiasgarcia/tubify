import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserPlaylists, fetchPlaylistTracks, selectTrack, selectPlaylist } from '../actions/playlists';
import { searchTrack, downloadTrack } from '../actions/trackSearcher';
import UserPlaylist from '../components/UserPlaylist';

function mapStateToProps(state) {
  return {
    playlistsData: state.playlists,
    trackSearchData: state.trackSearch,
    apiMeta: state.apiMeta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({fetchUserPlaylists, fetchPlaylistTracks, selectTrack, selectPlaylist }, dispatch),
    trackSearchActions: bindActionCreators({searchTrack, downloadTrack}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist);
