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
    InputLanguageDataSource,
    LoadAPIPathLanguage,
    AddLogAPIPath
} from "../Constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PRODUCT_ASSOC_TYPE_ADD } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_PRODUCTASSOCTYPE } from "../../../../../constants/keyCache";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.getLanguage = this.getLanguage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            InputLanguageDataSource: InputLanguageDataSource,
            AddElementList: AddElementList,
            DataSource: {
                IsActived: true
            },
            ResultLanguage: []
        };
        this.searchref = React.createRef();
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

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.getLanguage();
    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, {
            [index]: rowGridData
        });
        this.setState({ ResultLanguage: dataSource });
    }


    getLanguage() {
        this.props.callFetchAPI(APIHostName, LoadAPIPathLanguage, 0).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign(
                        [],
                        this.state.ResultLanguage,
                        apiResult.ResultObject
                    );
                    this.setState({ ResultLanguage });
                }
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới loại kết hợp sản phẩm: ${MLObject.ProductAssocTypeName}`;
        MLObject.ActivityDetail = `Thêm mới loại kết hợp sản phẩm: ${MLObject.ProductAssocTypeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_PRODUCTASSOCTYPE";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(
            x => x.HasChanged == true && x.ProductAssocTypeName !== null
        );
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_PRODUCTASSOCTYPE)
                this.handleSubmitInsertLog(MLObject);
            }

        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <FormContainer
                FormName="Thêm"
                MLObjectDefinition={MLObjectDefinition}
                listelement={this.state.AddElementList}
                url="http://localhost:8910/api/contact"
                IsAutoLayout={true}
                BackLink={BackLink}
                RequirePermission={PRODUCT_ASSOC_TYPE_ADD}
                onSubmit={this.handleSubmit}
                dataSource={this.state.DataSource}
            >
                <InputGrid
                    name="inputGridProductAssocType_lang"
                    controltype="InputControl"
                    listColumn={InputLanguageColumnList}
                    isHideHeaderToolbar={true}
                    dataSource={this.state.InputLanguageDataSource}
                    MLObjectDefinition={GridMLObjectDefinition}
                    colspan="10"
                    onValueChangeInputGrid={this.valueChangeInputGrid}
                />
            </FormContainer>
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
        callGetCache: cacheKeyID => {
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
