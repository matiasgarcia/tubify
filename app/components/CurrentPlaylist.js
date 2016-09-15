import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';

export default class CurrentPlaylist extends Component {
  static propTypes = {
    playlist: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
  }
  render () {
    let playlistTracks = this.props.playlist.tracks;
    let tracks = this.props.tracks;
    let trackRows = _.map(playlistTracks, (trackId) => {
      var track = tracks[trackId];
      return <TableRow key={trackId} selected={track.isSelected}>
        <TableRowColumn>{track.name}</TableRowColumn>
        <TableRowColumn>{track.artists.join(", ")}</TableRowColumn>
      </TableRow>;
    });
    return (
      <Table multiSelectable>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Artists</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trackRows}
        </TableBody>
      </Table>
    )
  }
}
