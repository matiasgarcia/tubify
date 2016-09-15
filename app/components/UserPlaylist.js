import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import _ from 'lodash';
import PlaylistsList from './PlaylistsList';
import CurrentPlaylist from './CurrentPlaylist';
import PlaylistLoader from './PlaylistLoader';

export default class UserPlaylist extends Component {
  static propTypes = {
    playlistsData: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackSearchActions: PropTypes.object.isRequired,
    apiMeta: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.state = {selectedPlaylistId: null}
  }
  componentDidMount() {
    this.loadPlaylists();
  }
  loadPlaylists(offset = 0){
    this.props.playlistActions.fetchUserPlaylists(offset);
  }
  handlePlaylistChange = (event, index) => {
    if(index == 0){
      this.loadPlaylists(this.props.apiMeta.playlists.nextOffset)
    } else {
      this.setState({
        selectedPlaylistId: index,
      })
    }
  };
  render() {
    let playlists = this.props.playlistsData.playlists;
    let selectedPlaylistId = this.state.selectedPlaylistId;
    let selectedPlaylist = _.find(playlists, (playlist) => playlist.id == selectedPlaylistId);
    return (
      <Row>
        <Col md={4}>
          <Paper>
            <PlaylistsList
              total={this.props.apiMeta.playlists.totalCount}
              playlists={playlists}
              selected={selectedPlaylistId}
              onChange={this.handlePlaylistChange}
            />
          </Paper>
        </Col>
        <Col md={8}>
          {selectedPlaylist &&
          <PlaylistLoader
            playlist={selectedPlaylist}
            playlistMeta={this.props.apiMeta.playlistTracks[selectedPlaylistId]}
            loadTracks={this.props.playlistActions.fetchPlaylistTracks}>
            <CurrentPlaylist
              playlist={selectedPlaylist}
            />
          </PlaylistLoader>}
        </Col>
      </Row>
    )
  }
}
