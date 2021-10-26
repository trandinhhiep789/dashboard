import { APIHostName, BackLink, EditElementList, EditPagePath, LoadAPIPath, MLObjectDefinition, TitleFormEdit, UpdateAPIPath } from "../constants";
import { ERPCOMMONCACHE_VEHICLEMODEL, ERPCOMMONCACHE_VEHICLETYPE } from "./../../../../../constants/keyCache";
import { callClearLocalCache, callGetCache } from "../../../../../actions/cacheAction";

import FormContainer from "./../../../../../common/components/FormContainer/index";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MD_VEHICLEMODEL_UPDATE } from "../../../../../constants/functionLists";
import { MessageModal } from "../../../../../common/components/Modal";
import { ModalManager } from "react-dynamic-modal";
import React from "react";
import { Redirect } from "react-router-dom";
import SimpleForm from "./../../../../../common/components/Form/SimpleForm/index";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { connect } from "react-redux";
import { updatePagePath } from "../../../../../actions/pageAction";

class EditCom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.state = {
      CallAPIMessage: "",
      IsCallAPIError: false,
      FormContent: "",
      IsLoadDataComplete: false,
      IsCloseForm: false,
      EditElementList: EditElementList,
      DataSource: {},
    };
  }

  componentDidMount() {
    this.props.updatePagePath(EditPagePath);
    const id = this.props.match.params.id;

    this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
      if (apiResult.IsError) {
        this.setState({
          IsCallAPIError: apiResult.IsError,
        });
        this.showMessage(apiResult.Message);
      } else {
        this.setState({
          DataSource: apiResult.ResultObject,
        });
      }
      this.setState({
        IsLoadDataComplete: true,
      });
    });
  }

  handleSubmit(formData, MLObject) {
    MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
    MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
    MLObject.VehicleModelID = this.state.DataSource.VehicleModelID;

    this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
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

  showMessage(message) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />);
  }

  render() {
    if (this.state.IsCloseForm) {
      return <Redirect to={BackLink} />;
    }
    if (this.state.IsLoadDataComplete) {
      return (
        <React.Fragment>
          {/* <SimpleForm
            BackLink={BackLink}
            dataSource={this.state.DataSource}
            FormMessage={this.state.CallAPIMessage}
            FormName={TitleFormEdit}
            IsErrorMessage={false}
            listelement={EditElementList}
            MLObjectDefinition={MLObjectDefinition}
            onSubmit={this.handleSubmit}
            ref={this.searchref}
            RequirePermission={MD_VEHICLEMODEL_UPDATE}
          /> */}
          <FormContainer
            FormName={TitleFormEdit}
            MLObjectDefinition={MLObjectDefinition}
            listelement={[]}
            dataSource={this.state.DataSource}
            onSubmit={this.handleSubmit}
            BackLink={BackLink}
            RequirePermission={MD_VEHICLEMODEL_UPDATE}
            IsDisabledSubmitForm={this.state.DataSource.IsSystem}
          >
            <div className="row">
              <div className="col-md-12">
                <FormControl.TextBox
                  name="txtVehicleModelID"
                  colspan="10"
                  labelcolspan="2"
                  readOnly={true}
                  label="Tên model xe"
                  placeholder="Tên model xe"
                  controltype="InputControl"
                  value=""
                  maxSize={10}
                  datasourcemember="VehicleModelID"
                  validatonList={["required", "number"]}
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
        </React.Fragment>
      );
    }
    return (
      <div>
        <label>Đang nạp dữ liệu...</label>
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

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
