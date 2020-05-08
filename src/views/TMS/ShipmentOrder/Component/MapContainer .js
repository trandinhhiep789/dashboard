import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const style = {
    width: '100%',
    height: '100%'
  }

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
            />

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB9GyrpAzbcozoo1DDQ0nr29X67YLkQuPQ')
})(MapContainer)