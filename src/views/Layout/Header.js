import React from 'react'
import Media from 'react-media'

import Logo from './Logo'
import LogoSidebar from './LogoSidebar'
import ProfileBox from './ProfileBox'
import FooterSidebar from './FooterSidebar'

const Header = () => {
  return (
    <React.Fragment>
      <Media query="(max-width: 991px)">
        <aside className="sidebar sidebar-icons-right sidebar-icons-boxed sidebar-expand-lg sidebar-mobile sidebar-custom">
          <nav className="sidebar-navigation">
            <LogoSidebar />
            {/* <TopMenu /> */}
            <FooterSidebar />
          </nav>
        </aside>
      </Media>
      <header className="topbar topbar-expand-lg">
        <div className="topbar-left">
          <span className="topbar-btn topbar-menu-toggler topbar-menu-toggler-mobile">
            <i className="fa fa-bars"></i>
          </span>
          <Logo />
          <div className="topbar-divider d-none d-xl-block"></div>

          <Media query="(min-width: 992px)">
            <nav className="topbar-navigation">{/* <TopMenu /> */}</nav>
          </Media>
        </div>
        <div className="topbar-right">
          <ul className="topbar-btns">
            <ProfileBox />
          </ul>
          <div className="topbar-divider d-none d-md-block"></div>
          {/* <form className="lookup lookup-circle lookup-right" target="index.html">
                        <input type="text" name="s" />
                    </form> */}
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
