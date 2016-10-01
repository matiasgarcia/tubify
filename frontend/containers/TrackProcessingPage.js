import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchTrack, downloadTrack, selectTrack } from '../actions/tracks';
import TrackProcessing from '../components/tracks/TrackProcessing';

function mapStateToProps(state) {
  return {
    tracksSearch: state.trackSearch,
    tracks: state.tracks,
    trackDownloads: state.trackDownloads
  };
}

function mapDispatchToProps(dispatch) {
  return {
    trackActions: bindActionCreators({searchTrack, downloadTrack, selectTrack}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackProcessing);
