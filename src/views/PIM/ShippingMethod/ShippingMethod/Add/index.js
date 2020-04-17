import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    GridMLObjectDefinition,
    InputLanguageColumnList,
    LoadAPIPathLanguage,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { SHIPPING_METHOD_ADD } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_PIM_SHIPPINGMETHOD } from "../../../../../constants/keyCache";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: [
                {
                    ShippingMethodID: "",
                    ShippingMethodName: "",
                    Description: "",
                    IsActived: true,
                    IsSystem: false
                }
            ],
            ResultLanguage: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.props.callFetchAPI(APIHostName, LoadAPIPathLanguage, 0).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject);
                    this.setState({ ResultLanguage });
                }
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, { [index]: rowGridData });
        this.setState({ ResultLanguage: dataSource });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới phương tiện vận chuyển: ${MLObject.ShippingMethodName}`;
        MLObject.ActivityDetail = `Thêm mới phương tiện vận chuyển: ${MLObject.ShippingMethodName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_SHIPPINGMETHOD";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.ShippingMethodName !== null);
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleSubmitInsertLog(MLObject);
                this.props.callClearLocalCache(PIMCACHE_PIM_SHIPPINGMETHOD)
            }
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
        return (
            <React.Fragment>
                <FormContainer
                    FormName="Thêm phương tiện vận chuyển"
                    name="ShippingMethod"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={AddElementList}
                    IsAutoLayout={true}
                    BackLink={BackLink}
                    RequirePermission={SHIPPING_METHOD_ADD}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                >
                    <InputGrid
                        name="ResultLanguage"
                        controltype="InputControl"
                        listColumn={InputLanguageColumnList}
                        dataSource={this.state.ResultLanguage}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="12"
                        isHideHeaderToolbar={true}
                        onValueChangeInputGrid={this.valueChangeInputGrid}
                    />
                </FormContainer>
            </React.Fragment>
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
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
