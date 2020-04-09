import React from "react";
import {Link} from "react-router-dom";
import { Menu, Icon } from 'antd';
import AppMenu from '../../common/constants/AppMenu';
const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;
export default class MainMenu extends React.Component
{
    render()
    {
    return(
        <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '56px' }}
        inlineIndent = "5"
      >
       {
          AppMenu.map((MenuItem) => {
            
            if(MenuItem.SubMenu.length > 0)
            {
              return (<SubMenu key={MenuItem.MenuName} title={MenuItem.MenuTitle}>
                {
                    MenuItem.SubMenu.map((SubMenuItem) =>
                    {
                      if(SubMenuItem.SubMenu.length > 0)
                      {
                        return (<SubMenu key={SubMenuItem.MenuName} title={SubMenuItem.MenuTitle}>
                        {
                          SubMenuItem.SubMenu.map((SubMenuItem2) =>
                          (<Menu.Item key={SubMenuItem2.MenuName}><Link to={SubMenuItem2.LinkTo}>{SubMenuItem2.MenuTitle}</Link>
                        </Menu.Item>)
                        )
                        }
                         </SubMenu>);

                        
                      }
                      return (<Menu.Item key={SubMenuItem.MenuName}><Link to={SubMenuItem.LinkTo}>{SubMenuItem.MenuTitle}</Link>
                        </Menu.Item>);
                    }
                  )
                }
                </SubMenu>);
            }
            return (<Menu.Item key={MenuItem.MenuName}><Link to={MenuItem.LinkTo}>{MenuItem.MenuTitle}</Link>
            </Menu.Item>);
          }
           
          

          )
        }
        
        
      </Menu>
    );
}
}