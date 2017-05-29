'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ShowClaim extends Component {
  constructor(props) {
    super(props)

    this.state = {
      claim: {},
      error: '',
    }

    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    this.props.Registry.registry(this.claimHash.value, (e, r) => {
      if (!e && Array.isArray(r) && r.length) {
        const claim = {
          Date: r[0],
          'Centre DID': r[1],
          ClaimedTokens: r[2],
        }
        this.setState({ claim, error: '' })
      }
      else (this.setState({ claim: {}, error: e }))
    })
  }

  render() {
    const preStyle = {
      minHeight: 100,
    }

    return(
      <div className={'tab-pane' + (this.props.active ? ' active' : '')} id={'claim'+this.props.id}>
        <p className="lead">
          {this.state.error ? this.state.error : '#' + (1+parseInt(this.props.id)) +  ' Verifiable Claim'}
        </p>
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <div className="col-xs-9">
                <input type="text" className="form-control" ref={(ch) => { this.claimHash = ch }} placeholder="Verifiable Claim Hash" />
              </div>
              <div className="col-xs-3">
                <button type="submit" className="btn btn-success" onClick={this._onClick}>Show</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-xs-10" style={{ marginLeft: 10 }}>
            <pre style={preStyle}>{Object.keys(this.state.claim).length > 0 && JSON.stringify(this.state.claim, undefined, 4)}</pre>
          </div>
        </div>
      </div>
    )
  }
}
ShowClaim.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  Registry: PropTypes.object.isRequired,
}

export default class RegistryInterface extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 'exists',
      exists: null,
      error: '',
    }

    this.verify = this.verify.bind(this)
    this.select = this.select.bind(this)
  }

  select(what) {
    this.setState({ active: what })
  }

  verify() {
    this.props.Registry.exists(this.exists.value, (e, r) => {
      if (!e) this.setState({ exists: r, error: '' })
      else this.setState({ exists: null, error: e })
    })
  }

  render() {
    const a = [0,1,2]
    return(
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <h2><i className="fa fa-bars"></i> Claims Registry Smart Contract <small>Ethereum Delivery Service</small></h2>
            <ul className="nav navbar-right panel_toolbox">
              <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a></li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">

            <div className="col-xs-3">
              <ul className="nav nav-tabs tabs-left">
                <li className={this.state.active === 'exists' ? 'active' : ''}>
                  <a onClick={() => this.select('exists')} href="#exists" data-toggle="tab">Recorded</a>
                </li>
                {
                  a.map(i => {
                    return (
                      <li key={'ShowClaimList'+i} className={this.state.active === i ? 'active' : ''}>
                        <a onClick={() => this.select(''+i)} href={'#claim'+i} data-toggle="tab">#{i+1} Show Claim</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className="col-xs-9">
              <div className="tab-content">

                <div className={'tab-pane' + (this.state.active === 'exists' ? ' active' : '')} id="#exists">
                  <p className="lead">
                    {this.state.error ? this.state.error : 'Verifiable Claim is recorded: ' + (this.state.exists === null ? '' : this.state.exists)}
                  </p>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <div className="col-xs-9">
                          <input type="text" className="form-control" ref={(e) => { this.exists = e }} placeholder="Verifiable Claim Hash" />
                        </div>
                        <div className="col-xs-3">
                          <button type="submit" className="btn btn-success" onClick={this.verify}>Verify</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  a.map(i => {
                    return <ShowClaim key={'ShowClaim'+i} Registry={this.props.Registry} id={''+i} active={this.state.active == i} />
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
RegistryInterface.propTypes = {
  Registry: PropTypes.object.isRequired,
}