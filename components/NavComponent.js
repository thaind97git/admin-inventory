import React, { Component } from 'react';
import MenuComponent from '../components/MenuComponent';
import Router from 'next/router';

class NavComponent extends Component {
  render() {
    const path = Router.router && Router.router.route;
    return (
      <MenuComponent
        path={path}
      />
    )
  }
}

export default NavComponent;