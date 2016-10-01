import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-flexbox-grid/lib/index';
import Menu from './Menu';

export default class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };
  render() {
    return (
      <div>
        <Row>
          <Menu user={this.props.auth.userData} config={this.props.config}/>
        </Row>
        {this.props.children}
      </div>
    );
  }
}
