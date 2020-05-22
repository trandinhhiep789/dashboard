import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        const mapContainer = document.getElementById("map-container");
        const mapProp = {
            center: new vbd.LatLng(10.7964825447845, 106.68550653525),
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

        vbd.event.addListener(map, 'click', function (e) {
            console.log("aa", e.LatLng
            )

            const mapProp1 = {
             center: new vbd.LatLng(e.LatLng.Latitude,e.LatLng.Longitude),
                maxZoom: 13,
                zoom: 12,
                minZoom: 2,
                registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
                scaleControlOptions: { showScale: true },
                zoomControl: true
            };
            console.log("mapProp1",mapProp1)
            const mapContainer1 = document.getElementById("map-container");
            let map1 = new vbd.Map(mapContainer1, mapProp1);
            var position1 = map1.getCenter()
            var marker = new vbd.Marker({
                position: position1
            });
            marker.setMap(map1);
            //  alert("click", map.LatLng);
        });

    }
    render() {

        return (
            <div id="map-container" style={{ width: '100%', height: 600 }}></div>
        );
    }
}

export default MapContainer;