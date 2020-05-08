import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';

const style = {
    width: '100%',
    height: '100%',
    position: 'relative'
}

const containerStyle = {
    position: 'absolute',
    width: '98%',
    height: '80%'
}

export class MapContainer extends Component {
    render() {
        console.log("map",this.props)
        const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
          ]
          let styleMap;
          if(this.props.classStyle ==undefined){
            styleMap = style;
          }
          else{
            styleMap = this.props.classStyle;
          }
          let styleContainerMap;
          if(this.props.classContainerStyle ==undefined){
            styleContainerMap = containerStyle;
          }
          else{
            styleContainerMap = this.props.classContainerStyle;
          }
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={styleMap}
                containerStyle={styleContainerMap}
                className={'map'}
            >
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{ lat: 37.778519, lng: -122.405640 }} />
                <Marker
                    name={'Dolores park'}
                    position={{ lat: 37.759703, lng: -122.428093 }} />
                <Marker />
               
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB9GyrpAzbcozoo1DDQ0nr29X67YLkQuPQ')
})(MapContainer)