import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {


        const values = this.props.SenderGeoLocation.split(",")
        const v1 = parseFloat(values[0])
        const v2 = parseFloat(values[1])
        const mapContainer = document.getElementById("map-container");
        const mapProp = {
            center: new vbd.LatLng(10.810357741551101,106.71305029651373),
            maxZoom: 19,
            zoom: 18,
            minZoom: 2,
            registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
            scaleControlOptions: { showScale: true },
            zoomControl: true
        };
        console.log('this.postData()', this.props.SenderGeoLocation, mapProp);
        let map = new vbd.Map(mapContainer, mapProp);
        var position = map.getCenter()
        var marker = new vbd.Marker({
            position: position
        });
        marker.setMap(map);

        vbd.event.addListener(map, 'click', function (e) {
          //  this.SenderGeoLocation(e.LatLng.Latitude, e.LatLng.Longitude);
          console.log('this.postData()', e.LatLng.Latitude, e.LatLng.Longitude);
            const mapProp1 = {
                center: new vbd.LatLng(e.LatLng.Latitude, e.LatLng.Longitude),
                maxZoom: 19,
                zoom: 18,
                minZoom: 2,
                registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
                scaleControlOptions: { showScale: true },
                zoomControl: true
            };
       
            let map1 = new vbd.Map(mapContainer, mapProp1);
            var position1 = map1.getCenter()
            var marker = new vbd.Marker({
                position: position1
            });
            marker.setMap(map1);
            
        });

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
            <div id="map-container" style={{ width: '100%', height: 600 }}></div>
        );
    }
}

export default MapContainer;