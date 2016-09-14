import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import SelectableList from './SelectableList'
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

class PlaylistsList extends Component {
  static propTypes = {
    playlists: PropTypes.array.isRequired,
    selected: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    total: PropTypes.number
  };
  render() {
    let playlists = this.props.playlists;
    let pendingCount = this.props.total - playlists.length;
    return (
      <SelectableList onChange={this.props.onChange} selected={this.props.selected}>
        <Subheader>Playlists</Subheader>
        {_.map(playlists, (playlist) => <ListItem
          key={playlist.id}
          value={playlist.id}
          primaryText={playlist.name}
          leftAvatar={<Avatar src={playlist.images[0].url}/>}
        />)}
        {pendingCount != 0 ? <ListItem key={0} value={0} primaryText={"Load more playlists (" + pendingCount + " left...)"}/> : null}
      </SelectableList>
    )
  }
}


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
      <div>
        <PlaylistsList
          total={this.props.apiMeta.playlists.totalCount}
          playlists={this.props.playlistsData.playlists}
          selected={this.state.selectedPlaylist}
          onChange={this.handlePlaylistChange}
        />
      </div>
    )
  }
}
