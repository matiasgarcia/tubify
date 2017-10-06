import React, { PureComponent, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { openInFileExplorer } from '../../utils/interactions';

export default class TrackRow extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    track: PropTypes.shape({
      id: PropTypes.string,
      artists: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    trackSearch: PropTypes.object.isRequired,
    trackDownload: PropTypes.object.isRequired,
    onTrackDownloadClick: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
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
    let foundTrack = this.props.trackSearch;
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
    let foundTrack = this.props.trackDownload;
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
  render() {
    const { track } = this.props;
    return <TableRow key={track.id}>
      <TableRowColumn>{track.name}</TableRowColumn>
      <TableRowColumn>{track.artists.join(', ')}</TableRowColumn>
      <TableRowColumn>{this.displaySearchStatus(track.id)}</TableRowColumn>
      <TableRowColumn>{this.displayDownloadStatus(track.id)}</TableRowColumn>
    </TableRow>
  }
}
