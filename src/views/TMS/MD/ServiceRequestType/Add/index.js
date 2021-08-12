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
import { ERPCOMMONCACHE_MTRETURNREQUESTTYPE, ERPCOMMONCACHE_SERVICEREQUESTTYPE, ERPCOMMONCACHE_SHIPMENTFEETYPE } from "../../../../../constants/keyCache";
import { SHIPMENTFEETYPE_ADD, MTRETURNREQUESTTYPE_ADD, QUALITYASSESSTYPE_ADD, SERVICETYPE_ADD } from "../../../../../constants/functionLists";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            Files: {},
        };
    }

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.SaleOrderTypeID = MLObject.SaleOrderTypeID == "" ? -1 : MLObject.SaleOrderTypeID;
        MLObject.OutputTypeID = MLObject.OutputTypeID == "" ? -1 : MLObject.OutputTypeID;
        MLObject.PayableTypeID = MLObject.PayableTypeID == "" ? -1 : MLObject.PayableTypeID;
        MLObject.DeliveryTypeID = MLObject.DeliveryTypeID == "" ? -1 : MLObject.DeliveryTypeID;
        MLObject.VoucherTypeID = MLObject.VoucherTypeID == "" ? -1 : MLObject.VoucherTypeID;
        MLObject.ShipmentOrderTypeID = MLObject.ShipmentOrderTypeID == "" ? -1 : MLObject.ShipmentOrderTypeID;
        // MLObject.AddFunctionID = MLObject.AddFunctionID && Array.isArray(MLObject.AddFunctionID) ? MLObject.AddFunctionID[0] : MLObject.AddFunctionID;
        // MLObject.InputTypeID = MLObject.InputTypeID && Array.isArray(MLObject.InputTypeID) ? MLObject.InputTypeID[0] : MLObject.InputTypeID;
        // MLObject.InventoryStatusID = MLObject.InventoryStatusID && Array.isArray(MLObject.InventoryStatusID) ? MLObject.InventoryStatusID[0] : MLObject.InventoryStatusID;

        var data = new FormData();
        data.append("LogoImageURL", this.state.Files.ImageUrl);
        data.append("ServiceRequestTypeObj", JSON.stringify(MLObject));

        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if(!apiResult.IsError){
                this.props.callClearLocalCache(ERPCOMMONCACHE_SERVICEREQUESTTYPE);
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
                FormName="Thêm loại yêu cầu dịch vụ"
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                onHandleSelectedFile={this.handleSelectedFile.bind(this)}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                RequirePermission={SERVICETYPE_ADD}
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
