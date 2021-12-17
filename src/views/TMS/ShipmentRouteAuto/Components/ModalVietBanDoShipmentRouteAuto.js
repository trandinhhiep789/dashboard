import React, { Component } from "react";
import vbd from "../../../../scripts/vietbandomapsapi.js";
import { Button, Modal } from "antd";
import { callGetCache } from "../../../../actions/cacheAction.js";
import { callFetchAPI } from "../../../../actions/fetchAPIAction.js";
import { connect } from "react-redux";
import "../../../../css/ModalVietBanDoShipmentRouteAuto.scss";

class ModalVietBanDoShipmentRouteAuto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Geometry: "",
    };

    this.handleGetGeometry = this.handleGetGeometry.bind(this);
  }

  componentDidMount() {
    let lstLocation = this.props.ListShipmentOrder.map((item) => {
      let [Latitude, Longitude] = item.split(",");
      return { Latitude, Longitude };
    });

    this.handleInit(lstLocation);
  }

  handleInit(parmLstLocation) {
    let paramsRequest = {
      Alternative: 2147483647,
      Distance: true,
      Duration: true,
      Geometry: true,
      Instructions: true,
      Points: parmLstLocation,
      RouteCriteria: 0,
      Uturn: true,
      VehicleType: 2,
    };

    this.props.callFetchAPI("TMSAPI", "api/Maps/FindPathViaRoute", paramsRequest).then((apiResult) => {
      if (!apiResult.IsError) {
        let objResult = JSON.parse(apiResult.ResultObject);

        this.setState({
          Geometry: objResult.Value.Routes[0].Geometry,
        });

        const mapContainer = document.getElementById("map-container");

        const mapProp = {
          maxZoom: 19,
          minZoom: 2,
          zoom: 5,
          registerKey: "563f09d1-4fb8-4fe6-8307-0effd4e06de4",
          scaleControlOptions: { showScale: true },
          zoomControl: true,
        };

        let map = new vbd.Map(mapContainer, mapProp);
        let templateContent = (content) => {
          var html = `<div class="vContent"><span>${content}</span></div>`;
          return html;
        };

        map.zoomFit();
        map.setZoom(13);

        this.props.ListShipmentOrder.map((item, index) => {
          const {
            ReceiverGeoLocation: [Latitude, Longitude],
            ShipmentOderID,
          } = item;

          let marker = new vbd.Marker({
            position: new vbd.LatLng(Latitude, Longitude),
          });

          let infoWindow = new vbd.InfoWindow({ content: templateContent(`Vận đơn ${ShipmentOderID}`) });
          infoWindow.open(map, marker);

          vbd.event.addListener(marker, "click", function (param) {
            infoWindow.open(map, marker);
          });

          map.addMarker(marker);

          var polyline = new vbd.Polyline({
            path: objResult.Value.Routes[0].Geometry,
            strokeOpacity: 6,
            strokeWidth: 2,
          });

          polyline.setMap(map);
        });
      }
    });
  }

  handleClose(){
      if(this.props.onClose){
          this.props.onClose();
      }
  }

  render() {
    return (
      <Modal
        title="Bản đồ"
        visible={true}
        footer={[
          <Button key="1" onClick={(event) => this.handleClose()}>
              Đống
          </Button>,
        ]}
        centered={true}
        width="80vw"
      >
        <div id="map-container" style={{ height: "60vh", width: "100%" }}></div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalVietBanDoShipmentRouteAuto);
