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
import { createListTree } from '../../../../../common/library/ultils';
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_SHIPMENTGOODSTYPE } from "../../../../../constants/keyCache";
import { SHIPMENTGOODSTYPE_UPDATE } from "../../../../../constants/functionLists";

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
            EditElementList
        };
    }

    GetParentList(id) {
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: id
        },
        {
            SearchKey: "@isactived",
            SearchValue: -1
        }
        ];

        this.props.callFetchAPI(APIHostName,"api/ShipmentGoodsType/GetParentShipmentGoodsType", InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {

                const sortTemp = apiResult.ResultObject.sort((a, b) => (a.ParentID > b.ParentID) ? 1 : (a.ParentID === b.ParentID) ? ((a.ShipmentGoodsTypeID > b.ShipmentGoodsTypeID) ? 1 : -1) : -1)
                let treeData = createListTree(sortTemp, -1, "ParentID", "ShipmentGoodsTypeID", "ShipmentGoodsTypeName")
                treeData.unshift({
                    ParentID: -1,
                    ShipmentGoodsTypeID: -1,
                    ShipmentGoodsTypeName: "-- Vui lòng chọn --",
                    key: -1,
                    value: -1,
                    title: "-- Vui lòng chọn --",
                })
                this.setState({ treeData })

                let comboParentIDList = apiResult.ResultObject.map(function (objData) {
                    if (objData.ProductTypeID === -1) {
                        return {};
                    }
                    return { value: objData.ProductTypeID, ParentID: objData.ParentID, name: `${objData.ProductTypeID}. ${objData.ProductTypeName}`, label: `${objData.ParentID} - ${objData.ProductTypeName}` }
                });
                //  comboParentIDList.unshift({ value: -1, name:"Vuilongchon", label:"--Vui lòng chọn--"});
                comboParentIDList = comboParentIDList.filter(value => Object.keys(value).length !== 0);
                let _EditElementList = this.state.EditElementList;
                _EditElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'ParentID' && comboParentIDList.length > 0) {
                        objElement.listoption = comboParentIDList;
                        objElement.value = -1;
                    }
                    if (objElement.type == 'treeSelect') {
                        objElement.treeData = treeData;
                    }
                });
                this.setState({
                    EditElementList: _EditElementList
                });
            
            }
        });
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.updatePagePath(EditPagePath);
        this.GetParentList(id);
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
                if (apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError
                    });
                    this.showMessage(apiResult.Message);
                } else {
                    this.setState({ DataSource: apiResult.ResultObject });
                }
                this.setState({
                    IsLoadDataComplete: true
                });
            });
    }

    // handleClearLocalCache() {
    //     const cacheKeyID = "PIMCACHE.PIMATTRIBUTECATEGORYTYPE";
    //     const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
    //     return db.delete(cacheKeyID).then((result) => {
    //         const postData = {
    //             CacheKeyID: cacheKeyID,
    //             UserName: this.props.AppInfo.LoginInfo.Username,
    //             AdditionParamList: []
    //         };
    //         this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
    //             this.handleGetCache();
    //             //console.log("apiResult", apiResult)
    //         });
    //     }
    //     );
    // }

    // handleGetCache() {
    //     this.props.callGetCache("PIMCACHE.PIMATTRIBUTECATEGORYTYPE").then((result) => {
    //         console.log("handleGetCache: ", result);
    //     });
    // }

    // handleSubmitInsertLog(MLObject) {
    //     MLObject.ActivityTitle = `Cập nhật loại danh mục thuộc tính: ${MLObject.AttributeCategoryTypeName}`;
    //     MLObject.ActivityDetail = `Cập nhật loại danh mục thuộc tính: ${MLObject.AttributeCategoryTypeName} ${"\n"}Mô tả: ${MLObject.Description}`;
    //     MLObject.ObjectID = "PIM_ATTRIBUTECATEGORYTYPE";
    //     MLObject.ActivityUser = MLObject.UpdatedUser;
    //     this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    // }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                if(!apiResult.IsError){
                    this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTGOODSTYPE);
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
                <FormContainer
                FormName="Cập nhật loại hàng hóa vận chuyển"
                MLObjectDefinition={MLObjectDefinition}
                listelement={EditElementList}
                IsAutoLayout={true}
                onSubmit={this.handleSubmit}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={this.state.DataSource}
                BackLink={BackLink}
                RequirePermission={SHIPMENTGOODSTYPE_UPDATE}
            >
            </FormContainer>
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
