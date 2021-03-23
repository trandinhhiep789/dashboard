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
    GridColumnListShipmentOrder,
    APIHostName,
    SearchAPIPath,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_INVESTIGATION_SO_STATUS } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import InfoShipmentOrder from "../InfoShipmentOrder";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            dataSource: [],
            gridDataSource: [],
            IsLoadDataComplete: false,
            gridDataSourceShipmentOrder: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
        ];
        this.callSearchData(postData)

    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log(apiResult)
            if (!apiResult.IsError) {

                const tempData = apiResult.ResultObject.ShipmentOrderType_WorkFlowList.map((item, index) => {
                    item.ProcessFullName = item.ProcessUser + "-" + item.ProcessUserName
                    return item;
                })
                this.setState({
                    gridDataSource: tempData,
                    dataSource: apiResult.ResultObject,
                })

            }
            else {
                this.setState({
                    gridDataSource: []
                })
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


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách trạng thái vận đơn"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                />

                <InfoShipmentOrder dataShipmentOder={this.state.dataSource} />

                <DataGrid
                    listColumn={GridColumnListShipmentOrder}
                    dataSource={this.state.dataSource.ShipmentOrder_DeliverUserList}
                    IsFixheaderTable={false}
                    IDSelectColumnName={'DeliverUserID'}
                    PKColumnName={'DeliverUserID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    // RequirePermission={TMS_INVESTIGATION_SO_STATUS}
                    ref={this.gridref}
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={false}
                    IDSelectColumnName={'WorkFlowID'}
                    PKColumnName={'WorkFlowID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    RequirePermission={TMS_INVESTIGATION_SO_STATUS}
                    ref={this.gridref}
                />

                {/* <div className="card">
                    <h4 className="card-title"><strong>Lịch sử xử lý</strong></h4>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: 100 }} >Thời gian</th>
                                        <th className="jsgrid-header-cell" style={{ width: 250 }} >Bước xử lý</th>
                                        <th className="jsgrid-header-cell" style={{ width: 150 }} >Nhân viên</th>
                                        <th className="jsgrid-header-cell" style={{ width: 150 }} >Hình ảnh</th>
                                        <th className="jsgrid-header-cell" style={{ width: 70 }} >Tọa độ GPS</th>
                                        <th className="jsgrid-header-cell" style={{ width: 250 }} >Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
                {/* 
                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={false}
                    IDSelectColumnName={'WorkFlowID'}
                    PKColumnName={'WorkFlowID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    RequirePermission={TMS_INVESTIGATION_SO_STATUS}
                    ref={this.gridref}
                /> */}


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
