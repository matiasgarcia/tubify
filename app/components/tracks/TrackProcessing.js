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
    this.setSelectedTracks = this.setSelectedTracks.bind(this);
  }
  componentWillMount(){
    this.setSelectedTracks(this.props.tracks);
  }
  componentWillReceiveProps(nextProps){
    let oldProps = this.props;
    if(oldProps.tracks !== nextProps.tracks){
      this.setSelectedTracks(nextProps.tracks);
    }
  }
  setSelectedTracks(tracks){
    let selectedTracks = [];
    _.each(tracks, (track) => {
      if(track.isSelected) selectedTracks.push(track);
    });
    this.setState({selectedTracks});
  }
  downloadTracks(e) {
    e.preventDefault();
    let downloadTrack = this.props.trackActions.downloadTrack;
    let trackDownloads = this.props.trackDownloads;
    let tracksSearch = this.props.tracksSearch;
    _.each(this.state.selectedTracks, (track) => {
      if (trackDownloads[track.id] === undefined || trackDownloads[track.id].error !== null){
        let trackSearchInfo = tracksSearch[track.id];
        downloadTrack({id: track.id, url: trackSearchInfo.results[0].url});
      }
    });
  }
  searchTracks(e) {
    e.preventDefault();
    let searchTrack = this.props.trackActions.searchTrack;
    let tracksSearch = this.props.tracksSearch;
    _.each(this.state.selectedTracks, (track) => {
      if (tracksSearch[track.id] === undefined || tracksSearch[track.id].error !== null){
        searchTrack(track)
      }
    });
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <RaisedButton label="Search all" primary onClick={this.searchTracks}/>
            <RaisedButton label="Download all" secondary onClick={this.downloadTracks}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TracksDownloadTable
              tracks={this.state.selectedTracks}
              tracksSearch={this.props.tracksSearch}
              trackDownloads={this.props.trackDownloads}
              onTrackDownloadClick={this.props.trackActions.downloadTrack}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}
