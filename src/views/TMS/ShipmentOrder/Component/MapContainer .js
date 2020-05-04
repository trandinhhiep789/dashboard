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
    apiKey: ('AIzaSyAINUe2fRGjwR9ilVnUYDzi_8_0l1-MJ-A')
})(MapContainer)