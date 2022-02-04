import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import './CollapseMainMenuLeft.css'
import 'antd/dist/antd.css'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const CollapseMainMenuLeft = memo(function CollapseMainMenuLeft(props) {
  const [selected, setSelected] = useState(null)

  const toggle = i => {
    if (i === selected) {
      return setSelected(null)
    }
    setSelected(i)
  }

  return (
    <div className="collapseMainMenuLeft">
      <div className="collapseMainMenuLeft__header" onClick={() => toggle(1)}>
        <div className="collapseMainMenuLeft__header__title">Thông báo</div>
        <div className="collapseMainMenuLeft__header__icon">
          {selected === 1 ? <MinusOutlined /> : <PlusOutlined />}
        </div>
      </div>
      <div className={`${selected === 1 ? 'collapseMainMenuLeft__content--show' : 'collapseMainMenuLeft__content'}`}>
        <div className="collapseMainMenuLeft__content__item">
          <NavLink className="collapseMainMenuLeft__content__item__navlink" to="#">
            Xem hông báo
          </NavLink>
        </div>
        <div className="collapseMainMenuLeft__content__item">
          <NavLink className="collapseMainMenuLeft__content__item__navlink" to="#">
            Quản lý thông báo
          </NavLink>
        </div>
      </div>
    </div>
  )
})

CollapseMainMenuLeft.propTypes = {}

export default CollapseMainMenuLeft
