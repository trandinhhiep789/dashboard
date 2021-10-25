import { APIHostName, BackLink, EditElementList, EditPagePath, LoadAPIPath, MLObjectDefinition, TitleFormEdit, UpdateAPIPath } from "../constants";
import { callClearLocalCache, callGetCache } from "../../../../../actions/cacheAction";

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
      console.log(apiResult);
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

    console.log(MLObject);

    this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
      this.setState({ IsCallAPIError: apiResult.IsError });
      this.showMessage(apiResult.Message);
      if (!apiResult.IsError) {
      }
    });
    //console.log("MLObject",MLObject);
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
          <SimpleForm
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
          />
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
