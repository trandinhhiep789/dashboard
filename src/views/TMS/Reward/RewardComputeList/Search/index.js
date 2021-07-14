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
    SearchConfirmLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_REWARDCOMPUTELIST_VIEW, TMS_REWARDCOMPUTELIST_CONFIRM } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function'
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import ConfirmModal from '../ConfirmModal'
import { showModal, hideModal } from '../../../../../actions/modal';
import DataGirdHistory from '../DataGirdHistory'
import ConfirmListModal from '../ConfirmModal/ConfirmListModal.js'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleCallData = this.handleCallData.bind(this);
        this.HandleConfirmResult = this.HandleConfirmResult.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,
            params: {},
            totalAmount: '',
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {

        const param = {
            // FromDate: InitSearchParams[0].SearchValue,
            // ToDate: InitSearchParams[1].SearchValue,
            // CoordinatorStore: InitSearchParams[2].SearchValue,
        }

        this.setState({
            params: param
        })

        this.props.updatePagePath(PagePath);
        this.handleCallData();
    }



    handleCallData() {
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("search", formData, MLObject)

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
                SearchKey: "@REWARDCOMPUTETYPEID",
                SearchValue: MLObject.RewardComputeTypeID
            },
            {
                SearchKey: "@ISCOMPUTED",
                SearchValue: MLObject.IsComputed
            },

        ];

        this.setState({
            SearchData: postData
        })
        this.callSearchData(postData);
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("data", searchData, apiResult)
            if (!apiResult.IsError) {

                const tempData = apiResult.ResultObject.map((item, index) => {
                    if (item.IsConfirm) {
                        item.IsConfirmStatus = <span className='lbl-unConfirm'><i className="ti-close"></i> Bỏ chốt</span>;
                    }
                    else {
                        item.IsConfirmStatus = <span className='lbl-confirm'><i className="ti-check"></i> Chốt thưởng</span>;
                    }

                    return item;
                })
                this.setState({
                    gridDataSource: tempData,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                });
            }
            else {
                this.showMessage(apiResult.Message)
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

    addNotification(message1, IsError) {
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
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    HandleConfirmResult(result) {
        console.log("result", result)
        this.addNotification(result.Message, result.IsError)
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }


    onhandleUpdateItem(objId) {

        const { gridDataSource, SearchData } = this.state;
        const dataFind = gridDataSource.find(n => {
            return n.RewardComputeListID == objId[0].value
        });

        if (dataFind.IsComputed) {
            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: "Chốt thưởng",
                content: {
                    text: <ConfirmModal
                        dataSource={dataFind}
                        objId={objId}
                        ObjDataRequest={this.HandleConfirmResult}
                    />
                },
                maxWidth: '800px'
            });
        }
        else {
            this.showMessage("Loại tính thưởng này chưa tính nên không được chốt thưởng.")
        }


    }

    onhandleHistoryItem(objId) {

        const { gridDataSource } = this.state;
        const dataFind = gridDataSource.find(n => {
            return n.RewardComputeListID == objId[0].value
        });

        const postData = [
            {
                SearchKey: "@REWARDCOMPUTELISTID",
                SearchValue: objId[0].value
            },


        ];

        this.props.callFetchAPI(APIHostName, SearchConfirmLogAPIPath, postData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.MessageDetail);
            }
            else {

                if (apiResult.ResultObject.length > 0) {
                    const tempData = apiResult.ResultObject.map((item, index) => {

                        if (item.ConfirmLogType == 1) {
                            item.ConfirmLogTypeName = item.ConfirmLogType + " - " + "Chốt thưởng"
                        }
                        else {
                            item.ConfirmLogTypeName = item.ConfirmLogType + " - " + "Bỏ chốt thưởng"
                        }
                        return item;
                    })
                    this.onShowModalHistory(tempData, dataFind);
                }
                else {
                    this.showMessage("Không tồn tại lịch sử chốt thưởng.");
                }

            }
        })

    }

    onShowModalHistory(dataSource = [], dataItem) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Danh sách lịch sử quản lý công nợ",
            content: {
                text: <DataGirdHistory
                    dataSource={dataSource}
                    dataItem={dataItem}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    onHandleConfirmList(confirmListID, pkColumnName) {
        const { gridDataSource, SearchData } = this.state;
        let listMLObject = [];
        confirmListID.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });

        let isComputed = true;

        const dataFind = gridDataSource.filter(item1 => {
            return listMLObject.find(item2 => item1.RewardComputeListID == item2.RewardComputeListID)
        });


        dataFind.map((item, index) => {
            if(!item.IsComputed){
                isComputed= false
            }
        })
        if (isComputed) {
            this.props.callFetchAPI(APIHostName, "api/RewardComputeSchedule/AddList", dataFind).then(apiResult => {
                console.log("addd",dataFind, apiResult)
                if (!apiResult.IsError) {
                    this.addNotification(apiResult.Message, apiResult.IsError)
                    this.callSearchData(SearchData);
                }
                else {
                    this.showMessage(apiResult.Message)
                }
            });
        }
          else {
            this.showMessage("Ngày tính thưởng này chưa tính nên không được thêm vào danh sách lịch tính thưởng.")
        }
            
    }

    onHandleConfirmListItem(confirmListID, pkColumnName) {
        const { gridDataSource } = this.state;
        let listMLObject = [];
        confirmListID.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });

        let isComputed = true;

        const dataFind = gridDataSource.filter(item1 => {
            return listMLObject.find(item2 => item1.RewardComputeListID == item2.RewardComputeListID)
        });


        dataFind.map((item, index) => {
            if(!item.IsComputed){
                isComputed= false
            }
        })
        console.log("arrTemp", dataFind, isComputed)


        if (isComputed) {
            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: "Chốt thưởng",
                content: {
                    text: <ConfirmListModal
                        dataSource={dataFind}
                        ObjDataRequest={this.HandleConfirmResult}
                    />
                },
                maxWidth: '800px'
            });
        }
        else {
            this.showMessage("Loại tính thưởng này chưa tính nên không được chốt thưởng.")
        }

    }


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách tính thưởng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                    classNamebtnSearch="groupAction"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    onUpdateItem={this.onhandleUpdateItem.bind(this)}
                    onHistoryItem={this.onhandleHistoryItem.bind(this)}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={'chkSelect'}
                    PKColumnName={'RewardComputeListID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={31}
                    RequirePermission={TMS_REWARDCOMPUTELIST_VIEW}
                    IsExportFile={false}
                    ref={this.gridref}
                    IsUpdateListItem={true}
                    onUpdateListItem={this.onHandleConfirmListItem.bind(this)}
                    TitleUpdateListItem="Chốt thưởng"
                    IsUpdateList={true}
                    onUpdateList={this.onHandleConfirmList.bind(this)}
                    TitleUpdateList="Thêm lịch tính thưởng"

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
