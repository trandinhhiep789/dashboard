import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_VEHICLETYPE } from "../../../../../constants/keyCache";
import { QUALITYASSESSGROUP_UPDATE, REWARDTYPE_UPDATE, SERVICETYPE_UPDATE, VEHICLE_UPDATE } from "../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.computeVolumn = this.computeVolumn.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    dai: apiResult.ResultObject.Length,
                    rong: apiResult.ResultObject.Width,
                    cao: apiResult.ResultObject.Height,
                    thetich: apiResult.ResultObject.Volume
                });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    computeVolumn() {
        let thetich = parseFloat(this.state.dai) * parseFloat(this.state.rong) * parseFloat(this.state.cao);
        if (isNaN(thetich)) {
            thetich = 0;
        }
        this.setState({ thetich })
        document.getElementsByName("txtVolume")[0].value = thetich;
    }


    onValueChange(elementname, elementvalue, formData) {
        if (elementname == "txtLength") {
            this.setState({ dai: elementvalue });
            setTimeout(() => {
                this.computeVolumn();
            }, 100)

        } else if (elementname == "txtWidth") {
            this.setState({ rong: elementvalue });
            setTimeout(() => {
                this.computeVolumn();
            }, 100)
        } else if (elementname == "txtHeight") {
            this.setState({ cao: elementvalue });
            setTimeout(() => {
                this.computeVolumn();
            }, 100)
        }
    }

    handleSubmit(formData, MLObject) {
        debugger;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.Volume = this.state.thetich;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_VEHICLETYPE);
                // this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <SimpleForm
                    FormName="Cập nhật loại phương tiện"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    onSubmit={this.handleSubmit}
                    onValueChange={this.onValueChange}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                    RequirePermission={VEHICLE_UPDATE}
                    ref={this.searchref}
                />
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
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
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
