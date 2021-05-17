import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    titleModal
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
// import { } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function';
import * as components from '../components';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            dataExport: [],
            widthPercent: "",
            fromDate: '',
            toDate: ''
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };

    handleSearchSubmit(formData, MLObject) {
        // const postData = [
        //     {
        //         SearchKey: "@FROMDATE",
        //         SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())//MLObject.FromDate
        //     },
        //     {
        //         SearchKey: "@TODATE",
        //         SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
        //     },
        //     {
        //         SearchKey: "@REWARDPOSITIONID",
        //         SearchValue: MLObject.RewardPositionID
        //     },
        //     {
        //         SearchKey: "@REWARDTYPEID",
        //         SearchValue: MLObject.RewardTypeID
        //     }
        // ];
        // this.setState({
        //     fromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
        //     toDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
        // })

        this.showMessage("Tính năng đang phát triển");
        return;

        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {

            }
            else {
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
            />
        );
    }

    addNotification(message, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }


    handleExportFile(result) {
        this.showMessage("Tính năng đang phát triển");
        return;

        this.addNotification(result.Message, result.IsError);
    }

    handleShowModal(data, paramData) {
        // const { widthPercent } = this.state;

        // this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
        //     title: titleModal,
        //     content: {
        //         text: <components.ModalOtherRewardTotal
        //             dataSource={data}
        //             paramData={paramData}
        //             RowsPerPage={20}
        //             IsAutoPaging={true}
        //         />

        //     },
        //     maxWidth: widthPercent + 'px'
        // });
    }

    onShowModalDetail(objValue, name) {
        // const { fromDate, toDate } = this.state;

        // const postData = {
        //     UserName: objValue[0].value,
        //     FromDate: fromDate,
        //     ToDate: toDate
        // }

        // this.props.callFetchAPI(APIHostName, SearchByUserAPIPath, postData).then(apiResult => {
        //     if (!apiResult.IsError) {
        //         this.handleShowModal(apiResult.ResultObject, postData)
        //     }
        //     else {
        //         this.showMessage(apiResult.MessageDetail)
        //     }
        // })
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách tổng thương giao hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={""}
                    PKColumnName={""}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={50}
                    // RequirePermission={ }
                    // ExportPermission={ }
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách tổng xuất thưởng"
                    onExportFile={this.handleExportFile.bind(this)}
                    // onShowModal={this.onShowModalDetail.bind(this)}
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
