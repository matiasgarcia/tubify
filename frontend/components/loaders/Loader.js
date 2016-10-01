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
  constructor(props){
    super(props);
    this.areAllObjectsFetched = this.areAllObjectsFetched.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (!this.areAllObjectsFetched(nextProps.fetchedObjectsCount, nextProps.remoteObjectsCount)) {
      let oldProps = this.props;

      let tracksPending = !nextProps.fetchedObject.isFetching && nextProps.nextOffset > 0;
      let objectChanged = nextProps.fetchedObject.id && (nextProps.fetchedObject.id != oldProps.fetchedObject.id);

      if (tracksPending || objectChanged) this.props.load();
    }

  }
  areAllObjectsFetched(fetchedObjectsCount, remoteObjectsCount){
    return fetchedObjectsCount > 0 && remoteObjectsCount > 0 && fetchedObjectsCount == remoteObjectsCount
  }
  componentDidMount(){
    var fetchedObjectsCount = this.props.fetchedObjectsCount;
    var remoteObjectsCount = this.props.remoteObjectsCount;
    if (!this.areAllObjectsFetched(fetchedObjectsCount, remoteObjectsCount)){
      this.props.load();
    }
  }
  render(){
    return this.props.children;
  }
}
