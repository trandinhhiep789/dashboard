import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
   //  console.log('this.postData()',this.postData());
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
                center: new vbd.LatLng(e.LatLng.Latitude, e.LatLng.Longitude),
                maxZoom: 13,
                zoom: 12,
                minZoom: 2,
                registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
                scaleControlOptions: { showScale: true },
                zoomControl: true
            };
            console.log("mapProp1", mapProp1)
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

    postData(url, data) {
        const datat={"Keyword":"bình tân " };
        // Default options are marked with *
        return fetch('http://developers.vietbando.com/V2/service/PartnerPortalService.svc/rest/AutoSuggestSearch', {
            body: JSON.stringify(datat), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            withCredentials: true,
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'registerKey':'c1602ab5-74da-473c-9601-aa53a2a4505e'

            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => response.json()) // parses response to JSON
    }


    render() {

        return (
            <div id="map-container" style={{ width: '100%', height: 600 }}></div>
        );
    }
}

export default MapContainer;