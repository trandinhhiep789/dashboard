import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';
export class MapContainer extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            // map: new vbd.Map(mapContainer, mapProp)
        };
    }

    componentDidMount() {
        console.log('MapContainer', this.props);
        const values = this.props.SenderGeoLocation.split(",")
        const v1 = parseFloat(values[0])
        const v2 = parseFloat(values[1])
        const mapContainer = document.getElementById("map-container");
        const mapProp = {
            center: new vbd.LatLng(10.811778780317383, 106.7158178333029),
            maxZoom: 19,
            zoom: 18,
            minZoom: 2,
            registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
            scaleControlOptions: { showScale: true },
            zoomControl: true
        };
        //console.log('this.postData()', this.props.SenderGeoLocation, mapProp);
        let map = new vbd.Map(mapContainer, mapProp);
        var position = map.getCenter()
        var marker = new vbd.Marker({
            position: position
        });
        marker.setMap(map);
        this.setState({
            map: map,
            marker: marker
        })


        // vbd.event.addListener(map, 'click', function (e) {

        //     marker.setPosition(new vbd.LatLng(e.LatLng.Latitude, e.LatLng.Longitude))
        //     //marker.setPosition(e.LatLng);
        // });

        vbd.event.addListener(map, 'click', this.onHandleClick.bind(this))
    }

    onHandleClick = (e) => {
        console.log('onHandleClick', e, this.state.map,  this.state.marker);
        // marker.setPosition(e.LatLng);
        this.state.marker.setPosition(new vbd.LatLng(e.LatLng.Latitude, e.LatLng.Longitude))
        // marker.setMap(this.state.map);

        this.props.onChange(e.LatLng.Latitude, e.LatLng.Longitude)
    }

    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(this.props.SenderGeoLocation) !== JSON.stringify(nextProps.SenderGeoLocation)) {
            const values = nextProps.SenderGeoLocation.split(",")
            const v1 = parseFloat(values[0])
            const v2 = parseFloat(values[1])
            const mapContainer = document.getElementById("map-container");
            const mapProp = {
                center: new vbd.LatLng(v1, v2),
                maxZoom: 19,
                zoom: 12,
                minZoom: 2,
                registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
                scaleControlOptions: { showScale: true },
                zoomControl: true
            };

            let map = new vbd.Map(mapContainer, mapProp);
            var position = map.getCenter()
            var marker = new vbd.Marker({
                position: position
            });
            marker.setMap(map);
        }
    }

    render() {

        return (
            <div id="map-container" style={this.props.classContainerStyle}></div>
        );
    }
}

export default MapContainer;