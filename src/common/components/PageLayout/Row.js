import React, { Component, PropTypes } from 'react';
export default class Row extends Component {
    
    constructor(props)
    {
        super(props);
    }
    static defaultProps = {
        componenttype: 'Row'
      }
      
    render()
    {
        return <div className="row">{this.props.children}</div>;
    }
}