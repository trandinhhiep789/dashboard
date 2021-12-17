import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from "../../../../../actions/modal";
import { MODAL_TYPE_SEARCH, MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from "../../../../../constants/actionTypes";
import SearchModal from "../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal";
import InputGridControl from "../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import MD5Digest from "../../../../../common/library/cryptography/MD5Digest.js";
import { APIHostName, BackLink, EditPagePath, UpdateNewAPIPath, LoadNewAPIPath, MLObjectDefinition, DataGridColumnList, PKColumnNameWard, schema, DataTemplateExport } from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { COORDINATORSTORE_ADD, COORDINATORSTORE_UPDATE } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from "../../CoordinatorStoreWard";
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";

import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";
import MultiAllStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiAllStoreComboBox";

class EditCom extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.convertDataCoordinatorStoreWard = this.convertDataCoordinatorStoreWard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
    this.handleInsertNew = this.handleInsertNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      CallAPIMessage: "",
      cssNotification: "",
      DataSource: [],
      DataTemplateExport,
      DataWard: [],
      DbCoordinatorStoreWard: [],
      iconNotification: "",
      IsCallAPIError: false,
      IsCloseForm: false,
      IsLoadDataComplete: false,
      IsShowCustomerAddress: true,
      IsSystem: false,
      SenderStoreID: "",
      SenderStoreSelect: [],
      DataSourceSenderStore: [],
      ValuePartner: -1,
    };

    this.gridref = React.createRef();
    this.notificationDOMRef = React.createRef();
    this.searchref = React.createRef();
  }

  componentDidMount() {
    this.props.updatePagePath(EditPagePath);
    this.callLoadData();
  }

  handleCloseMessage() {
    if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
  }

  handleLoadCacheSenderStore() {
    return new Promise((resolve, reject) => {
      this.props.callGetCache("ERPCOMMONCACHE.STORE").then((result) => {
        resolve(result);
      });
    });
  }

  handleLoadData() {
    return new Promise((resolve, reject) => {
      this.props.callFetchAPI(APIHostName, LoadNewAPIPath, this.props.match.params.id).then((apiResult) => {
        resolve(apiResult);
      });
    });
  }

  callLoadData() {
    const { SenderStoreSelect, StoreSelect } = this.state;

    Promise.all([this.handleLoadCacheSenderStore(), this.handleLoadData()]).then((allResult) => {
      let listOption = [];
      let partnerID = allResult[1].ResultObject.PartnerID;

      if (!allResult[0].IsError && allResult[0].ResultObject.CacheData != null) {
        allResult[0].ResultObject.CacheData.filter((item) => [partnerID].includes(item["CompanyID"])).map((cacheItem) => {
          listOption.push({ value: cacheItem["StoreID"], label: cacheItem["StoreID"] + "-" + cacheItem["StoreName"], name: cacheItem["StoreName"] });
        });
      }

      if (allResult[1].IsError) {
        this.setState({
          IsCallAPIError: !allResult[1].IsError,
        });

        this.showMessage(allResult[1].Message);
      } else {
        let IsShowCustomerAddress;
        let SenderStoreItem = {};

        SenderStoreItem.value = allResult[1].ResultObject.SenderStoreID;
        SenderStoreItem.label = allResult[1].ResultObject.SenderStoreID + " - " + allResult[1].ResultObject.SenderStoreName;
        SenderStoreItem.name = allResult[1].ResultObject.SenderStoreName;
        SenderStoreSelect.push(SenderStoreItem);

        if (allResult[1].ResultObject.IsCheckCustomerAddress) {
          if (allResult[1].ResultObject.IsSystem) {
            IsShowCustomerAddress = true;
          } else {
            IsShowCustomerAddress = false;
          }
        } else {
          IsShowCustomerAddress = true;
        }

        this.convertDataCoordinatorStoreWard(allResult[1].ResultObject.CoordinatorStoreWard_ItemList);

        this.setState({
          DataSourceSenderStore: listOption,
          ValuePartner: partnerID,
          DataSource: allResult[1].ResultObject,
          DataWard: allResult[1].ResultObject.CoordinatorStoreWard_ItemList,
          IsLoadDataComplete: true,
          IsShowCustomerAddress,
          IsSystem: allResult[1].ResultObject.IsSystem,
        });
      }
    });

    // this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
    //   if (apiResult.IsError) {
    //     this.setState({
    //       IsCallAPIError: !apiResult.IsError,
    //     });
    //     this.showMessage(apiResult.Message);
    //   } else {
    //     let IsShowCustomerAddress;
    //     let SenderStoreItem = {};
    //     SenderStoreItem.value = apiResult.ResultObject.SenderStoreID;
    //     SenderStoreItem.label = apiResult.ResultObject.SenderStoreID + " - " + apiResult.ResultObject.SenderStoreName;
    //     SenderStoreItem.name = apiResult.ResultObject.SenderStoreName;
    //     SenderStoreSelect.push(SenderStoreItem);

    //     if (apiResult.ResultObject.IsCheckCustomerAddress) {
    //       if (apiResult.ResultObject.IsSystem) {
    //         IsShowCustomerAddress = true;
    //       } else {
    //         IsShowCustomerAddress = false;
    //       }
    //     } else {
    //       IsShowCustomerAddress = true;
    //     }

    //     this.convertDataCoordinatorStoreWard(apiResult.ResultObject.CoordinatorStoreWard_ItemList);

    //     this.setState({
    //       DataSource: apiResult.ResultObject,
    //       DataWard: apiResult.ResultObject.CoordinatorStoreWard_ItemList,
    //       IsLoadDataComplete: true,
    //       IsShowCustomerAddress,
    //       IsSystem: apiResult.ResultObject.IsSystem,
    //     });
    //   }
    // });
  }

  convertDataCoordinatorStoreWard(CoordinatorStoreWard_ItemList) {
    try {
      const arrResult = CoordinatorStoreWard_ItemList.map((item) => {
        const { DistrictID, DistrictName, ProvinceID, ProvinceName, WardID, WardName } = item;
        item.DistrictFullName = `${DistrictID} - ${DistrictName}`;
        item.ProvinceFullName = `${ProvinceID} - ${ProvinceName}`;
        item.WardFullName = `${WardID} - ${WardName}`;
        return item;
      });

      this.setState({
        DbCoordinatorStoreWard: arrResult,
      });
    } catch (error) {
      this.showMessage("Lỗi lấy danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối");
    }
  }

  showMessage(message) {
    ModalManager.open(<MessageModal message={message} onCloseModal={this.handleCloseMessage} onRequestClose={() => true} title="Thông báo" />);
  }

  handleSubmit(formData, MLObject) {
    MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
    MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
    MLObject.CoordinatorStoreID = this.props.match.params.id.trim();
    this.props.callFetchAPI(APIHostName, UpdateNewAPIPath, MLObject).then((apiResult) => {
      this.setState({ IsCallAPIError: apiResult.IsError });
      this.showMessage(apiResult.Message);
    });
  }

  handleChange(formData, MLObject) {
    if (formData.cbPartnerID.value !== this.state.ValuePartner) {
      formData.cbSenderStoreID.value = "";
      this.setState({ ValuePartner: formData.cbPartnerID.value });

      this.props.callGetCache("ERPCOMMONCACHE.STORE").then((result) => {
        let listOption = [];

        if (!result.IsError && result.ResultObject.CacheData != null) {
          result.ResultObject.CacheData.filter((item) => [formData.cbPartnerID.value].includes(item["CompanyID"])).map((cacheItem) => {
            listOption.push({ value: cacheItem["StoreID"], label: cacheItem["StoreID"] + "-" + cacheItem["StoreName"], name: cacheItem["StoreName"] });
          });
          this.setState({ DataSourceSenderStore: listOption });
        }
      });
    }
    
    if (formData.chkIsCheckCustomerAddress.value) {
      this.setState({
        IsShowCustomerAddress: false,
      });
    } else {
      this.setState({
        IsShowCustomerAddress: true,
      });
    }
  }

  handleInsertNew() {
    if (this.state.DataSource.CoordinatorStoreWard_ItemList == null) {
      this.state.DataSource.CoordinatorStoreWard_ItemList = [];
    }
    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
      title: "Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối",
      content: {
        text: <StoreWard DataSource={this.state.DataSource.CoordinatorStoreWard_ItemList} isMultiSelectWard={true} onInputChangeObj={this.handleInputChangeObjItem} />,
      },
      maxWidth: "800px",
    });
  }

  handleInputChangeObjItem(ObjItem, result) {
    const tempData = ObjItem.map((item, index) => {
      return {
        ...item,
        DistrictFullName: `${item.DistrictID} - ${item.DistrictName}`,
        ProvinceFullName: `${item.ProvinceID} - ${item.ProvinceName}`,
        WardFullName: `${item.WardID} - ${item.WardName}`,
      };
    });
    const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: tempData });
    // const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: ObjItem });
    this.setState({
      DataSource: formData,
      DbCoordinatorStoreWard: tempData,
    });
    this.props.hideModal();
  }

  handleEdit(index) {
    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
      title: "Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối",
      content: {
        text: <StoreWard DataSource={this.state.DataSource.CoordinatorStoreWard_ItemList} index={index} isMultiSelectWard={false} onInputChangeObj={this.handleInputChangeObjItem} PageInfo={"Edit"} />,
      },
      maxWidth: "800px",
    });
  }

  handleDelete(id) {
    let dataSourceValue = this.state.DataSource.CoordinatorStoreWard_ItemList.filter(function (value, index) {
      return value.WardID != id;
    });
    const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: dataSourceValue });
    this.setState({ DataSource: formData });
  }

  addNotification(message1, IsError) {
    if (!IsError) {
      this.setState({
        cssNotification: "notification-custom-success",
        iconNotification: "fa fa-check",
      });
    } else {
      this.setState({
        cssNotification: "notification-danger",
        iconNotification: "fa fa-exclamation",
      });
    }
    this.notificationDOMRef.current.addNotification({
      container: "bottom-right",
      content: (
        <div className={this.state.cssNotification}>
          <div className="notification-custom-icon">
            <i className={this.state.iconNotification} />
          </div>
          <div className="notification-custom-content">
            <div className="notification-close">
              <span>×</span>
            </div>
            <h4 className="notification-title">Thông Báo</h4>
            <p className="notification-message">{message1}</p>
          </div>
        </div>
      ),
      dismiss: { duration: 6000 },
      dismissable: { click: true },
    });
  }

  onChangeAllStore(name, objstore) {
    this.setState({
      SenderStoreID: objstore.value,
    });
  }

  handleImportFile(resultRows, errors) {
    const arrResultRows = resultRows.map((item) => {
      const { DistrictID, DistrictName, ProvinceID, ProvinceName, WardID, WardName } = item;
      return {
        ...item,
        DistrictFullName: `${DistrictID} - ${DistrictName}`,
        ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
        WardFullName: `${WardID} - ${WardName}`,
      };
    });

    this.setState({
      DataSource: {
        ...this.state.DataSource,
        CoordinatorStoreWard_ItemList: [...this.state.DataSource.CoordinatorStoreWard_ItemList, ...arrResultRows],
      },
    });
    // this.props.callFetchAPI(APIHostName, AddAutoAPIPath, resultRows).then(apiResult => {
    //     console.log('apiResult', apiResult)
    // });
  }

  handleExportFileTemplate(result) {
    this.addNotification(result.Message);
  }

  render() {
    const { DataSource, IsShowCustomerAddress, DataWard } = this.state;
    if (this.state.IsCloseForm) {
      return <Redirect to={BackLink} />;
    }
    if (this.state.IsLoadDataComplete) {
      return (
        <React.Fragment>
          <ReactNotification ref={this.notificationDOMRef} />
          <FormContainer
            BackLink={BackLink}
            dataSource={this.state.DataSource}
            FormName="Cập nhật định nghĩa kho điều phối giao hàng"
            listelement={[]}
            MLObjectDefinition={MLObjectDefinition}
            onchange={this.handleChange.bind(this)}
            onSubmit={this.handleSubmit}
            RequirePermission={COORDINATORSTORE_UPDATE}
          >
            <div className="row">
              <div className="col-md-6">
                <FormControl.ComboBoxSelect
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="ShipmentOrderTypeID"
                  disabled={this.state.IsSystem}
                  isautoloaditemfromcache={true}
                  label="loại yêu cầu vẫn chuyển"
                  labelcolspan="4"
                  listoption={null}
                  loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                  name="cbShipmentOrderTypeID"
                  nameMember="ShipmentOrderTypeName"
                  placeholder="-- Vui lòng chọn --"
                  readOnly={this.state.IsSystem}
                  validatonList={["Comborequired"]}
                  value={""}
                  valuemember="ShipmentOrderTypeID"
                />
              </div>
              <div className="col-md-6">
                <FormControl.FormControlComboBox
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="PartnerID"
                  disabled={this.state.IsSystem}
                  filterobj="PartnerTypeID"
                  filterValue={1}
                  isautoloaditemfromcache={true}
                  label="đối tác"
                  labelcolspan="4"
                  listoption={null}
                  loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                  name="cbPartnerID"
                  nameMember="PartnerName"
                  placeholder="-- Vui lòng chọn --"
                  readOnly={this.state.IsSystem}
                  validatonList={["Comborequired"]}
                  value={""}
                  valuemember="PartnerID"
                />
              </div>

              <div className="col-md-6">
                <FormControl.FormControlComboBox
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="StoreID"
                  disabled={this.state.IsSystem}
                  filterobj="CompanyID"
                  filterValue={10}
                  isautoloaditemfromcache={true}
                  label="kho điều phối"
                  labelcolspan="4"
                  listoption={null}
                  loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                  name="cbStoreID"
                  nameMember="StoreName"
                  placeholder="-- Vui lòng chọn --"
                  readOnly={this.state.IsSystem}
                  validatonList={["Comborequired"]}
                  value={""}
                  valuemember="StoreID"
                />
              </div>
              {/* <div className="col-md-6">
                                  <MultiAllStoreComboBox
                                      colspan="8"
                                      controltype="InputControl"
                                      datasourcemember="SenderStoreID"
                                      disabled={this.state.IsSystem}
                                      disabled={this.state.IsSystem}
                                      isautoloaditemfromcache={false}
                                      IsLabelDiv="kho xuất"
                                      IsLabelDiv={false}
                                      isMultiSelect={false}
                                      label="kho xuất"
                                      labelcolspan="4"
                                      listoption={this.state.SenderStoreSelect}
                                      name="cbSenderStoreID"
                                      onChange={this.onChangeAllStore.bind(this)}
                                      readOnly={this.state.IsSystem}
                                      readOnly={this.state.IsSystem}
                                      validationErrorMessage={''}
                                      validatonList={["Comborequired"]}
                                      value={this.state.SenderStoreSelect}
                                  />
                              </div> */}

              <div className="col-md-6" key={this.state.ValuePartner}>
                <FormControl.FormControlComboBoxNew
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="SenderStoreID"
                  disabled={this.state.IsSystem}
                  //   filterobj="CompanyID"
                  //   filterValue={this.state.ValuePartner}
                  isautoloaditemfromcache={false}
                  label="kho xuất"
                  labelcolspan="4"
                  listoption={this.state.DataSourceSenderStore}
                  //   listoption={null}
                  loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                  name="cbSenderStoreID"
                  nameMember="StoreName"
                  placeholder="-- Vui lòng chọn --"
                  readOnly={this.state.IsSystem}
                  validatonList={["Comborequired"]}
                  value={""}
                  valuemember="StoreID"
                />
              </div>

              <div className="col-md-6">
                <FormControl.CheckBox
                  classNameCustom="customCheckbox"
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="IsActived"
                  disabled={this.state.IsSystem}
                  label="kích hoạt"
                  labelcolspan="4"
                  name="chkIsActived"
                  readOnly={this.state.IsSystem}
                  value={true}
                />
              </div>

              <div className="col-md-6">
                <FormControl.CheckBox
                  classNameCustom="customCheckbox"
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="IsSystem"
                  label="hệ thống"
                  labelcolspan="4"
                  name="chkIsSystem"
                  readOnly={false}
                  value=""
                />
              </div>
              <div className="col-md-6">
                <FormControl.CheckBox
                  classNameCustom="customCheckbox"
                  colspan="8"
                  controltype="InputControl"
                  datasourcemember="IsCheckCustomerAddress"
                  disabled={this.state.IsSystem}
                  label="kiểm tra địa chỉ khách hàng"
                  labelcolspan="4"
                  name="chkIsCheckCustomerAddress"
                  readOnly={this.state.IsSystem}
                  value={false}
                />
              </div>
              <div className="col-md-6"></div>
            </div>

            <InputGridControl
              // value={null}
              controltype="InputGridControl"
              dataSource={this.state.DbCoordinatorStoreWard}
              DataTemplateExport={this.state.DataTemplateExport}
              fileNameTemplate={"Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối"}
              IDSelectColumnName={"WardID"}
              isExportFileTemplate={true}
              isHiddenButtonAdd={IsShowCustomerAddress}
              isImportFile={true}
              IsPermisionDelete={false}
              listColumn={DataGridColumnList}
              name="CoordinatorStoreWard_ItemList"
              onDeleteClick={this.handleDelete}
              onEditClick={this.handleEdit}
              onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
              onImportFile={this.handleImportFile.bind(this)}
              onInsertClick={this.handleInsertNew}
              PKColumnName={"WardID"}
              schemaData={schema}
              title="Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối"
            />
          </FormContainer>
        </React.Fragment>
      );
    } else {
      return <div>Đang tải dữ liệu</div>;
    }
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
    updatePagePath: (pagePath) => {
      dispatch(updatePagePath(pagePath));
    },
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
    showModal: (type, props) => {
      dispatch(showModal(type, props));
    },
    hideModal: () => {
      dispatch(hideModal());
    },
  };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
