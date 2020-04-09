import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
export default class TabPage extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.tabIndex, this.props.searchAPIPath, this.props.addAPIPath, this.props.updateAPIPath, this.props.deleteAPIPath, this.props.name)
    }

    render() {
        return (
            <li className="nav-item">
                <a className={`nav-link ${this.props.isActive ? 'active show' : ''}`}
                    onClick={this.handleClick}
                >
                    {this.props.title}
                </a>
            </li>
        );
    }
}