import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import AppMenu from '../../common/constants/AppMenu';
import Media from "react-media";

export default function TopMenu() {
    return (
        <ul className="menu">
            {
                AppMenu.map((MenuItem) => {
                    if (MenuItem.SubMenu.length > 0) {
                        return (
                            <li className="menu-item" key={MenuItem.MenuName} >
                                <Link className="menu-link item" to="#">{MenuItem.MenuTitle}</Link>
                                <ul className="menu-submenu">
                                    {
                                        MenuItem.SubMenu.map((SubMenuItem) => {
                                            if (SubMenuItem.SubMenu.length > 0) {
                                                return (
                                                    <li className="menu-item" key={SubMenuItem.MenuName} >
                                                        <Link className="menu-link item-link" to="#">{SubMenuItem.MenuTitle}</Link>
                                                        <ul className="menu-sub-submenu">
                                                            {
                                                                SubMenuItem.SubMenu.map((SubMenuItem2) => {

                                                                    if (SubMenuItem2.SubMenu.length > 0) {
                                                                        return (
                                                                            <li className="menu-item" key={SubMenuItem2.MenuName}>
                                                                                <Link className="menu-link item-link" to={SubMenuItem2.LinkTo}>{SubMenuItem2.MenuTitle}</Link>
                                                                                {SubMenuItem2.SubMenu &&
                                                                                    < ul className="menu-sub-sub-menu">
                                                                                        {
                                                                                            SubMenuItem2.SubMenu.map((SubMenuItem3) =>
                                                                                                (
                                                                                                    <li className="menu-item" key={SubMenuItem3.MenuName}>
                                                                                                        <Link className="menu-link" to={SubMenuItem3.LinkTo}>{SubMenuItem3.MenuTitle}</Link>
                                                                                                    </li>
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                    </ul>
                                                                                }
                                                                            </li>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <li className={"menu-item " + (SubMenuItem2.GroupMenu)} key={SubMenuItem2.MenuName}>
                                                                            <Link className="menu-link" to={SubMenuItem2.LinkTo}>{SubMenuItem2.MenuTitle}</Link>
                                                                        </li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                );

                                            }
                                            return (
                                                <li className="menu-item" key={SubMenuItem.MenuName}>
                                                    <Link className="menu-link" to={SubMenuItem.LinkTo}>{SubMenuItem.MenuTitle}</Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        );
                    }
                    return (
                        <li className="menu-item menu1" key={MenuItem.MenuName}>
                            <Link className="menu-link" to={MenuItem.LinkTo}>{MenuItem.MenuTitle}</Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}