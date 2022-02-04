import React from 'react'
import {
  CalendarOutlined,
  PaperClipOutlined,
  SettingOutlined,
  PropertySafetyOutlined,
  SlidersOutlined,
  UserOutlined
} from '@ant-design/icons'

const MenuItem = [
  {
    id: 'dashboard',
    MenuTitle: 'VP điện tử',
    LinkTo: '',
    MenuIcon: <SettingOutlined />,
    SubMenu: []
  },
  {
    id: 'congviec',
    MenuTitle: 'Công việc',
    LinkTo: '',
    MenuIcon: <PropertySafetyOutlined />,
    SubMenu: [
      {
        id: 'hopthu',
        MenuTitle: 'Hộp thư nội bộ',
        LinkTo: '',
        SubMenu: []
      },
      {
        id: 'congvieccanhotro',
        MenuTitle: 'Công việc cần hỗ trợ',
        LinkTo: '',
        SubMenu: []
      },
      {
        id: 'thongbao',
        MenuTitle: 'Thông báo',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
          {
            id: 'xemthongbao',
            MenuTitle: 'Xem thông báo',
            LinkTo: '',
            MenuIcon: '',
            SubMenu: []
          },
          {
            id: 'quanlythongbao',
            MenuTitle: 'Quản lý thông báo',
            LinkTo: '',
            MenuIcon: '',
            SubMenu: []
          }
        ]
      },
      {
        id: 'lichlamviec',
        MenuTitle: 'Lịch làm việc',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
          {
            id: 'quanlylichlamviec',
            MenuTitle: 'Quản lý lịch làm việc',
            LinkTo: '',
            MenuIcon: '',
            SubMenu: []
          }
        ]
      }
    ]
  },
  {
    id: 'tintuc',
    MenuTitle: 'Tin tức',
    LinkTo: '',
    MenuIcon: <SlidersOutlined />,
    SubMenu: [
      {
        id: 'lichlamviec',
        MenuTitle: 'Lịch làm việc',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: []
      },
      {
        id: 'quanlyduan',
        MenuTitle: 'Quản lý dự án',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: []
      },
      {
        id: 'chungtudientu',
        MenuTitle: 'Chứng từ điện tử',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: []
      }
    ]
  },
  {
    id: 'nhansu',
    MenuTitle: 'Nhân sự',
    LinkTo: '',
    MenuIcon: <UserOutlined />,
    SubMenu: []
  },
  {
    id: 'cms',
    MenuTitle: 'CMS',
    LinkTo: '',
    MenuIcon: <SlidersOutlined />,
    SubMenu: []
  },
  {
    id: 'lichhop',
    MenuTitle: 'Lịch họp',
    LinkTo: '',
    MenuIcon: <CalendarOutlined />,
    SubMenu: []
  },
  {
    id: 'tailiey',
    MenuTitle: 'Tài liệu',
    LinkTo: '',
    MenuIcon: <PaperClipOutlined />,
    SubMenu: []
  }
]

export default MenuItem
