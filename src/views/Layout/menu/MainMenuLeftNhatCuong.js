import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import 'antd/dist/antd.css'
import { SettingOutlined, RightOutlined } from '@ant-design/icons'
import './MainMenuLeftNhatCuong.css'

import CollapseMainMenuLeft from './collapse/CollapseMainMenuLeft'

const MainMenuLeftNhatCuong = memo(function MainMenuLeftNhatCuong(props) {
  const [selected, setSelected] = useState(null)

  const toggle = i => {
    if (i === selected) {
      props.setIsExpandWidthMenuLeft(false)
      return setSelected(null)
    }
    setSelected(i)
    props.setIsExpandWidthMenuLeft(true)
  }

  return (
    <div>
      <div className="mainMenuLeftNhatCuong">
        <div className="mainMenuLeftNhatCuong__item" onClick={() => toggle(1)}>
          <div className="mainMenuLeftNhatCuong__item--center">
            <div className="mainMenuLeftNhatCuong__item__icon">
              <SettingOutlined />
            </div>
            <div className="mainMenuLeftNhatCuong__item__title">VP điện tử</div>
          </div>
          <div className="mainMenuLeftNhatCuong__item__iconDrop">
            <RightOutlined />
          </div>
        </div>
        <div
          className={
            selected == 1 ? 'mainMenuLeftNhatCuong__item__content--show' : 'mainMenuLeftNhatCuong__item__content'
          }
        >
          <div className="mainMenuLeftNhatCuong__item__content__title">
            <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
              Hộp thư nội bộ
            </NavLink>
          </div>
          <div className="mainMenuLeftNhatCuong__item__content__title">
            <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
              Thông báo
            </NavLink>
          </div>
          <CollapseMainMenuLeft />
          <div className="mainMenuLeftNhatCuong__item__content__title">
            <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
              Công việc cần làm
            </NavLink>
          </div>
        </div>
      </div>
      <div className="mainMenuLeftNhatCuong">
        <div className="mainMenuLeftNhatCuong__item" onClick={() => toggle(2)}>
          <div className="mainMenuLeftNhatCuong__item--center">
            <div className="mainMenuLeftNhatCuong__item__icon">
              <SettingOutlined />
            </div>
            <div className="mainMenuLeftNhatCuong__item__title">VP điện tử</div>
          </div>
          <div className="mainMenuLeftNhatCuong__item__iconDrop">
            <RightOutlined />
          </div>
        </div>
        <div
          className={
            selected == 2 ? 'mainMenuLeftNhatCuong__item__content--show' : 'mainMenuLeftNhatCuong__item__content'
          }
        >
          <div className="mainMenuLeftNhatCuong__item__content__title">
            <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
              Hộp thư nội bộ
            </NavLink>
          </div>
          <div className="mainMenuLeftNhatCuong__item__content__title">
            <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
              Thông báo
            </NavLink>
          </div>
          <CollapseMainMenuLeft />
          <div className="mainMenuLeftNhatCuong__item__content__title">
            <NavLink className="mainMenuLeftNhatCuong__item__content__title__navlink" to="#">
              Công việc cần làm
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
})

MainMenuLeftNhatCuong.propTypes = {}

export default MainMenuLeftNhatCuong
