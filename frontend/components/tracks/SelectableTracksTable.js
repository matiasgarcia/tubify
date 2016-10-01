import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';

export default class SelectableTracksTable extends Component {
  static propTypes = {
    tracks: PropTypes.array.isRequired,
    allTracks: PropTypes.object.isRequired,
    onTrackSelect: PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }
  handleRowSelection (selectedRows) {
    let props = this.props;
    let tracksSelected;
    if(selectedRows == 'all' || selectedRows.length == 0){
      let isSelected = selectedRows == 'all';
      tracksSelected = _.map(props.tracks, (trackId) => {
        return {
          id: trackId,
          isSelected: isSelected
        }
      });
    } else {
      let index = 0;
      tracksSelected = _.map(props.tracks, (trackId) => {
        let selectedTrack = {
          id: trackId,
          isSelected: _.find(selectedRows, (rowIndex) => rowIndex === index) != undefined
        };
        index += 1;
        return selectedTrack;
      });
    }
    props.onTrackSelect(tracksSelected);
  }
  render () {
    let playlistTracks = this.props.tracks;
    let tracks = this.props.allTracks;
    let trackRows = _.map(playlistTracks, (trackId) => {
      var track = tracks[trackId];
      return <TableRow key={trackId} selected={track.isSelected}>
        <TableRowColumn>{track.name}</TableRowColumn>
        <TableRowColumn>{track.artists.join(", ")}</TableRowColumn>
      </TableRow>;
    });
    return (
      <Table multiSelectable onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Artists</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows deselectOnClickaway={false}>
          {trackRows}
        </TableBody>
      </Table>
    )
  }
}
