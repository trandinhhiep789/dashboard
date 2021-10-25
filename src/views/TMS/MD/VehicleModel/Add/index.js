import { APIHostName, AddAPIPath, AddElementList, AddPagePath, BackLink, MLObjectDefinition, TitleFormAdd } from "../constants";
import { callClearLocalCache, callGetCache } from "../../../../../actions/cacheAction";

import { ERPCOMMONCACHE_VEHICLETYPE } from "./../../../../../constants/keyCache";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
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

    if (MLObject.VehicleTypeID === -1) {
      this.showMessage("Loại xe không được bỏ trống");
      this.setState({ IsCallAPIError: true });
      return;
    }

    this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
      this.setState({ IsCallAPIError: apiResult.IsError });
      if (!apiResult.IsError) {
        this.props.callClearLocalCache(ERPCOMMONCACHE_VEHICLETYPE);
      }
      this.showMessage(apiResult.Message);
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
      <SimpleForm
        BackLink={BackLink}
        dataSource={this.state.dataSource}
        FormMessage={this.state.CallAPIMessage}
        FormName={TitleFormAdd}
        IsErrorMessage={false}
        listelement={AddElementList}
        MLObjectDefinition={MLObjectDefinition}
        onSubmit={this.handleSubmit}
        ref={this.searchref}
        RequirePermission={MD_VEHICLEMODEL_ADD}
      />
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
