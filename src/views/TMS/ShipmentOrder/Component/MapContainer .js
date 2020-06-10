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
        const values = this.props.SenderGeoLocation.split(",")
        let v1 = 10.852982;
        let v2 = 106.794835;
        if (this.props.SenderGeoLocation != "") {
            v1 = parseFloat(values[0])
            v2 = parseFloat(values[1])
        }

        const mapContainer = document.getElementById("map-container");
        const mapProp = {
            center: new vbd.LatLng(v1, v2),
            maxZoom: 19,
            zoom: 15,
            minZoom: 2,
            registerKey: "6a50ea65-8dd9-4c03-aa6e-6c839b611eea",
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
        if (this.props.isGeoLocation) {
            this.state.marker.setPosition(new vbd.LatLng(e.LatLng.Latitude, e.LatLng.Longitude))
            this.props.onChange(this.props.name, e.LatLng.Latitude, e.LatLng.Longitude)
        }

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
                zoom: 8,
                minZoom: 2,
                registerKey: "6a50ea65-8dd9-4c03-aa6e-6c839b611eea",
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