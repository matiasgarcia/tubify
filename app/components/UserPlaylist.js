import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import PlaylistsList from './PlaylistsList'

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
    this.state = {selectedPlaylist: null}
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
        selectedPlaylist: index,
      })
    }
  };
  render() {
    return (
      <Row>
        <Col md={4}>
          <Paper>
            <PlaylistsList
              total={this.props.apiMeta.playlists.totalCount}
              playlists={this.props.playlistsData.playlists}
              selected={this.state.selectedPlaylist}
              onChange={this.handlePlaylistChange}
            />
          </Paper>
        </Col>
      </Row>
    )
  }
}
