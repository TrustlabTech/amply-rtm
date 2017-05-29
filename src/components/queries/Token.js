'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

class CheckBalance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balance: -1,
      error: '',
    }

    this._onClick = this._onClick.bind(this)
  }

  _onClick = () => {
    this.props.Token.balanceOf(this.address.value, (e, r) => {
      if (!e) this.setState({ balance: r, error: '' })
      else this.setState({ balance: -1, error: e })
    })
  }

  render() {
    return(
      <div className={'tab-pane' + (this.props.active ? ' active' : '')} id={'tokenBalance' + this.props.id}>
        <p className="lead">
          {this.state.error ? this.state.error : '#' + (1+parseInt(this.props.id)) + '    Balance: ' + (this.state.balance > -1 ? this.state.balance + '  AMP' : '')}
        </p>
        <div className="row">
          <div className="col-xs-8">
            <div className="form-group">
              <div className="col-xs-9">
                <input type="text" className="form-control" ref={(a) => { this.address = a }} placeholder="Address" />
              </div>
              <div className="col-xs-3">
                <button type="submit" className="btn btn-success" onClick={this._onClick}>Check balance</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CheckBalance.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  Token: PropTypes.object.isRequired,
}

export default class TokenInterface extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 0,
    }
  }

  _onClick(active) {
    this.setState({ active })
  }

  render() {
    const a = [0,1,2]
    return(
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <h2><i className="fa fa-bars"></i> Token Smart Contract <small>Ethereum Delivery Service</small></h2>
            <ul className="nav navbar-right panel_toolbox">
              <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">

            <div className="col-xs-3">
              <ul className="nav nav-tabs tabs-left">
                {
                  a.map(i => {
                    return (
                      <li className={this.state.active === i ? 'active' : ''} key={'ListCheckBalance'+i}>
                        <a onClick={() => this._onClick(i)} href={'#tokenBalance'+i} data-toggle="tab">Balance #{i+1}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className="col-xs-9">
              <div className="tab-content">
                {
                  a.map(i => {
                    return <CheckBalance Token={this.props.Token} id={''+i} key={'CheckBalance'+i} active={this.state.active === i} />
                  })
                }
              </div>
            </div>

            <div className="clearfix"></div>

          </div>
        </div>
      </div>
    )
  }
}
TokenInterface.propTypes = {
  Token: PropTypes.object.isRequired,
}