import React, { Component, PropTypes } from 'react';
export default class Col extends Component {
    
    constructor(props)
    {
        super(props);
    }
    static defaultProps = {
        componenttype: 'Col'
      }

    render()
    {
        //lg="8" md="12" sm="12" xs="12"
        let className = "";
        className += this.props.xs == null ? "" : " col-" + this.props.xs;
        className += this.props.sm == null ? "" : " col-sm-" + this.props.sm;
        className += this.props.md == null ? "" : " col-md-" + this.props.md;
        className += this.props.lg == null ? "" : " col-lg-" + this.props.lg;
        className += this.props.xl == null ? "" : " col-xl-" + this.props.xl;
        className = className.trim();
        if(className.length == 0)
            className = "col";

        return <div className={className}>{this.props.children}</div>;
    }
}