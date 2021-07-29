import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_MTRETURNREQUESTTYPE, ERPCOMMONCACHE_SHIPMENTFEETYPE } from "../../../../../constants/keyCache";
import { SHIPMENTFEETYPE_ADD, MTRETURNREQUESTTYPE_ADD, QUALITYASSESSTYPE_ADD } from "../../../../../constants/functionLists";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleValueChange(elementname, elementvalue, formData) {
        if (elementname == "txtStoreID") {
            var storeIndex = document.getElementsByName("txtStoreID")[0].selectedIndex;
            var storeName = document.getElementsByName("txtStoreID")[0].options[storeIndex].text;
            document.getElementsByName("txtDeliveryAbilityStoreName")[0].value = storeName;
            this.setState({
                DeliveryAbilityStoreName: storeName
            })
        } else if (elementname == "txtDeliveryAbilityStoreName") {
            this.setState({
                DeliveryAbilityStoreName: elementvalue
            })
        }
    }

    handleSubmit(formData, MLObject) {
        if(!this.state.DeliveryAbilityStoreName){
            this.setState({ IsCallAPIError: true });
            this.showMessage("Vui lòng nhập tên kho lấy tải");
        }
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.DeliveryAbilityStoreName = this.state.DeliveryAbilityStoreName;
        // MLObject.AddFunctionID = MLObject.AddFunctionID && Array.isArray(MLObject.AddFunctionID) ? MLObject.AddFunctionID[0] : MLObject.AddFunctionID;
        // MLObject.InputTypeID = MLObject.InputTypeID && Array.isArray(MLObject.InputTypeID) ? MLObject.InputTypeID[0] : MLObject.InputTypeID;
        // MLObject.InventoryStatusID = MLObject.InventoryStatusID && Array.isArray(MLObject.InventoryStatusID) ? MLObject.InventoryStatusID[0] : MLObject.InventoryStatusID;

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if(!apiResult.IsError){
                //this.props.callClearLocalCache(ERPCOMMONCACHE_MTRETURNREQUESTTYPE);
                //this.handleSubmitInsertLog(MLObject);
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
        const dataSource = {
            IsActived: true
        };
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <SimpleForm
                FormName="Thêm kho lấy tải"
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                onValueChange={this.handleValueChange.bind(this)}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                RequirePermission={QUALITYASSESSTYPE_ADD}
                ref={this.searchref}
            />
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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
