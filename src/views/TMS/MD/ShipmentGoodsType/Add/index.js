import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { createListTree } from '../../../../../common/library/ultils';

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        // this.handleGetCache = this.handleGetCache.bind(this);
        // this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            AddElementList: AddElementList,
            IsLoadDataComplete: false
        };
    }

    componentDidMount() {
        this.GetParentList();
        this.props.updatePagePath(AddPagePath);
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
    //     MLObject.ActivityTitle = `Thêm mới danh sách lý do hủy giao hàng: ${MLObject.CancelDeliveryReasonName}`;
    //     MLObject.ActivityDetail = `Thêm mới danh sách lý do hủy giao hàng: ${MLObject.CancelDeliveryReasonName} ${"\n"}Mô tả: ${MLObject.Description}`;
    //     MLObject.ObjectID = "MD_CANCELDELIVERYREASON";
    //     MLObject.ActivityUser = MLObject.CreatedUser;
    //     this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    // }

    GetParentList() {
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: ""
        },
        {
            SearchKey: "@isactived",
            SearchValue: 1
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
                let _AddElementList = this.state.AddElementList;
                _AddElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'ParentID' && comboParentIDList.length > 0) {
                        objElement.listoption = comboParentIDList;
                        objElement.value = -1;
                    }
                    if (objElement.type == 'treeSelect') {
                        objElement.treeData = treeData;
                    }
                });
                this.setState({
                    AddElementList: _AddElementList,
                    IsLoadDataComplete:true
                });
            
            }
        });
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if(!apiResult.IsError){
                //this.handleClearLocalCache();
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
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName="Thêm loại hàng hóa vận chuyển"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.AddElementList}
                    IsAutoLayout={true}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={dataSource}
                    BackLink={BackLink}
                >
                </FormContainer>
            );
        }
        return (
            <React.Fragment>
                <label>Đang nạp dữ liệu...</label>
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
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
