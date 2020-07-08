import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";
class MapsCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

        let SenderGeoLocation = this.props.SenderGeoLocation.split(",")
        let ReceiverGeoLocation = this.props.ReceiverGeoLocation.split(",")
        const LatitudeSender = parseFloat(SenderGeoLocation[0]);
        const LongitudeSender = parseFloat(SenderGeoLocation[1]);

        const LatitudeReceiver = parseFloat(ReceiverGeoLocation[0]);
        const LongitudeReceiver = parseFloat(ReceiverGeoLocation[1]);

        var position = new vbd.LatLng(LatitudeSender, LongitudeSender); /*vị trí của marker trên map*/
        var positioncustomer = new vbd.LatLng(LatitudeReceiver, LongitudeReceiver); /*vị trí của marker trên map*/

        let Geometry = "";
        const Points = [{
            "Latitude": LatitudeSender,
            "Longitude": LongitudeSender
        },
        {
            "Latitude": LatitudeReceiver,
            "Longitude": LongitudeReceiver,
        }];

        let paramsRequest = {
            "Alternative": 2147483647,
            "Distance": true,
            "Duration": true,
            "Geometry": true,
            "Instructions": true,
            "Points": Points,
            "RouteCriteria": 0,
            "Uturn": true,
            "VehicleType": 2
        };
        const mapContainer = document.getElementById("map-container");
        /// registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b,6a50ea65-8dd9-4c03-aa6e-6c839b611eea/563f09d1-4fb8-4fe6-8307-0effd4e06de4",

        const mapProp = {
            center: new vbd.LatLng(LatitudeSender, LongitudeSender),
            maxZoom: 19,
            zoom: 15,
            minZoom: 2,
            registerKey: "6a50ea65-8dd9-4c03-aa6e-6c839b611eea",
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
        var polyline = new vbd.Polyline({
            path: this.props.Geometry,
            strokeOpacity: 6,
            strokeWidth: 6

        });
        polyline.setMap(map);

        // this.props.callFetchAPI(APIHostName, 'api/Maps/FindPathViaRoute', paramsRequest).then((apiResult) => {
        //     if (!apiResult.IsError) {
        //         Geometry=JSON.parse(apiResult.ResultObject).Value.Routes[0].Geometry;
        //         var polyline = new vbd.Polyline({
        //             path:Geometry,
        //              strokeOpacity: 6, 
        //              strokeWidth: 6

        //             });
        //         polyline.setMap(map);
        //     }
        // });




    }

    render() {
        return (
            <div id="map-container"  style={this.props.classContainerStyle}></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


export default MapsCom;
