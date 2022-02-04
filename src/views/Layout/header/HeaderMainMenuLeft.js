import PropTypes from 'prop-types'
import React, { memo } from 'react'
import './HeaderMainMenuLeft.css'

import { Menu, Dropdown, Collapse } from 'antd'
import { DownOutlined, PlusSquareOutlined, CaretRightOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

import logo from '../../../img/eoffice-logo.png'

const { Panel } = Collapse

const HeaderMainMenuLeft = memo(function HeaderMainMenuLeft(props) {
  const menu = (
    <Menu>
      {/* <Menu.Item key="3">3rd menu item</Menu.Item> */}
      <Collapse expandIcon={({ isActive }) => <PlusSquareOutlined rotate={isActive ? 90 : 0} />} ghost>
        <Panel header="This is panel header 1" key="1">
          hahahaah
          <Collapse expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} ghost>
            <Panel header="This is panel header 2" key="2">
              hahahaah
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          hahahaah
        </Panel>
        <Panel header="This is panel header 3" key="3">
          hahahaah
        </Panel>
      </Collapse>
    </Menu>
  )
  return (
    <div className="headerMainMenuLeft">
      <div></div>
      <div className="headerMainMenuLeft--dflex">
        <div>
          <img className="logo_eoffice" src={logo} alt="../../../img/eoffice-logo.png" />
        </div>
        <div className="headerMainMenuLeft__listItem">
          <div className="headerMainMenuLeft__listItem__item">
            <Dropdown overlay={menu} trigger={['click']}>
              <div>
                Công việc CHT <DownOutlined />
              </div>
            </Dropdown>
          </div>
          <div className="headerMainMenuLeft__listItem__item">
            <Dropdown overlay={menu} trigger={['click']}>
              <div>
                Công việc CHT <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
})

HeaderMainMenuLeft.propTypes = {}

export default HeaderMainMenuLeft
