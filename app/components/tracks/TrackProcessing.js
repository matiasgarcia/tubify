import React, { Component, PropTypes } from 'react';

export default class TrackProcessing extends Component {
  static propTypes = {
    tracksSearch: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired
  };
  render() {
    return (
      <div>
        <h2>Track Processing!</h2>
      </div>
    );
  }
}
