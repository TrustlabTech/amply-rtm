'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Sidebar from './Sidebar'
import TopNavigation from './TopNavigation'

export default class Layout extends Component {
  render() {
    return (
      <Wrapper>
        <Sidebar />
        <TopNavigation />
        {this.props.children}
        <Footer />
      </Wrapper>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
}

class Wrapper extends Component {
  render() {
    return (
      <div className="main_container">
        {this.props.children}
      </div>
    )
  }
}

Wrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="pull-right">
          Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
        </div>
        <div className="clearfix"></div>
      </footer>
    )
  }
}