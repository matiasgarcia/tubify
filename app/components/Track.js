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
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.renderTrackSearchData = this.renderTrackSearchData.bind(this);
  }
  onSearchClick(event){
    event.preventDefault();
    this.props.trackSearchActions.searchTrack(this.props.track);
  }
  onSelectionToggle(event){
    let props = this.props;
    props.playlistActions.selectTrack(props.playlistId, props.track.id, event.target.checked);
  }
  onDownloadClick(r, event){
    event.preventDefault();
    this.props.trackSearchActions.downloadTrack(r);
  }
  renderTrackSearchData(){
    let trackSearchData = this.props.trackSearchData[this.props.track.id];
    if(trackSearchData){
      let downloadLinks = _.map(trackSearchData.results, (r) => {
        return <li key={r.id}><a href="#" onClick={this.onDownloadClick.bind(null, r)}>{r.url}</a></li>
      })
      return <ul>{downloadLinks}</ul>;
    } else {
      return null;
    }
  }
  render(){
    let props = this.props;
    //TODO: Remove DIV, illegal HTML.
    return (
      <div>
        <li><input type="checkbox" checked={props.track.isSelected} onChange={this.onSelectionToggle}/>{props.track.name}</li>
        <a href="#" onClick={this.onSearchClick}>Search Track</a>
        {this.renderTrackSearchData()}
      </div>
    )
  }
}