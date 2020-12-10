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
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";

import { TMS_TMSREWARD_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleCallData = this.handleCallData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.handleCallData();
    }



    handleCallData() {
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("MLObject", formData, MLObject)
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            },
            {
                SearchKey: "@REWARDPOSITIONID",
                SearchValue: MLObject.RewardPositionID
            }
        ];
        this.callSearchData(postData);
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("aa", apiResult)
            if (!apiResult.IsError) {

                const tempDataExport = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.RewardUser,
                        "Tên nhân viên": item.FullName,
                        "Mã vận đơn": item.ShipmentOrderID,
                        "Mã đơn hàng": item.PartnerSaleOrderID,
                        "Ngày thưởng": item.RewardDate,
                        "Mã sản phẩm": item.ProductID,
                        "Tên sản phẩm": item.ProductName,
                        "Số lượng": item.Quantity,
                        "Đơn giá thưởng": item.RewardPrice,
                        "Tỷ lệ thưởng": item.RewardRatio,
                        "Vị trí thưởng": item.RewardPositionID,
                        "Loại thưởng": item.RewardTypeID + "-" + item.RewardTypeName,
                        "Tổng thưởng": item.TotalReward,

                    };

                    return element;

                })
                this.handleExportCSV(tempDataExport)
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

    handleExportCSV(Data) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        if (Data.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(Data);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, "Danh sách chi tiết thương" + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        }
        this.showMessage(result.Message)
    }

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách tổng thương giao hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                    TitleButton="Xuất Dữ liệu"
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
