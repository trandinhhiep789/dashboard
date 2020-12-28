import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchAPIPath,
    InitSearchParams,
    UpdateUnlockAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_STAFFDEBT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus } from '../../../../../utils/function';
import { Base64 } from 'js-base64';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData)
    }


    handleSearchSubmit(formData, MLObject) {

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            },
            {
                SearchKey: "@USERNAME",
                SearchValue: MLObject.UserName
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.CoordinatorStoreID != "" ? MLObject.CoordinatorStoreID : -1
            },

        ];

        this.callSearchData(postData)
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {

            if (!apiResult.IsError) {
                let objStaffDebtID = {}
                const tempData = apiResult.ResultObject.map((item, index) => {
                    objStaffDebtID = {
                        UserName: item.UserName,
                        StoreID: item.StoreID
                    }
                    item.StaffDebtID = Base64.encode(JSON.stringify(objStaffDebtID));
                    item.FullNameMember = item.UserName + " - " + item.FullName
                    item.Note = "Xem"
                    if (item.IsLockDelivery) {
                        item.DeliveryStatus = <span className='lblstatusLock'>Đã khóa</span>;
                    }
                    else {
                        item.DeliveryStatus = <span className='lblstatusUnlock'>Hoạt động</span>;
                    }
                    return item;
                })
                console.log("tempData", tempData)
                this.setState({
                    gridDataSource: tempData
                })
            }
            else {
                this.setState({
                    gridDataSource: []
                })
                this.showMessage(apiResult.MessageDetail)
            }
        });
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

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    onhandleUpdateItem(objId) {
        const { gridDataSource } = this.state;
        const searchData = JSON.parse(Base64.decode(objId[0].value));
        const dataFind = gridDataSource.find(n => {
            return n.StaffDebtID == objId[0].value
        });
        if(dataFind.iSunLockDelivery){
            this.showMessage("Tình trạng này đã được mở khóa");
        }
        else{
            this.props.callFetchAPI(APIHostName, UpdateUnlockAPIPath, searchData).then(apiResult => {
                this.addNotification(apiResult.Message, apiResult.IsError)
                this.callSearchData(this.state.SearchData)
            });
        }
       
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê công nợ theo nhân viên"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    onUpdateItem={this.onhandleUpdateItem.bind(this)}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={true}
                    IDSelectColumnName={'StaffDebtID'}
                    PKColumnName={'StaffDebtID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    // RequirePermission={TMS_STAFFDEBT_VIEW}
                    ref={this.gridref}
                />
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
