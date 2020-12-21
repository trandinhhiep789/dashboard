import React, { Component } from 'react'
export class Footer extends Component {
    render() {
        return (
          <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="text-center text-md-left">Copyright © 2018 The Gioi Di Dong</p>
              </div>
  
              <div className="col-md-6">
                <ul className="nav nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
                <p className="text-center text-md-left">ERP</p>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        )
    }
}
export default Footer;