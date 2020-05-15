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

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
        this.mapClicked = this.mapClicked.bind(this)
        this.state = {

        };
    }
    componentDidMount() {
        console.log("1111", this.props)
    }

    mapClicked(mapProps, map, clickEvent) {
        console.log('click', mapProps, map, clickEvent)
        const { latLng } = clickEvent;
        const latitude = clickEvent.latLng.lat();
        const longitude = clickEvent.latLng.lng();
        console.log("aaa", latitude + ", " + longitude);
    }

    onMarkerClick(props, marker, e) {
        console.log('onMarkerClick', e.latLng)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(mapProps, map, clickEvent) {
        console.log('onMapClicked', clickEvent)

    }

    render() {

        let styleMap;
        if (this.props.classStyle == undefined) {
            styleMap = style;
        }
        else {
            styleMap = this.props.classStyle;
        }
        let styleContainerMap;
        if (this.props.classContainerStyle == undefined) {
            styleContainerMap = containerStyle;
        }
        else {
            styleContainerMap = this.props.classContainerStyle;
        }
        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={styleMap}
                containerStyle={styleContainerMap}
                className={'map'}
                draggable={true}
                initialCenter={{
                    lat: 10.845199873795655,
                    lng: 106.7979896460848
                }}
                onClick={this.mapClicked}
            >
                <Marker
                    name={'Your position'}
                    position={{
                        lat: 10.845199873795655,
                        lng: 106.7979896460848
                    }}
                />
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB9GyrpAzbcozoo1DDQ0nr29X67YLkQuPQ'),
    LoadingContainer: LoadingContainer
})(MapContainer)