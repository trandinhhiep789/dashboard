import React, { Component } from "react";
import vbd from "../../../../scripts/vietbandomapsapi.js";
import { Button, Modal } from "antd";
import { callGetCache } from "../../../../actions/cacheAction.js";
import { callFetchAPI } from "../../../../actions/fetchAPIAction.js";
import { connect } from "react-redux";
import "../../../../css/ModalVietBanDoShipmentRouteAuto.scss";
import { styled } from "styled-components";

class ModalVietBanDoShipmentRouteAuto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Geometry: "",
    };

    this.handleInit = this.handleInit.bind(this);
  }

  componentDidMount() {
    let lstLocation = this.props.ListShipmentOrder.map((item, index) => {
      if (index == 0) {
        let [Latitude, Longitude] = item.CoordinatorStoreGeo.split(",");
        return { Latitude, Longitude };
      }
      let [Latitude, Longitude] = item.ReceiverGeoLocation.split(",");
      return { Latitude, Longitude };
    });

    this.handleInit(lstLocation);
  }

  handleInit(parmLstLocation) {
    let paramsRequest = {
      // Alternative: 2147483647,
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
          registerKey: "563f09d1-4fb8-4fe6-8307-0effd4e06de4",
          scaleControlOptions: { showScale: true },
          zoomControl: true,
        };
        let map = new vbd.Map(mapContainer, mapProp);
        let templateContent = ({ content, receiverFullAddress, receiverFullName }) => {
          var html = `
          <div class="vContent">
            <span class="vContent_item"><b>${content}</b></span>
            <span class="vContent_item"><b>${receiverFullName}</b></span>
            <span class="vContent_item"><b>${receiverFullAddress}</b></span>
          </div>`;
          return html;
        };
        let content = (index) => {
          let html = `<div style="height: 44px; width: 26px; position: absolute; left: 0; top: 0;">
                <i class="fa fa-map-marker fa-3x" style="position: absolute; left: 0; top: 0; z-index: 999; color: #b71540;">
                    <span style="height: 20px; width: 20px; display: flex; justify-content: center; align-items: center; border-radius: 10px 10px; font-size: 10px; position: absolute; top: 5px; left: 50%; z-index: 9999; transform: translateX(-50%); color: white; background-color: #b71540;">${index}</span>
                </i>
            </div>`;

          return html;
        };

        this.props.ListShipmentOrder.map((item, index) => {
          let location;

          if (index == 0) {
            location = item.CoordinatorStoreGeo.split(",");
          } else {
            location = item.ReceiverGeoLocation.split(",");
          }

          let marker = new vbd.CustomMarker({
            position: new vbd.LatLng(location[0], location[1]),
            content: content(index),
            icon: new vbd.Icon({ size: new vbd.Size(26, 44), anchor: new vbd.Point(14, 42) }),
          });

          // let marker = new vbd.Marker({
          //   position: new vbd.LatLng(Latitude, Longitude),
          // });

          let infoWindow = new vbd.InfoWindow({
            content: templateContent(
              item.ShipmentOrderID == 0
                ? { content: `Kho ${item.CoordinatorStoreID}` }
                : { content: `Vận đơn: ${item.ShipmentOrderID}`, receiverFullAddress: `Địa chỉ người nhận: ${item.ReceiverFullAddress}`, receiverFullName: `Tên người nhận: ${item.ReceiverFullName}` }
            ),
          });

          vbd.event.addListener(marker, "click", function (param) {
            infoWindow.open(map, marker);
          });

          map.addMarker(marker);
          map.zoomFit();

          let polyline = new vbd.Polyline({
            path: objResult.Value.Routes[0].Geometry,
            strokeOpacity: 2,
            strokeWidth: 2,
          });

          polyline.setMap(map);
        });
      }
    });
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Modal
        className="ant-modal-vietbando"
        visible={true}
        centered={true}
        width="90vw"
        closable={false}
        onCancel={(event) => this.handleClose()}
        title={<span className="ant-modal-header-title">Bản đồ</span>}
        footer={[
          <Button key="1" onClick={(event) => this.handleClose()}>
            Đóng
          </Button>,
        ]}
      >
        <div id="map-container" style={{ height: "70vh", width: "100%", position: "relative" }}>
          {/* <div
            style={{ height: "300px", width: "250px", position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", backgroundColor: "#fad390", zIndex: 999999, opacity: 0.6 }}
          ></div> */}
        </div>
      </Modal>
    );
  }
}

ModalVietBanDoShipmentRouteAuto.defaultProps = {
  ListShipmentOrder: [],
};

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
