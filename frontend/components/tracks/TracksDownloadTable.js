import React, { PureComponent, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';
import TrackRow from './TrackRow';

export default class TracksDownloadTable extends PureComponent {
  static propTypes = {
    tracks: PropTypes.array.isRequired,
    tracksSearch: PropTypes.object.isRequired,
    trackDownloads: PropTypes.object.isRequired,
    onTrackDownloadClick: PropTypes.func.isRequired
  };
  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Artist</TableHeaderColumn>
            <TableHeaderColumn>Search Status</TableHeaderColumn>
            <TableHeaderColumn>Download Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows deselectOnClickaway={false} displayRowCheckbox={false}>
          {_.map(this.props.tracks, (track) => <TrackRow key={track.id} track={track} {...this.props}/>)}
        </TableBody>
      </Table>
    );
  }
}
