import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import _ from 'lodash';
import PlaylistsList from './PlaylistsList';
import CurrentPlaylist from './CurrentPlaylist';
import PlaylistTracksLoader from './PlaylistTracksLoader';
import PlaylistsLoader from './PlaylistsLoader';

export default class UserPlaylist extends Component {
  static propTypes = {
    playlistsData: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackActions: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired,
    apiMeta: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.state = {selectedPlaylistId: null}
  }
  handlePlaylistChange = (event, index) => {
    if(index != 0){
      this.setState({
        selectedPlaylistId: index,
      })
    }
  };
  render() {
    var props = this.props;
    let playlists = props.playlistsData.playlists;
    let selectedPlaylistId = this.state.selectedPlaylistId;
    let selectedPlaylist = _.find(playlists, (playlist) => playlist.id == selectedPlaylistId);
    return (
      <Row>
        <Col md={4}>
          <Paper>
            <PlaylistsLoader
              playlistsData={props.playlistsData}
              playlistsMeta={props.apiMeta.playlists}
              loadPlaylists={props.playlistActions.fetchUserPlaylists}
            >
              <PlaylistsList
                total={props.apiMeta.playlists.totalCount}
                playlists={playlists}
                selected={selectedPlaylistId}
                onChange={this.handlePlaylistChange}
              />
            </PlaylistsLoader>
          </Paper>
        </Col>
        <Col md={8}>
          {selectedPlaylist &&
          <PlaylistTracksLoader
            playlist={selectedPlaylist}
            playlistMeta={props.apiMeta.playlistTracks[selectedPlaylistId]}
            loadTracks={props.playlistActions.fetchPlaylistTracks}>
            <CurrentPlaylist
              tracks={props.tracks}
              playlist={selectedPlaylist}
            />
          </PlaylistTracksLoader>}
        </Col>
      </Row>
    )
  }
}
