import PropTypes from 'prop-types'
import React, { memo } from 'react'
import './HeaderMainMenuLeft.css'

import { Menu, Dropdown, Collapse, Switch, Avatar } from 'antd'
import { DownOutlined, PlusSquareOutlined, CaretRightOutlined, UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { useTranslation } from 'react-i18next'

import logo from '../../../img/eoffice-logo.png'

const { Panel } = Collapse

const HeaderMainMenuLeft = memo(function HeaderMainMenuLeft(props) {
  const { i18n } = useTranslation()

  const userAccount = (
    <Menu>
      <div style={{ padding: '10px' }}>
        <p style={{ fontWeight: '500' }}>CHUYÊN VIÊN QUẢN TRỊ WEB VÀ AN TOÀN MẠNG</p>
        <hr />
        <div>Trang có nhân</div>
        <div>Đổi mật khẩu</div>
        <div>Đăng suất</div>
      </div>
    </Menu>
  )

  const handleChangeLangChange = value => {
    if (value) {
      return i18n.changeLanguage('en')
    }
    i18n.changeLanguage('vi')
  }

  return (
    <div className="headerMainMenuLeft">
      <div className="headerMainMenuLeft--dflex">
        <div>
          <img className="logo_eoffice" src={logo} alt="../../../img/eoffice-logo.png" />
        </div>
        <div className="headerMainMenuLeft__listItem">
          <div className="headerMainMenuLeft__listItem__item"></div>
          <div className="headerMainMenuLeft__listItem__item"></div>
          &emsp;
          <div className="headerMainMenuLeft__listItem__item--center">
            <Switch checkedChildren="Eng" unCheckedChildren="Vie" onChange={handleChangeLangChange} />
          </div>
          &ensp;
          <div className="headerMainMenuLeft__listItem__item--center">
            <Dropdown overlay={userAccount} trigger={['click']}>
              <Avatar
                style={{
                  backgroundColor: '#87d068'
                }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
})

HeaderMainMenuLeft.propTypes = {}

export default HeaderMainMenuLeft
