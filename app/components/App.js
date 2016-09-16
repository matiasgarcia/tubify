import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-flexbox-grid/lib/index';
import Menu from './Menu';

export default class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };
  render() {
    return (
      <Grid>
        <Row>
          <Menu user={this.props.auth.userData}/>
        </Row>
        {this.props.children}
      </Grid>
    );
  }
}
