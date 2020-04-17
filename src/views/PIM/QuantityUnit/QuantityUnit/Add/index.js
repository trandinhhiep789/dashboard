import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    InputLanguageColumnList,
    GridMLObjectDefinition,
    LoadAPIPathLanguage,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { QUANTITY_UNIT_ADD } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_QUANTITYUNIT } from "../../../../../constants/keyCache";

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
            DataSource: {
                QuantityUnitID: "",
                QuantityUnitName: "",
                IsAllowDecimal: true,
                Description: "",
                IsActived: true,
                IsSystem: false
            },
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
        MLObject.ActivityTitle = `Thêm mới đơn vị tính: ${MLObject.QuantityUnitName}`;
        MLObject.ActivityDetail = `Thêm mới đơn vị tính: ${MLObject.QuantityUnitName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_QUANTITYUNIT";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.QuantityUnitName !== null);
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ResultLanguage = ResultLanguage;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_QUANTITYUNIT)
                this.handleSubmitInsertLog(MLObject);
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
                    FormName="Thêm đơn vị tính"
                    name="QuantityUnit"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={AddElementList}
                    IsAutoLayout={true}
                    onSubmit={this.handleSubmit}
                    RequirePermission={QUANTITY_UNIT_ADD}
                    BackLink={BackLink}
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

const Add = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCom);
export default Add;
