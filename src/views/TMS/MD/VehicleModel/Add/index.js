import { APIHostName, AddAPIPath, AddElementList, AddPagePath, BackLink, MLObjectDefinition, TitleFormAdd } from "../constants";
import { callClearLocalCache, callGetCache } from "../../../../../actions/cacheAction";

import { ERPCOMMONCACHE_VEHICLETYPE } from "./../../../../../constants/keyCache";
import FormContainer from "./../../../../../common/components/FormContainer/index";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MD_VEHICLEMODEL_ADD } from "./../../../../../constants/functionLists";
import { MessageModal } from "../../../../../common/components/Modal";
import { ModalManager } from "react-dynamic-modal";
import React from "react";
import { Redirect } from "react-router-dom";
import SimpleForm from "./../../../../../common/components/Form/SimpleForm/index";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { connect } from "react-redux";
import { updatePagePath } from "../../../../../actions/pageAction";

class AddCom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.state = {
      CallAPIMessage: "",
      IsCallAPIError: false,
      IsCloseForm: false,
    };
  }

  componentDidMount() {
    this.props.updatePagePath(AddPagePath);
  }

  handleSubmit(formData, MLObject) {
    MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
    MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

    if (MLObject.VehicleTypeID == -1) {
      formData.cbVehicleTypeID.ErrorLst.IsValidatonError = true;
      formData.cbVehicleTypeID.ErrorLst.ValidatonErrorMessage = "Loại xe không được bỏ trống";
      return;
    }

    this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
      this.setState({ IsCallAPIError: apiResult.IsError });
      this.showMessage(apiResult.Message);
      if (!apiResult.IsError) {
        this.props.callClearLocalCache(ERPCOMMONCACHE_VEHICLEMODEL);
      }
    });
  }

  handleCloseMessage() {
    if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
  }

  showMessage(message, isError) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />);
  }

  render() {
    const dataSource = {
      IsActived: true,
    };
    if (this.state.IsCloseForm) {
      return <Redirect to={BackLink} />;
    }

    return (
      // <SimpleForm
      //   BackLink={BackLink}
      //   dataSource={this.state.DataSource}
      //   FormMessage={this.state.CallAPIMessage}
      //   FormName={TitleFormAdd}
      //   IsErrorMessage={this.state.IsCallAPIError}
      //   listelement={AddElementList}
      //   MLObjectDefinition={MLObjectDefinition}
      //   onSubmit={this.handleSubmit}
      //   ref={this.searchref}
      //   RequirePermission={MD_VEHICLEMODEL_ADD}
      // />

      <FormContainer FormName={TitleFormAdd} MLObjectDefinition={MLObjectDefinition} listelement={[]} onSubmit={this.handleSubmit} BackLink={BackLink} RequirePermission={MD_VEHICLEMODEL_ADD}>
        <div className="row">
          <div className="col-md-12">
            <FormControl.ComboBoxSelect
              name="cbVehicleTypeID"
              colspan="10"
              labelcolspan="2"
              label="Loại xe"
              isautoloaditemfromcache={true}
              loaditemcachekeyid="ERPCOMMONCACHE.VEHICLETYPE"
              valuemember="VehicleTypeID"
              nameMember="VehicleTypeName"
              controltype="InputControl"
              value="-1"
              listoption={null}
              datasourcemember="VehicleTypeID"
              placeholder="---Vui lòng chọn---"
              isMultiSelect={false}
              validatonList={["Comborequired"]}
            />
          </div>
          <div className="col-md-12">
            <FormControl.TextBox
              name="txtVehicleModelName"
              colspan="10"
              labelcolspan="2"
              readOnly={false}
              label="Tên model xe"
              placeholder="Tên model xe"
              controltype="InputControl"
              value=""
              maxSize={200}
              datasourcemember="VehicleModelName"
              validatonList={["required"]}
            />
          </div>
          <div className="col-md-12">
            <FormControl.CheckBox
              name="chkIsActived"
              colspan="10"
              labelcolspan="2"
              readOnly={false}
              label="Kích hoạt"
              controltype="InputControl"
              value={true}
              datasourcemember="IsActived"
              classNameCustom="customCheckbox"
            />
          </div>

          <div className="col-md-12">
            <FormControl.CheckBox
              name="chkIsSystem"
              colspan="10"
              labelcolspan="2"
              readOnly={false}
              label="Hệ thống"
              controltype="InputControl"
              value=""
              datasourcemember="IsSystem"
              classNameCustom="customCheckbox"
            />
          </div>
        </div>
      </FormContainer>
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
    updatePagePath: (pagePath) => {
      dispatch(updatePagePath(pagePath));
    },
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
    callClearLocalCache: (cacheKeyID) => {
      return dispatch(callClearLocalCache(cacheKeyID));
    },
  };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
