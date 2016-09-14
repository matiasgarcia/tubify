import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-flexbox-grid/lib/index';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    let userImageUrl = this.props.auth.userData.images[0].url;
    let userAvatar = <Avatar src={userImageUrl}/>;
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <AppBar
              title="Tubify"
              iconElementRight={userAvatar}
            />
          </Col>
        </Row>
        {this.props.children}
      </Grid>
    );
  }
}
