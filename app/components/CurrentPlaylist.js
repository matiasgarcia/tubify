import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';

export default class CurrentPlaylist extends Component {
  static propTypes = {
    playlist: PropTypes.object.isRequired,
  };
  constructor(props){
    super(props);
  }
  render () {
    let tracks = this.props.playlist.tracks;
    let trackRows = _.map(tracks, (track) => <TableRow key={track.id}>
      <TableRowColumn>{track.name}</TableRowColumn>
      <TableRowColumn>{track.artists.join(", ")}</TableRowColumn>
    </TableRow>);
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
