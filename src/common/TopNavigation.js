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

            <ul className="nav navbar-nav navbar-right">
              <li role="presentation" className="dropdown">
                <a href="javascript:;" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-envelope-o"></i>
                  <span className="badge bg-green">6</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}