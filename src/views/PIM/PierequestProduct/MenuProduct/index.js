import React from "react";
import { NavLink } from "react-router-dom";
import menuItemProduct from "./constants/index.js";

export default class  MenuProductCom extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="col-md-3 col-lg-2 sidebar-left">
                <ul className="nav nav-pills flex-column">
                    {
                        
                        menuItemProduct.map((MenuItem) => {
                            return (
                                <li className="nav-item" key={MenuItem.MenuName}>
                                    <NavLink activeClassName="active" className="nav-link" to={MenuItem.LinkTo + "/"+this.props.PieRequestID + "/"+ this.props.PieRequestListID} >{MenuItem.MenuTitle}</NavLink>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

