import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';


class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        const mapContainer = document.getElementById("map-container");
        let srtlat, srtlng;
        let srtlat2, srtlng2;
        srtlat = 10.811778780317383;
        srtlng = 106.7158178333029;
        srtlat2 = 10.812048003010133;
        srtlng2 = 106.71751676125675;
        var position = new vbd.LatLng(srtlat, srtlng); /*vị trí của marker trên map*/
        var positioncustomer = new vbd.LatLng(srtlat2, srtlng2); /*vị trí của marker trên map*/
        var size = new vbd.Size(24, 34);
        const mapProp = {
            center: new vbd.LatLng(10.811778780317383, 106.7158178333029),
            maxZoom: 19,
            zoom: 18,
            minZoom: 2,
            registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
            scaleControlOptions: { showScale: true },
            zoomControl: true
        };
        let map = new vbd.Map(mapContainer, mapProp);

        var marker = new vbd.Marker({
            position: position,

        });

        var marker2 = new vbd.Marker({
            position: positioncustomer,
        });

        marker.setMap(map);
        marker2.setMap(map);

        var arrPath = [position, positioncustomer];
        var polyline = new vbd.Polyline({ path: arrPath, strokeOpacity: 0.8, strokeWidth: 5 });
        polyline.setMap(map);
    }

    render() {
        return (
            <div id="map-container" style={{ width: '100%', height: 600 }}></div>
        );
    }
}

export default Maps;