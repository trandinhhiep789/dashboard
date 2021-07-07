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
import { toIsoStringCus } from '../../../../../utils/function'
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_DOWNLOAD_EXCEL, MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleCallData = this.handleCallData.bind(this);
        this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this)

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            dataExport: [],
            templateID: ""
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
         this.getCacheKeyConfig();
    }


    getCacheKeyConfig() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                let templateID = apiResult.ResultObject.CacheData.filter(x => x.TMSConfigID == "TEMPLATE_EXPORT_REWARDDETAIL");
                this.setState({
                    templateID: templateID[0].TMSConfigValue,
                })
            }
        })
    }



    handleCallData() {
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        // console.log("MLObject", formData, MLObject)

        let result, result2;

        if (MLObject.RewardTypeID != -1 && MLObject.RewardTypeID != null && MLObject.RewardTypeID != "") {
            result = MLObject.RewardTypeID.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result = ""
        }

        if (MLObject.RewardPositionID != -1 && MLObject.RewardPositionID != null && MLObject.RewardPositionID != "") {
            result2 = MLObject.RewardPositionID.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result2 = ""
        }

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())//MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())//MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: result //MLObject.RewardTypeID
            },
            {
                SearchKey: "@REWARDPOSITIONID",
                SearchValue: result2 //MLObject.RewardPositionID
            }
        ];

        const postDataNew = {
            DataExportTemplateID: this.state.templateID,
            LoadDataStoreName: 'TMS.TMS_RWD_EXP',
            KeyCached: "TMS_TMSREWARD_EXPORT",
            SearchParamList: postData,
            ExportDataParamsDescription: "FROMDATE: " + toIsoStringCus(new Date(MLObject.FromDate).toISOString()) + " - TODATE: " + toIsoStringCus(new Date(MLObject.ToDate).toISOString()) + " - REWARDTYPEID: " + result + " - REWARDPOSITIONID: " + result2
        }

        this.callSearchData(postDataNew);
    }


    onShowModalDownloadFile(data) {
        this.props.showModal(MODAL_TYPE_DOWNLOAD_EXCEL, {
            title: "Tải file",
            URLDownloadFile: data,
            maxWidth: '300px'
        });
    }


    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", searchData).then(apiResult => {
            console.log("apiResult", apiResult, searchData)
            if (!apiResult.IsError) {

                // const tempDataExport = apiResult.ResultObject.map((item, index) => {
                //     let element = {
                //         "Mã nhân viên": item.RewardUser.trim(),
                //         "Tên nhân viên": item.FullName.trim(),
                //         "Mã vận đơn": item.ShipmentOrderID.trim(),
                //         "Mã đơn hàng": item.PartnerSaleOrderID.trim(),
                //         "Ngày thưởng": item.RewardDate.trim(),
                //         "Mã sản phẩm": item.ProductID.trim(),
                //         "Tên sản phẩm": item.ProductName.trim(),
                //         "Số lượng": item.Quantity,
                //         "Đơn giá thưởng": item.RewardPrice,
                //         "Tỷ lệ thưởng": item.RewardRatio,
                //         "Vị trí thưởng": item.RewardPositionID + "-" + item.RewardPositionName.trim(),
                //         "Loại thưởng": item.RewardTypeID + "-" + item.RewardTypeName.trim(),
                //         "Tổng thưởng": item.TotalReward,

                //     };

                //     return element;

                // })
                // this.handleExportCSV(tempDataExport)
                // this.onShowModalDownloadFile(apiResult.Message)

                this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
                    title: "Tải file",
                    maxWidth: '1200px',
                    ParamRequest: { DataExportTemplateID: this.state.templateID }
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
