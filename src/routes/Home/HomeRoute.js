import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomeRouteContent from './HomeRouteContent'

class HomeRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <Route
        path={'/'}
        exact
        component={ HomeRouteContent }
      />
    )
  }
}

export default HomeRoute