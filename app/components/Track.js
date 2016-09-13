import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class Track extends Component {
  static propTypes = {
    track: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired,
    trackSearchData: PropTypes.object.isRequired,
    trackSearchActions: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.onSelectionToggle = this.onSelectionToggle.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }
  onSearchClick(event){
    event.preventDefault();
    this.props.trackSearchActions.searchTrack(this.props.track);
  }
  onSelectionToggle(event){
    let props = this.props;
    props.playlistActions.selectTrack(props.playlistId, props.track.id, event.target.checked);
  }
  render(){
    let props = this.props;
    let trackSearchData = this.props.trackSearchData[props.track.id];
    //TODO: Remove DIV, illegal HTML.
    return (
      <div>
        <li><input type="checkbox" checked={props.track.isSelected} onChange={this.onSelectionToggle}/>{props.track.name}</li>
        <a href="#" onClick={this.onSearchClick}>Search Track</a>
        <ul>{trackSearchData && _.map(trackSearchData.results, (r) => <li key={r.id}>{r.url}</li>)}</ul>
      </div>
    )
  }
}