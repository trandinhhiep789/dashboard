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
import { TMSSORETURNITEMREPORT_EXPORT, TMSSORETURNITEMREPORT_VIEW, TMS_TEAMLEADERBONUSFUNDREPORT_EXPORT } from "../../../../../constants/functionLists";
import moment from "moment";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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
    this.handleOnChangePage = this.handleOnChangePage.bind(this);
    this.addNotification = this.addNotification.bind(this);


    this.state = {
      IsCallAPIError: false,
      GridDataSource: [],
      IsLoadDataComplete: false,
      DataExport: [],
      TemplateID: "",
      PageIndex: 1,
      PageSize: 20,
    };

    this.gridref = React.createRef();
    this.searchref = React.createRef();
    this.notificationDOMRef = React.createRef();

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
        let templateID = apiResult.ResultObject.CacheData.filter((x) => x.TMSConfigID == "TEMPLATE_EXPORT_TMSSORETURNITEMREPORT");

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
    let fromDate = moment(formData.dtFromDate.value);
    let toDate = moment(formData.dtToDate.value);

    if (!fromDate.isValid()) {
      this.addNotification("Từ ngày không hợp lệ", true);
      return;
    }

    if (!toDate.isValid()) {
      this.addNotification("Đến ngày không hợp lệ", true);
      return;
    }

    if (fromDate > toDate) {
      this.addNotification("Từ ngày không lớn hơn đến ngày", true);
      return;
    }

    const postData = [
      {
        SearchKey: "@SHIPMENTORDERIDLIST",
        SearchValue: MLObject.ShipmentOrderList,
      },
      {
        SearchKey: "@FROMDATE",
        SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
      },
      {
        SearchKey: "@TODATE",
        SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()),
      },
      {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1,
      },
      {
        SearchKey: "@PAGESIZE",
        SearchValue: -1,
      },
    ];

    this.callSearchData(postData);
  }

  callSearchData(searchData) {
    this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
      if (!apiResult.IsError) {
        this.setState({ GridDataSource: apiResult.ResultObject});
      } else {
        this.showMessage(apiResult.Message);
      }
    });
  }

  handleExportExcel(formData, MLObject) {

    let fromDate = moment(formData.dtFromDate.value);
    let toDate = moment(formData.dtToDate.value);

    if (!fromDate.isValid()) {
      this.addNotification("Từ ngày không hợp lệ", true);
      return;
    }

    if (!toDate.isValid()) {
      this.addNotification("Đến ngày không hợp lệ", true);
      return;
    }

    if (fromDate > toDate) {
      this.addNotification("Từ ngày không lớn hơn đến ngày", true);
      return;
    }


    const postData = [
      {
        SearchKey: "@SHIPMENTORDERIDLIST",
        SearchValue: MLObject.ShipmentOrderList,
      },
      {
        SearchKey: "@FROMDATE",
        SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
      },
      {
        SearchKey: "@TODATE",
        SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()),
      },
      {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1,
      },
      {
        SearchKey: "@PAGESIZE",
        SearchValue: -1,
      },
    ];

    const postDataNew = {
      DataExportTemplateID: this.state.TemplateID,
      LoadDataStoreName: "TMS.RPT_DYN_SO_RETURNITEM",
      KeyCached: TMSSORETURNITEMREPORT_EXPORT,
      SearchParamList: postData,
      ExportDataParamsDescription: "SHIPMENTORDERIDLIST: " + MLObject.KeyWord + " - FROMDATE: " + toIsoStringCus(new Date(MLObject.FromDate).toISOString()) + " - TODATE: " + toIsoStringCus(new Date(MLObject.ToDate).toISOString()) + " - PAGEINDEX: " + 1 + " - PAGESIZE: " + -1
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

  handleHistorySearch() {
    this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
      title: "Tải file",
      maxWidth: "1200px",
      ParamRequest: { DataExportTemplateID: this.state.TemplateID },
    });
  }

  handleOnChangePage(pageNumber) {
    let changeState = this.state;

    changeState = { ...changeState, PageIndex: pageNumber };
    this.setState(changeState);
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

  render() {
    return (
      <React.Fragment>
        <ReactNotification ref={this.notificationDOMRef} />
        <SearchForm
          className="multiple"
          classNamebtnSearch="groupAction"
          FormName="Tìm kiếm Báo cáo nhập trả trên TMS"
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
          RequirePermission={TMSSORETURNITEMREPORT_VIEW}
          RowsPerPage={this.state.PageSize}
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
