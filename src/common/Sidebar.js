'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Sidebar extends Component {
  render() {
    return (
      <div className="col-md-3 left_col">

          <div className="left_col scroll-view">
            
            <div className="navbar nav_title" style={{ border: 0 }}>
              <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Amply Dashboard</span></a>
            </div>

            <div className="clearfix"></div>

            <br />

            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
              <div className="menu_section">
                <h3>General</h3>
                <ul className="nav side-menu">
                  <li><a><i className="fa fa-home"></i> Home <span className="fa fa-chevron-down"></span></a>
                    <ul className="nav child_menu">
                      <li><a href="index.html">Dashboard</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>

          </div>
        </div>
    )
  }
}