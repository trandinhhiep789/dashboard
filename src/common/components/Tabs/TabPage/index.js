import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
export default class TabPage extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <li className="nav-item">
                <a className={`nav-link ${this.props.isActive ? 'active show' : ''}`}
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.onClick(this.props.tabIndex);
                    }}>
                    {this.props.title}
                </a>
            </li>
        );

        
    }
}