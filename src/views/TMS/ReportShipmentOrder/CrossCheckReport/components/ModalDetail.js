import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { SearchElementDetailList, SearchMLObjectDefinitionDetail } from '../constants'
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from '../../../../../common/components/DataGrid'
import { formatMonthYear } from "../../../../../common/library/CommonLib.js";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../../actions/modal';
export default class ModalDetailCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExportFile: false,
            date: this.props.date,
            dataSource: this.props.dataSource,
            DataSource: [],
        }

        this.handleExportFile = this.handleExportFile.bind(this);
        this.addNotification = this.addNotification.bind(this);

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const { dataSource } = this.props;
        this.callSearchData(objDataNewol)
    }

    callSearchData(searchData) {

       let searchData = {
            "storedName": "ERP_TMS_RPTDETAILRETURNREQUEST",
            "params": [
                {
                    "name": "V_FROMDATE",
                    "value": Date.parse(date),
                    "op": "timestamp"
                },
                {
                    "name": "V_TODATE",
                    "value": Date.parse(date),
                    "op": "timestamp"
                },
                {
                    "name": "V_INPUTTYPEIDLIST",
                    "value": "2064,7,13",
                    "op": "array"
                },
                {
                    "name": "V_ISCHECKVIEWDIFFERENCE",
                    "value": 0,
                    "op": "array"
                },
                {
                    "name": "V_PAGEINDEX",
                    "value": 1,
                    "op": "array"
                },
                {
                    "name": "V_PAGESIZE",
                    "value": 100,
                    "op": "array"
                }

            ]
        }


        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/CrossCheckReportDetail", searchData).then(apiResult => {
           

            if (!apiResult.IsError) {
                this.setState({
                    DataSource: apiResult.ResultObject,
                });
            }
            else {
              
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

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleSearchSubmit(formData, MLObject) {
        let searchData = {
            "storedName": "ERP_TMS_RPTDETAILRETURNREQUEST",
            "params": [
                {
                    "name": "V_FROMDATE",
                    "value": Date.parse(date),
                    "op": "timestamp"
                },
                {
                    "name": "V_TODATE",
                    "value": Date.parse(date),
                    "op": "timestamp"
                },
                {
                    "name": "V_INPUTTYPEIDLIST",
                    "value": "2064,7,13",
                    "op": "array"
                },
                {
                    "name": "V_ISCHECKVIEWDIFFERENCE",
                    "value": 0,
                    "op": "array"
                },
                {
                    "name": "V_PAGEINDEX",
                    "value": 1,
                    "op": "array"
                },
                {
                    "name": "V_PAGESIZE",
                    "value": 100,
                    "op": "array"
                }

            ]
        }
    }

    render() {
        const { UserName, Month, listColumn, dataSource, fileName, dataExport } = this.props;
        const {DataSource} = this.props;
        const { isExportFile } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />



                <SearchForm
                    FormName="Tìm kiếm danh sách báo đối soát chi tiết"
                    MLObjectDefinition={SearchMLObjectDefinitionDetail}
                    listelement={SearchElementDetailList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={listColumn}
                    dataSource={this.state.DataSource}
                    IDSelectColumnName={""}
                    PKColumnName={""}
                    IsDelete={false}
                    IsAutoPaging={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    RowsPerPage={10}
                    IsExportFile={isExportFile}
                    DataExport={dataExport}
                    onExportFile={this.handleExportFile}
                    fileName={fileName}
                />
            </React.Fragment >
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
      
        // callFetchAPI: (hostname, hostURL, postData) => {
        //     return dispatch(callFetchAPI(hostname, hostURL, postData));
        // },
        // showModal: (type, props) => {
        //     dispatch(showModal(type, props));
        // },
        // hideModal: (type, props) => {
        //     dispatch(hideModal(type, props));
        // }
    };
};

const ModalDetail = connect(mapStateToProps, mapDispatchToProps)(ModalDetailCom);
export default ModalDetail;
