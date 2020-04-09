import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import {
    GridColumnList,
    GridMLObjectDefinition,
    APIHostName,
    SearchAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    UpdateAPIPath,
    GridDataSource,
    ColumnListNumber
} from "./constants";
import { PIE_REQUEST_PRODUCT_LIMIT_VIEW, PIE_REQUEST_PRODUCT_LIMIT_DELETE } from "../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


class LimitCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitGrid = this.handleSubmitGrid.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            gridDataSource: GridDataSource,
            IsCallAPIError: false,
            IsCloseForm: false,
            SearchData: InitSearchParams,
            PieRequestListID: "",
            DataSourcePieRequest: []
        };
        this.notificationDOMRef = React.createRef();

    }
    componentDidMount() {
        this.props.updatePagePath(PagePath);
        let searchParams = InitSearchParams.slice();
        searchParams.push({
            SearchKey: "@PIEREQUESTLISTID",
            SearchValue: this.props.match.params.pierequestlistid.trim()
        })
        this.setState({
            PieRequestListID: this.props.match.params.pierequestlistid.trim(),
            SearchData: searchParams
        });
        this.callSearchData(searchParams);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/Load", id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({ DataSourcePieRequest: apiResult.ResultObject });
            }
        });
    }

    CheckPermissionUser(id) {
        if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs && this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.length > 0) {
            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs[0].IsFinishStep == true) {
                return false;
            }

            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.some(a => a.PiePermissionID === id)) {
                return true;
            }
        }
        return false;
    }

    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        }
        else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation";
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }


    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.gridDataSource[index], { [elementdata.Name]: elementdata.Value }, { "HasChanged": true });
        const dataSource = Object.assign([], this.state.gridDataSource, { [index]: rowGridData })
        this.setState({ gridDataSource: dataSource });
    }

    handleSubmitGrid() {
        let gridDataSource = this.state.gridDataSource.filter(x => x.HasChanged == true);
        if (gridDataSource.length > 0) {
            gridDataSource.map((row) => {
                row.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
                if (row.HasExist) {
                    row.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                }
                else {
                    row.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                }
            })

            this.props.callFetchAPI(APIHostName, UpdateAPIPath, gridDataSource).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.SearchData);
                }
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.addNotification(apiResult.Message, apiResult.IsError);
            });
        }
        else {
            this.addNotification("Không tồn tại data chỉnh sửa.", true);
        }
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                let gridDataSourceTemp = apiResult.ResultObject.slice();
                gridDataSourceTemp.map((row) => {
                    row.PieRequestListID = this.props.match.params.pierequestlistid.trim();
                    ColumnListNumber.map(item => {
                        if (row[item.Name] == 0) {
                            row[item.Name] = '';
                        }
                    });
                })
                this.setState({
                    gridDataSource: gridDataSourceTemp,
                    IsCallAPIError: apiResult.IsError,
                })
            }
        }
        );
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Giới hạn của sản phẩm</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid name="LstProduct_Limit" controltype="GridControl"
                                listColumn={GridColumnList}
                                dataSource={this.state.gridDataSource}
                                MLObjectDefinition={GridMLObjectDefinition}
                                // IDSelectColumnName={IDSelectColumnName}
                                onValueChangeInputGrid={this.valueChangeInputGrid}
                                onHandleSubmitGrid={this.handleSubmitGrid}
                                // RequirePermission={PIE_REQUEST_PRODUCT_LIMIT_VIEW}
                                // DeletePermission={PIE_REQUEST_PRODUCT_LIMIT_DELETE}
                                colspan="12"
                                RowsPerPage={10}
                                IsAutoPaging={false}
                                IsShowRowNull={true}
                                isHideHeaderToolbar={true}
                                isShowFooterToolbar={true}
                                IsAdd={this.CheckPermissionUser(14)}
                                IsDelete={this.CheckPermissionUser(14)}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Limit = connect(mapStateToProps, mapDispatchToProps)(LimitCom);
export default Limit;
