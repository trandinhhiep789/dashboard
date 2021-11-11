import { Form, Input, Button, Select, Col, Row, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import ElementInputModal from "../../../../common/components/FormContainer/FormElement/ElementInputModal";
import { APIHostName } from "../constants";

class ListShipCoordinatorNew_1Com extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [],
      shipmentOrder: this.props.shipmentOrder,
      shipmentRouteLst: [],
      objDeliverUser: this.props.objDeliverUser,
      objCoordinator: this.props.objCoordinator,
    };

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.handleValueChange1 = this.handleValueChange1.bind(this);
    this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
  }

  componentDidMount() {
    console.log(this.props.carrierPartnerID);
  }

  handleOnValueChange(name, value) {
    let { objCoordinator, objDeliverUser } = this.state;
    objCoordinator[name] = value;
    if (name == "CarrierPartnerID") {
      objDeliverUser = [];
      this.state.shipmentOrder.map((row, indexRow) => {
        if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true) {
          row[name] = value;
          row["ShipmentOrder_DeliverUserList"] = [];
        }
      });
    } else {
      this.state.shipmentOrder.map((row, indexRow) => {
        if (!row.IsCoordinator && row.IsPermission == true) {
          row[name] = value;
        }
      });
    }

    this.setState({
      objCoordinator: objCoordinator,
      objDeliverUser: objDeliverUser,
      shipmentOrder: this.state.shipmentOrder,
    });
  }

  handleValueChange1(e, selectedOption1) {
    let objDeliverUser = [];
    let listStaffDebtObject = [];
    selectedOption1 &&
      selectedOption1.map((item, index) => {
        let objShip_DeliverUser = { UserName: item.value, FullName: item.FullName };
        objDeliverUser.push(objShip_DeliverUser);
        listStaffDebtObject.push({
          UserName: item.value,
          StoreID: this.state.shipmentOrder.length > 0 ? this.state.shipmentOrder[0].CoordinatorStoreID : 0,
        });
      });
    if (selectedOption1) {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
        if (!apiResult.IsError) {
          this.state.shipmentOrder.map((row, indexRow) => {
            if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true && row.CarrierPartnerID <= 0) {
              row["ShipmentOrder_DeliverUserList"] = objDeliverUser;
            }
          });
          this.setState({ selectedOption: selectedOption1, shipmentOrder: this.state.shipmentOrder, shipmentRouteLst: apiResult.ResultObject });
        } else {
          this.props.addNotification(apiResult.Message, apiResult.IsError);
        }
      });
    } else {
      this.setState({ selectedOption: selectedOption1, shipmentRouteLst: [] });
    }
  }

  handleOnValueChangeDeliverUser(name, value, selectedOption) {
    console.log({ name, value, selectedOption });
    let objMultiDeliverUser = [];
    let listStaffDebtObject = [];
    selectedOption &&
      selectedOption.map((item, index) => {
        let objMultiShip_DeliverUser = { UserName: item.value, FullName: item.name };
        objMultiDeliverUser.push(objMultiShip_DeliverUser);
        listStaffDebtObject.push({
          UserName: item.value,
          StoreID: this.state.shipmentOrder[0].CoordinatorStoreID,
        });
      });
    if (selectedOption) {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
        if (!apiResult.IsError) {
          this.state.shipmentOrder.map((row, indexRow) => {
            console.log(row.IsPermission);
            if (row.IsPermission == true && row.CarrierPartnerID > 0) {
              row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser;
            }
          });
          this.setState({ objDeliverUser: value, shipmentOrder: this.state.shipmentOrder, shipmentRouteLst: apiResult.ResultObject });
        } else {
          this.props.addNotification(apiResult.Message, apiResult.IsError);
        }
      });
    } else {
      this.state.shipmentOrder.map((row, indexRow) => {
        if (row.IsPermission == true && row.CarrierPartnerID > 0) {
          row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser;
        }
      });
      this.setState({ objDeliverUser: value, shipmentRouteLst: [] });
    }
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Đối tác:">
                <FormControl.ComboBoxPartner
                  name="CarrierPartnerID"
                  colspan="12"
                  labelcolspan="0"
                  isautoloaditemfromcache={true}
                  loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                  valuemember="PartnerID"
                  nameMember="PartnerName"
                  controltype="InputControl"
                  onChange={this.handleOnValueChange}
                  value={this.state.objCoordinator.CarrierPartnerID}
                  listoption={null}
                  datasourcemember="CarrierPartnerID"
                  placeholder="---Vui lòng chọn---"
                  isMultiSelect={false}
                  disabled={!this.props.isCoordinator}
                />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item label="Phân tuyến:">
                <FormControl.ComboBoxSelect
                  name="CarrierPartnerID"
                  colspan="12"
                  labelcolspan="0"
                  isautoloaditemfromcache={false}
                  controltype="InputControl"
                  listoption={[
                    { label: "Cùng tuyến", value: 1 },
                    { label: "Không cùng tuyến", value: 0 },
                  ]}
                  onValueChangeCustom={this.props.onRouteChange}
                  value={this.props.routeValue ? 1 : 0}
                  datasourcemember="CarrierPartnerID"
                  placeholder="---Vui lòng chọn---"
                  isMultiSelect={false}
                  disabled={!this.props.isCoordinator}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Nhân viên giao:">
                {this.props.carrierPartnerID == -1 || this.props.carrierPartnerID == 0 ? (
                  <MultiSelectComboBox
                    name="ShipmentOrder_DeliverUserList"
                    colspan="12"
                    labelcolspan="0"
                    // label="Nhân viên giao"
                    disabled={!this.props.isUserCoordinator}
                    IsLabelDiv={false}
                    isSelectedOption={true}
                    isautoloaditemfromcache={false}
                    controltype="InputControl"
                    onChange={this.handleValueChange1}
                    value={this.state.selectedOption}
                    listoption={[]}
                    isMultiSelect={true}
                    isPartner={true}
                    datasourcemember="ShipmentOrder_DeliverUserList"
                  />
                ) : (
                  <FormControl.FormControlComboBoxUser
                    name="ShipmentOrder_DeliverUserList"
                    colspan="12"
                    labelcolspan="0"
                    // label="Nhân viên giao"
                    // validatonList={["Comborequired"]}
                    isautoloaditemfromcache={true}
                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                    valuemember="UserName"
                    nameMember="FullName"
                    controltype="InputControl"
                    value={this.state.objDeliverUser}
                    onValueChange={this.handleOnValueChangeDeliverUser}
                    listoption={null}
                    datasourcemember="PartnerID"
                    placeholder="---Vui lòng chọn---"
                    isMultiSelect={true}
                    filterValue={this.state.objCoordinator.CarrierPartnerID}
                    filterobj="PartnerID"
                    disabled={!this.props.isCoordinator}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={11} offset={1} style={{ flex: "none" }}>
              <Form.Item label="Phương tiện:">
                <Radio.Group>
                  <Radio.Button value="a">
                    <i className="fa fa-motorcycle fa-1x"></i> Xe máy
                  </Radio.Button>
                  <Radio.Button value="b" style={{ marginLeft: "10px" }}>
                    <i className="fa fa-truck fa-1x"></i> Xe tải
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {this.props.routeValue === true && (
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Đối tác:">
                  <ElementInputModal.ElementModalComboBox
                    name="CarrierPartnerID"
                    type="ComboBox"
                    caption="Đối tác"
                    onValueChange={this.handleOnValueChange}
                    dataSourcemember="CarrierPartnerID"
                    isautoloaditemfromcache={true}
                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                    valuemember="PartnerID"
                    nameMember="PartnerName"
                    // rowIndex={props.index}
                    // value={props.item.CarrierPartnerID}
                    listoption={null}
                    filterValue="2"
                    filterobj="PartnerTypeID"
                    placeholder="---Chọn đối tác---"
                    isMultiSelect={false}
                    // disabled={isPermission}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item label="Chọn:">
                  <ElementInputModal.ElementModalComboBox
                    name="ShipmentOrder_DeliverUserList"
                    type="ComboUserBox"
                    caption="Nhân viên giao nhận"
                    dataSourcemember="ShipmentOrder_DeliverUserList"
                    isautoloaditemfromcache={true}
                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                    valuemember="UserName"
                    nameMember="FullName"
                    isselectedOp={true}
                    // value={objDeliverUser}
                    value={""}
                    rowIndex={1}
                    listoption={null}
                    // onValueChange={handleOnValueChange}
                    placeholder="---Nhân viên giao nhận---"
                    isMultiSelect={true}
                    // disabled={isPermission}
                    isPartner={true}
                    // filterValue={item.CarrierPartnerID}
                    // filterobj="PartnerID"
                    // filterrest="CarrierPartnerID"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </div>
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
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
    showModal: (type, props) => {
      dispatch(showModal(type, props));
    },
    hideModal: (type, props) => {
      dispatch(hideModal(type, props));
    },
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
  };
};

const ListShipCoordinatorNew_1 = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorNew_1Com);
export default ListShipCoordinatorNew_1;
