import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { PagePath, SearchMLObjectDefinition, SearchElementList, GridColumnList, APIHostName, SearchAPIPath } from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { toIsoStringCus } from "../../../../../utils/function";
import { showModal, hideModal } from "../../../../../actions/modal";
import { MODAL_TYPE_DOWNLOAD_EXCEL, MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";

class SearchCom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.callSearchData = this.callSearchData.bind(this);
    this.handleExportExcel = this.handleExportExcel.bind(this);
    this.callSearchDataExportExcel = this.callSearchDataExportExcel.bind(this);
    this.handleCallData = this.handleCallData.bind(this);
    this.handleHistorySearch = this.handleHistorySearch.bind(this);
    this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this);

    this.state = {
      IsCallAPIError: false,
      GridDataSource: [],
      IsLoadDataComplete: false,
      DataExport: [],
      TemplateID: "26",
    };
    this.gridref = React.createRef();
    this.searchref = React.createRef();
  }

  componentDidMount() {
    this.props.updatePagePath(PagePath);
    this.getCacheKeyConfig();
  }

  getCacheKeyConfig() {
    this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((apiResult) => {
      if (apiResult.IsError) {
        this.showMessage(apiResult.Message);
      } else {
        let templateID = apiResult.ResultObject.CacheData.filter((x) => x.TMSConfigID == "TEMPLATE_EXPORT_NOTREWARD");

        this.setState({
          TemplateID: templateID[0].TMSConfigValue,
        });
      }
    });
  }

  handleCallData() {
    const { SearchData } = this.state;
    this.callSearchData(SearchData);
  }

  handleSearchSubmit(formData, MLObject) {
    const postData = [
      {
        SearchKey: "@MONTH",
        SearchValue: toIsoStringCus(new Date(MLObject.Month).toISOString()),
      },
      {
        SearchKey: "@LISTSHIPMENTORDERTYPEID",
        SearchValue: MLObject.ShipmentOrderTypeID.toString(),
      },
    ];

    this.callSearchData(postData);
  }

  callSearchData(searchData) {
    this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
      if (!apiResult.IsError) {
        this.setState({ GridDataSource: apiResult.ResultObject });
      } else {
        this.showMessage(apiResult.Message);
      }
    });
  }

  handleExportExcel(formData, MLObject) {
    const postData = [
      {
        SearchKey: "@MONTH",
        SearchValue: toIsoStringCus(new Date(MLObject.Month).toISOString()),
      },
      {
        SearchKey: "@LISTSHIPMENTORDERTYPEID",
        SearchValue: MLObject.ShipmentOrderTypeID.toString(),
      },
    ];

    const postDataNew = {
      DataExportTemplateID: this.state.TemplateID,
      LoadDataStoreName: "TMS.TMS_LISTNOTEREWARDREPORT",
      KeyCached: "TMS_NOTREWARD_EXPORT",
      SearchParamList: postData,
      ExportDataParamsDescription: "MONTH: " + toIsoStringCus(new Date(MLObject.Month).toISOString()) + " - SHIPMENTORDERTYPEID: " + MLObject.ShipmentOrderTypeID.toString(),
    };

    this.callSearchDataExportExcel(postDataNew);
  }

  onShowModalDownloadFile(data) {
    this.props.showModal(MODAL_TYPE_DOWNLOAD_EXCEL, {
      title: "Tải file",
      URLDownloadFile: data,
      maxWidth: "300px",
    });
  }

  callSearchDataExportExcel(searchData) {
    this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", searchData).then((apiResult) => {
      if (!apiResult.IsError) {
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
          title: "Tải file",
          maxWidth: "1200px",
          ParamRequest: { DataExportTemplateID: this.state.TemplateID },
        });
      } else {
        this.showMessage(apiResult.Message);
      }
    });
  }

  showMessage(message) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} />);
  }

  handleExportCSV(Data) {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    let result;
    if (Data.length == 0) {
      result = {
        IsError: true,
        Message: "Dữ liệu không tồn tại. Không thể xuất file!",
      };
    } else {
      const ws = XLSX.utils.json_to_sheet(Data);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });

      FileSaver.saveAs(data, "Danh sách chi tiết thương" + fileExtension);

      result = {
        IsError: false,
        Message: "Xuất file thành công!",
      };
    }
    this.showMessage(result.Message);
  }

  handleHistorySearch() {
    this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
      title: "Tải file",
      maxWidth: "1200px",
      ParamRequest: { DataExportTemplateID: this.state.TemplateID },
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm
          className="multiple"
          classNamebtnSearch="groupAction"
          FormName="Tìm kiếm danh sách vận đơn không được tính thưởng"
          MLObjectDefinition={SearchMLObjectDefinition}
          listelement={SearchElementList}
          ref={this.searchref}
          className="multiple"
          TitleButton="Tìm kiếm"
          IsButtonhistory={true}
          IsShowButtonSearch={true}
          onHistorySubmit={this.handleHistorySearch}
          onSubmit={this.handleSearchSubmit}
          onExportSubmit={this.handleExportExcel}
          colGroupAction={4}
          IsButtonExport={true}
        />

        <DataGrid
          dataSource={this.state.GridDataSource}
          IDSelectColumnName={"ShipmentOrderID"}
          IsAutoPaging={true}
          isHideHeaderToolbar={false}
          IsPrint={false}
          IsShowButtonAdd={false}
          IsShowButtonDelete={false}
          IsShowButtonPrint={false}
          listColumn={GridColumnList}
          PKColumnName={"ShipmentOrderID"}
          ref={this.gridref}
          // RequirePermission={TMS_NOTREWARD_EXPORT}
          RowsPerPage={50}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePagePath: (pagePath) => {
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
    },
  };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
