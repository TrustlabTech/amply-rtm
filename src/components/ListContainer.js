'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class ListContainer extends Component {
  render() {
    const maxHeight = this.props.maxHeight || 480
    return (
      <div className="col-md-6 col-sm-6 col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <h2>{this.props.title} <small>{this.props.description}</small></h2>
              <ul className="nav navbar-right panel_toolbox">
                <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
              </ul>
              <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <div className="dashboard-widget-content">
              <ul className="list-unstyled timeline widget" style={{ maxHeight: maxHeight, overflowY: 'scroll', minHeight: maxHeight }}>
                {this.props.children}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ListContainer.propTypes = {
  maxHeight: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}