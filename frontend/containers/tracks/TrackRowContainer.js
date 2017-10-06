import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { downloadTrack } from '../../actions/tracks';
import TrackRow from '../../components/tracks/TrackRow';

function mapStateToProps(state, ownProps) {
  return {
    track: state.tracks[ownProps.id],
    trackSearch: state.trackSearch[ownProps.id],
    trackDownload: state.trackDownloads[ownProps.id]
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onTrackDownloadClick: bindActionCreators(downloadTrack, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackRow);
