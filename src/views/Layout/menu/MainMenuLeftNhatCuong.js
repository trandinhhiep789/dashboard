import PropTypes from 'prop-types'
import React, { memo, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import MenuItem from '../../Dashboard/menu-items/index'

import 'antd/dist/antd.css'
import { RightOutlined } from '@ant-design/icons'
import './MainMenuLeftNhatCuong.css'
import { Tooltip } from 'antd'

import CollapseMainMenuLeft from './collapse/CollapseMainMenuLeft'
const MainMenuLeftNhatCuong = memo(function MainMenuLeftNhatCuong(props) {
  const [selected, setSelected] = useState(null)
  const toggle = useCallback(
    i => {
      if (i === selected) {
        props.setIsExpandWidthMenuLeft(false)
        return setSelected(null)
      }
      setSelected(i)
      props.setIsExpandWidthMenuLeft(true)
    },
    [selected]
  )

  return (
    <div>
      {MenuItem &&
        MenuItem.map((menu, i) => (
          <div className="mainMenuLeftNhatCuong" key={i}>
            {menu.SubMenu.length > 0 ? (
              <div className="mainMenuLeftNhatCuong__item" onClick={() => toggle(i)}>
                <div className="mainMenuLeftNhatCuong__item--center">
                  <div className="mainMenuLeftNhatCuong__item__icon">{menu.MenuIcon}</div>
                  <Tooltip color={'blue'} placement="rightTop" title={menu.MenuTitle}>
                    <div className="mainMenuLeftNhatCuong__item__title">{menu.MenuTitle.slice(0, 12)}</div>
                  </Tooltip>
                </div>
                <div className="mainMenuLeftNhatCuong__item__iconDrop">
                  <RightOutlined />
                </div>
              </div>
            ) : (
              <NavLink to="#">
                <div className="mainMenuLeftNhatCuong__item">
                  <div className="mainMenuLeftNhatCuong__item--center">
                    <div className="mainMenuLeftNhatCuong__item__icon">{menu.MenuIcon}</div>
                    <Tooltip color={'blue'} placement="rightTop" title={menu.MenuTitle}>
                      <div className="mainMenuLeftNhatCuong__item__title">{menu.MenuTitle.slice(0, 12)}</div>
                    </Tooltip>
                  </div>
                </div>
              </NavLink>
            )}
            <div
              className={
                selected == i ? 'mainMenuLeftNhatCuong__item__content--show' : 'mainMenuLeftNhatCuong__item__content'
              }
            >
              {menu.SubMenu.map((sub, i) => {
                return (
                  <div key={i}>
                    {sub.SubMenu.length > 0 ? (
                      <CollapseMainMenuLeft menuItem={sub} />
                    ) : (
                      <div className="mainMenuLeftNhatCuong__item__content__title">
                        <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
                          {sub.MenuTitle}
                        </NavLink>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
})

MainMenuLeftNhatCuong.propTypes = {}

export default MainMenuLeftNhatCuong
