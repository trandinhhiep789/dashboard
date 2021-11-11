import React, { Component, useState } from "react";

import ElementInputModal from "../../../../common/components/FormContainer/FormElement/ElementInputModal";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { Button, Checkbox, Input, Space } from "antd";

//#region PropTypes

ListShipCoordinatorNewDetail.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isPermission: PropTypes.bool,
  carrierTypeCss: PropTypes.string,
  carrierTypeTruncCss: PropTypes.string,
  shipmentOrder: PropTypes.array,
  listOption: PropTypes.array,
  handleOnValueChange: PropTypes.func,
  handleChangeOder: PropTypes.func,
  handleDeleteID: PropTypes.func,
  handleChangeCourse: PropTypes.func,
};

//#endregion

export default function ListShipCoordinatorNewDetail(props) {
  //#region Variable

  const { item, index, listOption, isPermission, shipmentOrder, carrierTypeTruncCss, carrierTypeCss, handleOnValueChange, handleChangeOder, handleDeleteID, handleChangeCourse } = props;

  //#endregion

  //#region State

  const [isShowDescription, setIsShowDescription] = useState(false);

  const [contentDescription, setContentDescription] = useState("");

  //#endregion

  //#region Function

  const handleSubmit = () => {};

  const genCommentTime = (dates) => {
    const date = new Date(Date.parse(dates));
    let hour = date.getHours();
    let minute = date.getMinutes();
    let timeDisplay = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
    return timeDisplay;
  };

  //#endregion

  //#region Render

  return (
    <div>
      <div>
        <tr key={index} className="jsgrid-row">
          <td className="jsgrid-cell high-priority" style={{ width: "3%", verticalAlign: "middle" }}>
            {props.objCoordinator.IsRoute === false && <Checkbox checked />}
          </td>
          <td
            className="jsgrid-cell group-products"
            style={{ width: props.objCoordinator.IsRoute === false ? "48%" : "92%" }}
            onClick={() => {
              setIsShowDescription(!isShowDescription);
            }}
          >
            <ul>
              <li className="item infoOder">
                <span className="nameOrder">
                  <Link className="linktext blank" target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                    {item.ShipmentOrderID}{" "}
                  </Link>
                </span>
                {item.ActualDeliveryDate == null ? (
                  <span className="badge badge-warning time">
                    <i className="ti ti-timer"></i> {item.ExpectedDeliveryDate != null ? genCommentTime(item.ExpectedDeliveryDate) : ""}
                  </span>
                ) : (
                  <span className="badge badge-warning time">
                    <i className="ti ti-timer"></i> {item.ShipmentOrderStatusName}
                  </span>
                )}
              </li>
              <li className="item infoProduict">
                <span data-tip data-for={item.ShipmentOrderID} data-id={item.ShipmentOrderID}>
                  {item.PrimaryShipItemName}
                </span>
                <ReactTooltip id={item.ShipmentOrderID} type="warning">
                  <span>{item.ShipItemNameList}</span>
                </ReactTooltip>
              </li>
              {/* <li className="item delivery-status">
                <div className="item group-status">
                  {isPermission == false ? (
                    <span className={carrierTypeCss} onClick={handleChangeCourse(1, index)}>
                      <i className="fa fa-motorcycle"></i> Xe máy
                    </span>
                  ) : (
                    <span className={carrierTypeCss}>
                      <i className="fa fa-motorcycle fffff"></i> Xe máy
                    </span>
                  )}
                  {isPermission == false ? (
                    <span className={carrierTypeTruncCss} onClick={handleChangeCourse(2, index)}>
                      <i className="fa fa-truck"></i> Xe tải
                    </span>
                  ) : (
                    <span className={carrierTypeTruncCss}>
                      <i className="fa fa-truck fff"></i> Xe tải
                    </span>
                  )}
                </div>
                <div className="item group-cod">
                  <span className="badge badge-secondary badge-active">
                    <i className="fa fa-dollar"></i> {formatMoney(item.TotalCOD, 0)}đ
                  </span>
                </div>
              </li> */}
            </ul>
          </td>
          {props.objCoordinator.IsRoute === false ? (
            <td className="jsgrid-cell group-controll" style={{ width: "44%" }}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <ElementInputModal.ElementModalComboBox
                    name="CarrierPartnerID"
                    type="ComboBox"
                    caption="Đối tác"
                    onValueChange={handleOnValueChange}
                    dataSourcemember="CarrierPartnerID"
                    isautoloaditemfromcache={true}
                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                    valuemember="PartnerID"
                    nameMember="PartnerName"
                    rowIndex={index}
                    value={item.CarrierPartnerID}
                    listoption={null}
                    filterValue="2"
                    filterobj="PartnerTypeID"
                    placeholder="---Chọn đối tác---"
                    isMultiSelect={false}
                    disabled={isPermission}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  {item.CarrierPartnerID > 0 ? (
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
                      value={objDeliverUser}
                      rowIndex={index}
                      listoption={null}
                      onValueChange={handleOnValueChange}
                      placeholder="---Nhân viên giao nhận---"
                      isMultiSelect={true}
                      disabled={isPermission}
                      isPartner={true}
                      filterValue={item.CarrierPartnerID}
                      filterobj="PartnerID"
                      filterrest="CarrierPartnerID"
                    />
                  ) : (
                    <ElementInputModal.MultiUserComboBox
                      name="ShipmentOrder_DeliverUserList"
                      type="ComboUserBox"
                      caption="Nhân viên giao nhận"
                      dataSourcemember="ShipmentOrder_DeliverUserList"
                      isautoloaditemfromcache={false}
                      loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                      valuemember="UserName"
                      nameMember="FullName"
                      rowIndex={index}
                      listoption={listOption}
                      value={listOption}
                      onValueChange={handleOnValueChange}
                      placeholder="---Nhân viên giao nhận---"
                      isMultiSelect={true}
                      disabled={isPermission}
                      isPartner={true}
                      filterValue="-1"
                      filterobj="PartnerID"
                      filterrest="CarrierPartnerID"
                    />
                  )}
                </div>
              </div>
            </td>
          ) : (
            <div></div>
          )}
          <td className="jsgrid-cell " style={{ width: "5%" }}>
            <div className="group-action">
              {shipmentOrder.length > 1 ? (
                <a onClick={handleChangeOder(index, -1)} className="table-action hover-danger item-action">
                  <i className="ti-angle-up"></i>
                </a>
              ) : (
                ""
              )}
              {isPermission == false ? (
                <a titel="Bạn không có quyền thao tác" onClick={handleDeleteID(item.ShipmentOrderID)} className="table-action hover-danger item-action">
                  <i className="ti-trash"></i>
                </a>
              ) : (
                ""
              )}
              {shipmentOrder.length > 1 ? (
                <a onClick={handleChangeOder(index, 1)} className="table-action hover-danger item-action">
                  <i className="ti-angle-down"></i>
                </a>
              ) : (
                ""
              )}
            </div>
          </td>
        </tr>
      </div>
      {isShowDescription && (
        <div style={{ marginBottom: "10px" }}>
          <tr className="jsgrid-row" style={{ width: "100%", border: "none" }}>
            <td className="jsgrid-cell" style={{ border: "none" }}>
              <Input.TextArea rows={5} />
            </td>
          </tr>
          <tr className="jsgrid-row" style={{ border: "none" }}>
            <td className="jsgrid-cell" style={{ width: "20%", border: "none" }}>
              <Space>
                <Button type="primary" style={{ width: "200px" }}>
                  Hoàn thành
                </Button>
                <Button
                  style={{ width: "200px" }}
                  onClick={() => {
                    setIsShowDescription(false);
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </td>
          </tr>
        </div>
      )}
    </div>
  );

  //#endregion
}
