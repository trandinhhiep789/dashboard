import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';


class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        // const values = this.props.SenderGeoLocation.split(",")
        // const v1 = parseFloat(values[0])
        // const v2 = parseFloat(values[1])
        const mapContainer = document.getElementById("map-container");
        const mapProp = {
            center: new vbd.LatLng(10.852526000673762, 106.66059494018555),
            maxZoom: 19,
            zoom: 18,
            minZoom: 2,
            registerKey: "7f65a9df-4910-434d-b2ce-5cf7d783ad8b",
            scaleControlOptions: { showScale: true },
            zoomControl: true
        };

        let map = new vbd.Map(mapContainer, mapProp);
        vbd.event.addListener(map, 'click', function (p) {
            console.log('aa', p);
            //alert("click");
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

        })
    }
    
    render() {
        return (
            <div className="main-container" style={{ overflow: 'hidden' }} >
                <div id="guide-container">
                    <div id="myDIV" className="header">
                        <input type="text" id="myFrom" placeholder="From..." />
                        <input type="text" id="myTo" placeholder="To..." />

                        <label htmlFor="vehicleType">Vehicle Type</label>
                        <select id="vehicleType" name="vehicleType" defaultValue={3}>
                            <option value="0">Đi bộ</option>
                            <option value="1">Xe đạp</option>
                            <option value="2">Xe máy</option>
                            <option value="3">Xe hơi</option>
                            <option value="4">{`Xe thương mại hạng nhẹ(<= 3,5 tấn)`}</option>
                            <option value="5">Xe chở hàng nặng(> 3, 5 tấn), như xe tải</option>
                            <option value="6">{`Xe siêu tải(<= 44 tấn)`}</option>
                            <option value="7">Xe tải đường bộ loại B</option>
                            <option value="8">Xe tải đường bộ nói chung</option>
                            <option value="9">Xe dịch vụ công cộng(như xe buýt, xe khách...)</option>
                            <option value="10">Các loại xe khẩn cấp như xe cứu thương, xe cứu hỏa, xe cảnh sát...</option>
                        </select>
                    </div>

                    <ul id="mySteps" className="steps"></ul>
                </div>
                <div id="map-container" style={{ width: '100%', height: 600 }}></div>
            </div >
        );
    }
}

export default Maps;