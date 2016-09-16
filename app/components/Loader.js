import React, { Component, PropTypes } from 'react';

export default class Loader extends Component {
  static propTypes = {
    fetchedObject: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      id: PropTypes.string
    }).isRequired,
    nextOffset: PropTypes.number.isRequired,
    remoteObjectsCount: PropTypes.number.isRequired,
    fetchedObjectsCount: PropTypes.number.isRequired,
    load: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };
  componentWillReceiveProps(nextProps){
    if (nextProps.fetchedObjectsCount == nextProps.remoteObjectsCount) {
      //Fetch is done
      return;
    }
    let oldProps = this.props;

    let tracksPending = !nextProps.fetchedObject.isFetching && nextProps.nextOffset > 0;
    let objectChanged = nextProps.fetchedObject.id && (nextProps.fetchedObject.id != oldProps.fetchedObject.id);

    if (tracksPending || objectChanged) this.props.load();
  }
  componentDidMount(){
    this.props.load();
  }
  render(){
    return this.props.children;
  }
}
