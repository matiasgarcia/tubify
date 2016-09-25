import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import TracksDownloadTable from './TracksDownloadTable';

export default class TrackProcessing extends Component {
  static propTypes = {
    tracks: PropTypes.object.isRequired,
    tracksSearch: PropTypes.object.isRequired,
    trackDownloads: PropTypes.object.isRequired,
    trackActions: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.searchTracks = this.searchTracks.bind(this);
    this.getSelectedTracks = this.getSelectedTracks.bind(this);
  }
  searchTracks(e) {
    e.preventDefault();
    let searchTrack = this.props.trackActions.searchTrack;
    let tracksSearch = this.props.tracksSearch;
    _.each(this.getSelectedTracks(), (track) => {
      if (tracksSearch[track.id] === undefined || tracksSearch[track.id].error !== null){
        searchTrack(track)
      }
    });
  }
  getSelectedTracks() {
    let selectedTracks = [];
    _.each(this.props.tracks, (track) => {
      if(track.isSelected) selectedTracks.push(track);
    });
    return selectedTracks;
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={10} md={2}>
            <RaisedButton label="Search all tracks..." primary onClick={this.searchTracks}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TracksDownloadTable
              tracks={this.getSelectedTracks()}
              tracksSearch={this.props.tracksSearch}
              trackDownloads={this.props.trackDownloads}
              onTrackDownloadClick={this.props.trackActions.downloadTrack}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}
