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
        let Geometry="";
        const Points = [{
            "Latitude": 10.780683826609504,
            "Longitude": 106.73606586482492
        },
        {
            "Latitude": 10.787795778917115,
            "Longitude": 106.76496505868272
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

     
        const mapProp = {
            center: new vbd.LatLng(10.780683826609504, 106.73606586482492),
            maxZoom: 19,
            zoom: 14,
            minZoom: 2,
            registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
            scaleControlOptions: { showScale: true },
            zoomControl: true
        };
        let map = new vbd.Map(mapContainer, mapProp);

        this.props.callFetchAPI(APIHostName, 'api/Maps/FindPathViaRoute', paramsRequest).then((apiResult) => {
            if (!apiResult.IsError) {
                Geometry=JSON.parse(apiResult.ResultObject).Value.Routes[0].Geometry;
                var polyline = new vbd.Polyline({
                    path:Geometry,
                     strokeOpacity: 6, 
                     strokeWidth: 6
                      
                    });
                polyline.setMap(map);
            }
        });
    


      
    }

    render() {
        return (
            <div id="map-container" style={{ width: '100%', height: 600 }}></div>
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


const Maps = connect(mapStateToProps, mapDispatchToProps)(MapsCom);
export default Maps;
