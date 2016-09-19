import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { openInFileExplorer } from '../../utils/interactions';
import _ from 'lodash';

export default class TracksDownloadTable extends Component {
  static propTypes = {
    tracks: PropTypes.array.isRequired,
    tracksSearch: PropTypes.object.isRequired,
    trackDownloads: PropTypes.object.isRequired,
    onTrackDownloadClick: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.getTrackRows = this.getTrackRows.bind(this);
    this.displaySearchStatus = this.displaySearchStatus.bind(this);
    this.displayDownloadStatus = this.displayDownloadStatus.bind(this);
    this.handleTrackDownload = this.handleTrackDownload.bind(this);
  }
  handleTrackDownload(trackId, trackSearchInfo, event) {
    event.preventDefault();
    this.props.onTrackDownloadClick({id: trackId, url: trackSearchInfo.results[0].url})
  }
  handleOpenTrack(filePath, event) {
    event.preventDefault();
    openInFileExplorer(filePath);
  }
  displaySearchStatus(trackId){
    let searchedTracks = this.props.tracksSearch;
    let foundTrack = searchedTracks[trackId];
    if (foundTrack){
      if (foundTrack.error){
        return "An error occurred";
      } else if (foundTrack.isFetching){
        return <CircularProgress size={0.5}/>;
      } else if(foundTrack.results &&  foundTrack.results[0]){
        return <RaisedButton label="Download" primary onClick={this.handleTrackDownload.bind(null, trackId, foundTrack)}/>
      }
    } else {
      return "Not searched..·";
    }
  }
  displayDownloadStatus(trackId){
    let trackDownloads = this.props.trackDownloads;
    let foundTrack = trackDownloads[trackId];
    if (foundTrack){
      if (foundTrack.error){
        return "An error occurred";
      } else if (foundTrack.isFetching) {
        return <CircularProgress size={0.5}/>;
      } else if (foundTrack.downloaded) {
        return <RaisedButton secondary label="Open" onClick={this.handleOpenTrack.bind(null, foundTrack.filePath)}/>;
      }
    }
    return "Not downloaded yet."
  }
  getTrackRows() {
    let displaySearchStatus = this.displaySearchStatus;
    let displayDownloadStatus = this.displayDownloadStatus;
    return _.map(this.props.tracks, (track) => {
      return <TableRow key={track.id}>
        <TableRowColumn>{track.name}</TableRowColumn>
        <TableRowColumn>{track.artists.join(', ')}</TableRowColumn>
        <TableRowColumn>{displaySearchStatus(track.id)}</TableRowColumn>
        <TableRowColumn>{displayDownloadStatus(track.id)}</TableRowColumn>
      </TableRow>
    });
  }
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
          {this.getTrackRows()}
        </TableBody>
      </Table>
    );
  }
}
