import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import _ from 'lodash';
import SelectableTracksTable from './SelectableTracksTable';

export default class TrackProcessing extends Component {
  static propTypes = {
    tracksSearch: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired
  };
  render() {
    let selectedTracks = [];
    _.each(this.props.tracks, (track) => {
      if(track.isSelected){
        selectedTracks.push(track.id);
      }
    });
    return (
      <Row>
        <Col md={12}>
          <SelectableTracksTable tracks={selectedTracks} allTracks={this.props.tracks} onTrackSelect={() => 1}/>
        </Col>
      </Row>
    );
  }
}
