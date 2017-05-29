'use-strict'

import React, { Component } from 'react'

export default class TopNavigation extends Component {
  render() {
    return (
      <div className="top_nav">
        <div className="nav_menu">
          <nav>
            <div className="nav toggle">
              <a id="menu_toggle"><i className="fa fa-bars"></i></a>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}