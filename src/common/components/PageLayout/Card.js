import React, { Component, PropTypes } from 'react';
export default class Card extends Component {
    static defaultProps = {
        componenttype: 'Card'
      }
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div className="card">
            <header className="card-header">
              <h6 className="card-title card-title-bold">{this.props.CardTitle}</h6>
            </header>

            <div className="card-body">
            {this.props.children}
            </div>
          </div>
        );

        
    }
}