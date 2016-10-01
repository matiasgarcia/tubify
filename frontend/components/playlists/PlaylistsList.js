import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import SelectableList from '../SelectableList'

export default class PlaylistsList extends Component {
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
        {pendingCount != 0 ? <ListItem key={0} value={0} primaryText={"Loading more playlists (" + pendingCount + " left...)"}/> : null}
      </SelectableList>
    )
  }
}
