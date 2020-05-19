import React, { Component } from "react";
import vbd from '../../../../scripts/vietbandomapsapi.js';

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        //   body: JSON.stringify(data), // must match 'Content-Type' header
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, same-origin, *omit
        //   withCredentials: true,
        Address: '',
        Method: '',
        headers: {
            // 'user-agent': 'Mozilla/4.0 MDN Example',
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            'RegisterKey': 'c1602ab5-74da-473c-9601-aa53a2a4505e'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, cors, *same-origin
        //   redirect: 'follow', // manual, *follow, error
        //   referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
}

class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    async  componentDidMount() {
        window.initialize()

        let data = { "Alternative": 2147483647, "Distance": true, "Duration": true, "Geometry": true, "Instructions": true, "Points": [{ "Latitude": 11.058473039992307, "Longitude": 106.63055419921875 }, { "Latitude": 10.842747549833462, "Longitude": 106.61407470703125 }], "RouteCriteria": 0, "Uturn": true, "VehicleType": 3 }


        let _header = {
            'user-agent': 'Mozilla/4.0 MDN Example',
            // 'RegisterKey': '348ffe19-4514-4972-b650-a80dc5d47265'
        }
        if (!(data instanceof FormData)) {
            _header['Content-Type'] = 'application/json; charset=UTF-8"';
            _header['Accept'] = 'application/json; charset=UTF-8"';
            _header['RegisterKey'] = '348ffe19-4514-4972-b650-a80dc5d47265';
            data = JSON.stringify({ "Alternative": 2147483647, "Distance": true, "Duration": true, "Geometry": true, "Instructions": true, "Points": [{ "Latitude": 11.058473039992307, "Longitude": 106.63055419921875 }, { "Latitude": 10.842747549833462, "Longitude": 106.61407470703125 }], "RouteCriteria": 0, "Uturn": true, "VehicleType": 3 })
        }

        fetch("http://developers.vietbando.com/V2/service/PartnerPortalService.svc/rest/ViaRoute", {
            body: data, // must match 'Content-Type' header
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, same-origin, *omit
            // withCredentials: true,
            headers: _header,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response => {
            console.log(response);
        }); // parses response to JSON



        // const response = await fetch('http://developers.vietbando.com/V2/Service/PartnerPortalService.svc/rest/ViaRoute', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'no-cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'registerkey': '348ffe19-4514-4972-b650-a80dc5d47265'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify(data) // body data type must match "Content-Type" header
        // });
        // console.log(response)
    }



    render() {

        return (
            <div className="main-container" style={{ overflow: 'hidden' }}>
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
            </div>
        );
    }
}

export default Maps;