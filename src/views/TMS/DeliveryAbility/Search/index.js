import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import {
    APIHostName, PagePath, SearchElementList,
    tableHead, SearchMLObjectDefinition, AddAPIPath,
    DataGridColumnList, SearchAPIPath,
    IDSelectColumnName, PKColumnName, AddLink, TitleFormSearch, InitSearchParams, EditLink
} from '../constants'
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import { MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import { DELIVERYABILITY_VIEW, DELIVERYABILITY_DELETE } from "../../../../constants/functionLists";
import { ERPCOMMONCACHE_STORE } from '../../../../constants/keyCache'
import { Link } from 'react-router-dom';
import DatagirdDeliveryAbility from '../Component/DatagirdDeliveryAbility';

export class Search extends Component {
    constructor(props) {
        super(props)
        this.callSearchData = this.callSearchData.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            SearchData: InitSearchParams,
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            dataExport: [],
            deliveryGoodSgroup: [],
            PageNumber: 1,
            gridDataSourceNew: [],
        }

        this.notificationDOMRef = React.createRef()
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath)

        this.callSearchData(this.state.SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        const { StoreID } = MLObject;
        const DataSearch = [
            {
                SearchKey: "@OUTPUTSTOREID",
                SearchValue: StoreID.toString()
            }
        ];
        this.setState({
            SearchData: DataSearch
        });
        this.callSearchData(DataSearch);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("callSearchData", apiResult, searchData)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message)
            } else {

                let dataSource = apiResult.ResultObject.reduce((catsSoFar, item, index) => {
                    if (!catsSoFar[item.DeliveryAbilityID]) catsSoFar[item.DeliveryAbilityID] = [];
                    catsSoFar[item.DeliveryAbilityID].push(item);
                    return catsSoFar;
                }, {});

                console.log("dataSource 222", dataSource)

                this.setState({
                    gridDataSource: apiResult.ResultObject
                })
                this.callDataDeliveryGoodSgroup(dataSource);
            }
        })
    }

    callDataDeliveryGoodSgroup(dataSource) {
        const intDeliveryGoodsGroupID = -1
        this.props.callFetchAPI(APIHostName, "api/DeliveryGoodsGroup/LoadNew", intDeliveryGoodsGroupID).then(apiResult => {
            console.log("callDataDeliveryGoodSgroup", intDeliveryGoodsGroupID, apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message)
            }
            else {

                let arrDeliveryGoodSgroup = [];

                arrDeliveryGoodSgroup = apiResult.ResultObject.map((item, index) => {
                    item.Name = item.DeliveryGoodsGroupName;
                    item.ID = item.DeliveryGoodsGroupID;
                    return item
                })

                this.setState({
                    deliveryGoodSgroup: arrDeliveryGoodSgroup,
                })

                let tmpDatasource = []

                Object.keys(dataSource).map(function (key) {
                    // dataSource[key]["Child"] = [...dataSource[key]]
                    const tmsResult = apiResult.ResultObject.map(e => {
                        let find = dataSource[key].find(f => { return e.DeliveryGoodsGroupID == f.DeliveryGoodsGroupID })
                        e.TotalAbility = !!find ? find.TotalAbility : 0
                        // return { e }
                        return {
                            DeliveryGoodsGroupID: e.DeliveryGoodsGroupID,
                            DeliveryGoodsGroupName: e.DeliveryGoodsGroupName,
                            TotalAbility: e.TotalAbility,
                        }
                    })
                    // console.log("tmsResult", tmsResult)
                    // dataSource[key]["Resource"] = [...tmsResult]
                    tmpDatasource.push({
                        Child: [...dataSource[key]],
                        Resource: [...tmsResult],
                        StoreName: dataSource[key][0].StoreName,
                        DeliveryAbilityID: dataSource[key][0].DeliveryAbilityID,
                        OutputStoreID: dataSource[key][0].OutputStoreID,
                        DeliveryTimeFrameID: dataSource[key][0].DeliveryTimeFrameID,
                        DeliveryTimeFrameName: dataSource[key][0].DeliveryTimeFrameName,
                        WeekDaysList: dataSource[key][0].WeekDaysList,
                    })
                })

                // console.log("dataSource 333", dataSource)
                // console.log("tmpDatasource", tmpDatasource)

                this.setState({
                    gridDataSourceNew: tmpDatasource
                })
            }
        })
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

    handleExportFile(result) {
        this.addNotification(result.Message);
    }



    handleImportFile() {

    }

    handleExportFile() {

    }

    handleDelete(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });

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

    handleonChangePage() {

    }

    handleonChangeView() {

    }

    handleonSearchEvent() {

    }

    onChangePageLoad() {

    }

    handlePrint() {

    }

    render() {
        const { deliveryGoodSgroup, gridDataSource, gridDataSourceNew } = this.state;
        // console.log("111", deliveryGoodSgroup,gridDataSource)
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />
        
                <div className="col-lg-12 SearchForm">
                    <DatagirdDeliveryAbility
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSourceNew}
                        IsGroupColumnTable={true}
                        dataColumGroup={this.state.deliveryGoodSgroup}
                        AddLink={AddLink}
                        EditLink={EditLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete.bind(this)}
                        onChangePage={this.handleonChangePage.bind(this)}
                        onChangeView={this.handleonChangeView.bind(this)}
                        onSearchEvent={this.handleonSearchEvent.bind(this)}
                        onChangePageLoad={this.onChangePageLoad.bind(this)}
                        onPrint={this.handlePrint.bind(this)}
                        IsDelete={true}
                        IsAdd={true}
                        isHideHeaderToolbar={false}
                        PageNumber={this.state.PageNumber}
                        // RequirePermission={DELIVERYABILITY_VIEW}
                        // DeletePermission={DELIVERYABILITY_DELETE}
                        IsExportFile={true}
                        IsImportFile={true}
                        IsAutoPaging={true}
                        RowsPerPage={20}
                    />
                </div>


                {/* <div className="col-lg-12 SearchForm">
                    <div className="card">
                        <div className="card-body">
                            <div className="flexbox mb-10 ">
                                <div></div>
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <Link to="/DeliveryAbility/Add">
                                            <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                <span className="fa fa-plus ff"> Thêm </span>
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-delete ml-10" title="" data-provide="tooltip" data-original-title="Xóa">
                                            <span className="fa fa-remove"> Xóa </span>
                                        </button>
                                        <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file">
                                            <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                        </button>
                                        <button type="button" className="btn btn-export  ml-10">
                                            <span className="fa fa-exchange"> Import File </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className=" table-responsive">
                                <table id="" className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell " style={{ width: 60 }}>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" className="form-control form-control-sm" />
                                                        <span className="cr">
                                                            <i className="cr-icon fa fa-check"></i>
                                                        </span>
                                                    </label>
                                                </div>
                                            </th>
                                            <th className="jsgrid-header-cell" style={{ width: 150 }}>Siêu thị</th>
                                            <th className="jsgrid-header-cell" style={{ width: 100 }}>Khung giờ làm việc</th>

                                            {
                                                this.state.deliveryGoodSgroup && this.state.deliveryGoodSgroup.map((item, index) => {
                                                    return (
                                                        <th key={index} className="jsgrid-header-cell" style={{ width: 100 }}>{item.DeliveryGoodsGroupName}</th>
                                                    )
                                                })
                                            }
                                            <th className="jsgrid-header-cell" style={{ width: 200 }}>Thứ áp dụng</th>
                                            <th className="jsgrid-header-cell" style={{ width: 100 }}>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !!gridDataSourceNew && gridDataSourceNew.map((item,) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" name="chkSelect" className="form-control form-control-sm" value={item.DeliveryAbilityID} />
                                                                    <span className="cr">
                                                                        <i className="cr-icon fa fa-check"></i>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>{item.OutputStoreID + "-" + item.StoreName}</td>
                                                        <td>{item.DeliveryTimeFrameName}</td>
                                                        {
                                                            !!item.Resource && item.Resource.map((item1, index1) => {
                                                                return (
                                                                    <td key={index1}>{item1.TotalAbility}</td>
                                                                )
                                                            })
                                                        }
                                                        <td>{item.WeekDaysList}</td>
                                                        <td>chỉnh sửa</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <nav>
                                <ul className="pagination justify-content-center">
                                    <li className="page-item"><strong>Trang(1/1):</strong> </li>
                                    <li className="page-item disabled">
                                        <a className="page-link" data-pagenum="1" data-linktext="previous">
                                            <span className="fa fa-step-backward" data-pagenum="1"></span>
                                        </a>
                                    </li>
                                    <li className="page-item disabled">
                                        <a className="page-link" data-pagenum="1" data-linktext="previous">
                                            <span className="ti-arrow-left" data-pagenum="1"></span>
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" data-pagenum="1">1</a>
                                    </li>
                                    <li className="page-item disabled">
                                        <a className="page-link" id="next" data-pagenum="1" data-linktext="next">
                                            <span className="ti-arrow-right" data-pagenum="1"></span>
                                        </a>
                                    </li>
                                    <li className="page-item disabled">
                                        <a className="page-link" id="next" data-pagenum="1" data-linktext="next">
                                            <span className="fa fa-step-forward" data-pagenum="1"></span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div> */}



            </React.Fragment>

        )
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
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
