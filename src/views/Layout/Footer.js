import React, { Component } from 'react'
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="text-center text-md-left">Copyright © 2018 The Gioi Di Dong</p>
          </div>

          <div className="col-md-3">
            <ul className="nav nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
              <p className="text-center text-md-left">ERP</p>
            </ul>
          </div>
          <div className="col-md-3">
            <a href='https://tms.tantamphucvu.vn/app/android/TMS-p(1.0.6).apk' download >
              <p className="text-center text-md-left">Download App TMS android</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;