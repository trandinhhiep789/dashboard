import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CalendarOutlined,
  PaperClipOutlined,
  SettingOutlined,
  PropertySafetyOutlined,
  SlidersOutlined,
  UserOutlined,
  FormOutlined,
  UnorderedListOutlined,
  WindowsOutlined,
  EditOutlined,
  DingdingOutlined,
  AliwangwangOutlined,
  AppleOutlined,
  AndroidOutlined
} from '@ant-design/icons'

const useMenuItem = () => {
  const { t } = useTranslation()
  const MenuItem = [
    {
      id: 'dashboard',
      MenuTitle: t('menuItem.dashboard__title'),
      LinkTo: '',
      MenuIcon: <SettingOutlined />,
      SubMenu: []
    },
    {
      id: 'congviec',
      MenuTitle: t('menuItem.task__title'),
      LinkTo: '',
      MenuIcon: <PropertySafetyOutlined />,
      SubMenu: [
        {
          id: 'hopthu',
          MenuTitle: t('menuItem.task__subMenu.task__child__1__title'),
          LinkTo: '',
          SubMenu: []
        },
        {
          id: 'lichlamviec',
          MenuTitle: t('menuItem.task__subMenu.task__child__2__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: [
            {
              id: 'quanlylichlamviec',
              MenuTitle: t('menuItem.task__subMenu.task__child__2__subMenu.task__child__2.1__title'),
              LinkTo: '',
              MenuIcon: '',
              SubMenu: []
            }
          ]
        },
        {
          id: 'congvieccanhotro',
          MenuTitle: t('menuItem.task__subMenu.task__child__3__title'),
          LinkTo: '',
          SubMenu: []
        },
        {
          id: 'thongbao',
          MenuTitle: t('menuItem.task__subMenu.task__child__4__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: [
            {
              id: 'xemthongbao',
              MenuTitle: t('menuItem.task__subMenu.task__child__4__subMenu.task__child__4.1__title'),
              LinkTo: '',
              MenuIcon: '',
              SubMenu: []
            },
            {
              id: 'quanlythongbao',
              MenuTitle: t('menuItem.task__subMenu.task__child__4__subMenu.task__child__4.2__title'),
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
      MenuTitle: t('menuItem.news__title'),
      LinkTo: '',
      MenuIcon: <SlidersOutlined />,
      SubMenu: [
        {
          id: 'lichlamviec',
          MenuTitle: t('menuItem.news__subMenu.news__child__1__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: []
        },
        {
          id: 'quanlyduan',
          MenuTitle: t('menuItem.news__subMenu.news__child__2__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: []
        },
        {
          id: 'chungtudientu',
          MenuTitle: t('menuItem.news__subMenu.news__child__3__title'),
          LinkTo: '',
          MenuIcon: '',
          SubMenu: []
        }
      ]
    },
    {
      id: 'nhansu',
      MenuTitle: t('menuItem.humanResource__title'),
      LinkTo: '',
      MenuIcon: <UserOutlined />,
      SubMenu: []
    },
    {
      id: 'cms',
      MenuTitle: t('menuItem.cms__title'),
      LinkTo: '',
      MenuIcon: <SlidersOutlined />,
      SubMenu: []
    },
    {
      id: 'lichhop',
      MenuTitle: t('menuItem.calendar__title'),
      LinkTo: '',
      MenuIcon: <CalendarOutlined />,
      SubMenu: []
    },
    {
      id: 'tailiey',
      MenuTitle: t('menuItem.docs__title'),
      LinkTo: '',
      MenuIcon: <PaperClipOutlined />,
      SubMenu: []
    },
    {
      id: 'elearning',
      MenuTitle: t('menuItem.elearning__title'),
      LinkTo: '',
      MenuIcon: <FormOutlined />,
      SubMenu: []
    },
    {
      id: 'danhmuc',
      MenuTitle: t('menuItem.category__title'),
      LinkTo: '',
      MenuIcon: <UnorderedListOutlined />,
      SubMenu: []
    },
    {
      id: 'hethong',
      MenuTitle: t('menuItem.system__title'),
      LinkTo: '',
      MenuIcon: <WindowsOutlined />,
      SubMenu: []
    },
    {
      id: 'gopy',
      MenuTitle: t('menuItem.feedback__title'),
      LinkTo: '',
      MenuIcon: <EditOutlined />,
      SubMenu: []
    },
    {
      id: 'nguoidung',
      MenuTitle: t('menuItem.users__title'),
      LinkTo: '',
      MenuIcon: <DingdingOutlined />,
      SubMenu: []
    },
    {
      id: 'thumuc',
      MenuTitle: t('menuItem.folder__title'),
      LinkTo: '',
      MenuIcon: <AliwangwangOutlined />,
      SubMenu: []
    },
    {
      id: 'androi',
      MenuTitle: t('menuItem.androi__title'),
      LinkTo: '',
      MenuIcon: <AndroidOutlined />,
      SubMenu: []
    },
    {
      id: 'ios',
      MenuTitle: t('menuItem.ios__title'),
      LinkTo: '',
      MenuIcon: <AppleOutlined />,
      SubMenu: []
    }
  ]
  return { MenuItem }
}

export default useMenuItem
