import { Form, Input, Button, Select, Col, Row, Radio, Space } from "antd";
import React from "react";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";

export default function ListShipCoordinatorNew_1(props) {
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
                // onChange={this.handleOnValueChange}
                // value={this.state.objCoordinator.CarrierPartnerID}
                listoption={null}
                datasourcemember="CarrierPartnerID"
                placeholder="---Vui lòng chọn---"
                isMultiSelect={false}
                // disabled={!this.props.IsCoordinator}
              />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="Cùng tuyến:">
              <FormControl.ComboBoxSelect
                name="CarrierPartnerID"
                colspan="12"
                labelcolspan="0"
                isautoloaditemfromcache={false}
                controltype="InputControl"
                listoption={[
                  { label: "Phân tuyến", value: "1" },
                  { label: "Không phân tuyến", value: "2" },
                ]}
                value="1"
                datasourcemember="CarrierPartnerID"
                placeholder="---Vui lòng chọn---"
                isMultiSelect={false}
                // disabled={!this.props.IsCoordinator}
              />
            </Form.Item>
          </Col>
          {/* <Col span={7} offset={1} style={{ flex: "none" }}>
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
          </Col> */}
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Nhân viên giao:">
              {props.CarrierPartnerID == -1 || props.CarrierPartnerID == 0 ? (
                <MultiSelectComboBox
                  name="ShipmentOrder_DeliverUserList"
                  colspan="12"
                  labelcolspan="0"
                  label="Nhân viên giao"
                  //   disabled={!this.props.IsUserCoordinator}
                  IsLabelDiv={false}
                  isSelectedOption={true}
                  isautoloaditemfromcache={false}
                  controltype="InputControl"
                  //   onChange={this.handleValueChange1}
                  //   value={this.state.selectedOption}
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
                  label="Nhân viên giao"
                  validatonList={["Comborequired"]}
                  isautoloaditemfromcache={true}
                  loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                  valuemember="UserName"
                  nameMember="FullName"
                  controltype="InputControl"
                  //   value={this.state.objDeliverUser}
                  //   onValueChange={this.handleOnValueChangeDeliverUser}
                  listoption={null}
                  datasourcemember="PartnerID"
                  placeholder="---Vui lòng chọn---"
                  isMultiSelect={true}
                  //   filterValue={this.state.objCoordinator.CarrierPartnerID}
                  filterobj="PartnerID"
                  //   disabled={!this.props.IsCoordinator}
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
      </Form>
    </div>
  );
}
