import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";
import { connect } from 'react-redux';
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";
import { showModal, hideModal } from '../../../../actions/modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import GridPage from "../../../../common/components/DataGrid/GridPage";

class DatagirdDeliveryAbilityCom extends Component {
    constructor(props) {
        super(props);
        this.getCheckList = this.getCheckList.bind(this);


        this.getCheckList = this.getCheckList.bind(this);
        const pkColumnName = this.props.PKColumnName.split(',');
        const listPKColumnName = pkColumnName.map(item => { return { key: item } });

        this.state = {
            GridData: {},
            DataSource: this.props.dataSource,
            IsCheckAll: false,
            PageNumber: this.props.PageNumber,
            ListPKColumnName: listPKColumnName,
            GridDataShip: [],
            KeywordId: '',
            printDataID: ''

        };
        this.notificationDOMRef = React.createRef();
    }



    componentDidMount() {
        if (this.props.dataSource) {
            const gridData = this.getCheckList(this.props.dataSource);
            this.setState({ GridData: gridData });
        }
        let permissionKey = this.props.RequirePermission;
        if (!permissionKey) {
            this.setState({ IsPermision: true }); return;
        }
        this.checkPermission(permissionKey).then((result) => {
            this.setState({ IsPermision: result });
        })


    }

    checkAll(e) {
        const isCheck = e.target.checked;
        const dataSource = this.props.dataSource;
        const pkColumnName = this.state.ListPKColumnName;
        const idSelectColumnName = this.props.IDSelectColumnName;
        const dataSourceFilter = this.getDisplayData(this.props.dataSource);
        let checkList = this.state.GridData[idSelectColumnName];
        let elementobject;
        dataSource.map((rowItem, rowIndex) => {
            let isMath = false;
            for (var i = 0; i < dataSourceFilter.length; i++) {
                for (var j = 0; j < pkColumnName.length; j++) {
                    if (rowItem[pkColumnName[j].key] != dataSourceFilter[i][pkColumnName[j].key]) {
                        isMath = false;
                        break;
                    }
                    else {
                        isMath = true;
                    }
                }
                if (isMath) {
                    break;
                }
            }
            const value = pkColumnName.map((obj, index) => {
                return { key: obj.key, value: rowItem[obj.key] };
            })
            if (isMath) {
                elementobject = { pkColumnName: value, IsChecked: isCheck };
            }
            else {
                elementobject = { pkColumnName: value, IsChecked: false };
            }
            checkList = Object.assign([], checkList, { [rowIndex]: elementobject });
        });
        this.setState({ GridData: { [idSelectColumnName]: checkList }, IsCheckAll: isCheck });
    }

    getCheckList(dataSource) {
        const idSelectColumnName = this.props.IDSelectColumnName;
        const pkColumnName = this.state.ListPKColumnName;
        let checkList = [];
        dataSource.map((rowItem, rowIndex) => {
            const value = pkColumnName.map((obj, index) => {
                return { key: obj.key, value: rowItem[obj.key] };
            })
            const elementobject = { pkColumnName: value, IsChecked: false };
            checkList = Object.assign([], checkList, { [rowIndex]: elementobject });
        });
        return { [idSelectColumnName]: checkList };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const gridData = this.getCheckList(nextProps.dataSource);
            this.setState({
                GridData: gridData,
                GridDataShip: [],
                DataSource: nextProps.dataSource,
                PageNumber: nextProps.PageNumber
            });
        }

        if (JSON.stringify(this.props.IsLoadData) !== JSON.stringify(nextProps.IsLoadData)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            this.setState({
                GridDataShip: []
            });
        }

    }

    handleCloseMessage() {

    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    handleInsertClickEdit(id, pkColumnName) {
        if (this.props.onInsertClickEdit != null)
            this.props.onInsertClickEdit(id, pkColumnName);
    }

    handleInsertClick() {
        if (this.props.onInsertClick != null)
            this.props.onInsertClick(this.props.MLObjectDefinition, this.props.modalElementList, this.props.dataSource);
    }


    onChangePageHandle(pageNum) {
        this.setState({ PageNumber: pageNum });
        if (this.props.onChangePage != null)
            this.props.onChangePage(pageNum);

    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            resolve(true);
                            return;
                        }
                    }
                    resolve(false)
                } else {
                    resolve('error');
                }
            });
        });
    }

    getPageCount(dataSource) {
        if (dataSource == null)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
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
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }




    renderDataGrid() {
        const dataSource = this.state.DataSource;
        // console.log("dataSource", dataSource, this.props)
        return (
            <div className=" table-responsive">
                <table id="fixtable" className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0" >
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
                                this.props.IsGroupColumnTable == true && this.props.dataColumGroup && this.props.dataColumGroup.map((item, index) => {
                                    return (
                                        <th key={index} className="jsgrid-header-cell" style={{ width: 100 }}>{item.Name}</th>
                                    )
                                })
                            }
                            <th className="jsgrid-header-cell" style={{ width: 200 }}>Thứ áp dụng</th>
                            <th className="jsgrid-header-cell" style={{ width: 100 }}>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource != null &&
                            dataSource.map((rowItem, rowIndex) => {
                                let rowClass = "jsgrid-row";
                                if (index % 2 != 0) {
                                    rowClass = "jsgrid-alt-row";
                                }



                                return (
                                    <tr key={rowIndex}>
                                        <td>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="chkSelect" className="form-control form-control-sm" value={rowItem.DeliveryAbilityID} onChange={this.checkAll.bind(this)} checked={this.state.IsCheckAll} />
                                                    <span className="cr">
                                                        <i className="cr-icon fa fa-check"></i>
                                                    </span>
                                                </label>
                                            </div>
                                        </td>
                                        <td>{rowItem.OutputStoreID + "-" + rowItem.StoreName}</td>
                                        <td>{rowItem.DeliveryTimeFrameName}</td>
                                        {
                                            !!rowItem.Resource && rowItem.Resource.map((item1, index1) => {
                                                return (
                                                    <td key={index1}>{item1.TotalAbility}</td>
                                                )
                                            })
                                        }
                                        <td>{rowItem.WeekDaysList}</td>
                                        <td>
                                            <div class="group-action">
                                                <Link title="Edit" data-id={rowItem.DeliveryAbilityID} class="btn-edit" to={this.props.EditLink + "/"+rowItem.DeliveryAbilityID.toString().trim() + "/"} >
                                                    <i class="ti-pencil"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }


    render() {
        const pageCount = this.getPageCount(this.props.dataSource);
        const datagrid = this.renderDataGrid();
        let hasHeaderToolbar = true;
        if (this.props.isHideHeaderToolbar)
            hasHeaderToolbar = false;
        let HideHeaderToolbarGroupTextBox = false;
        if (this.props.isHideHeaderToolbarGroupTextBox)
            HideHeaderToolbarGroupTextBox = true;
        let MultipleCheck = false;
        if (this.props.isMultipleCheck)
            MultipleCheck = true;
        if (this.state.IsPermision == undefined) {
            return <p className="col-md-12">Đang kiểm tra quyền...</p>
        }
        if (this.state.IsPermision == false) {
            return <p className="col-md-12">Bạn không có quyền!</p>
        }
        if (this.state.IsPermision === 'error') {
            return <p className="col-md-12">Lỗi khi kiểm tra quyền, vui lòng thử lại</p>
        }
        let classCustom;
        if (this.props.classCustom != "") {
            classCustom = "col-lg-12 SearchForm"
        }
        else {
            classCustom = ""
        }

        let IsCompleteDeliverIed = []
        if (this.props.dataSource) {
            IsCompleteDeliverIed = this.props.dataSource.filter(n => n.IsCompleteDeliverIed == true);
        }

        let isShowButtonImport = false;
        if (this.props.IsImportFile != undefined && this.props.IsImportFile != false) {
            isShowButtonImport = true;
        }

        return (
            <React.Fragment>
                <div className="card SearchForm">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card-body">

                        {hasHeaderToolbar &&
                            <div className="flexbox mb-10 ">
                                <div></div>
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        {(this.props.IsAdd == true || this.props.IsAdd == undefined) ?
                                            (!this.props.IsCustomAddLink == true ?
                                                (<Link
                                                    to={{
                                                        pathname: this.props.AddLink,
                                                        state: {
                                                            params: this.props.params
                                                        }
                                                    }}
                                                >
                                                    <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                        <span className="fa fa-plus ff"> Thêm </span>
                                                    </button>
                                                </Link>)
                                                : (
                                                    <button type="button" onClick={this.handleInsertClick.bind(this)} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                        <span className="fa fa-plus ff"> Thêm </span>
                                                    </button>
                                                )
                                            )
                                            : ""
                                        }
                                        {
                                            (this.props.IsDelete == true || this.props.IsDelete == undefined) ?
                                                (<button type="button" className="btn btn-danger btn-delete ml-10" title="" data-provide="tooltip" data-original-title="Xóa">
                                                    <span className="fa fa-remove"> Xóa </span>
                                                </button>)
                                                : ""
                                        }
                                        {this.props.IsExportFile == true &&
                                            <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file">
                                                <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                            </button>
                                        }
                                        {
                                            isShowButtonImport == true &&
                                            <button type="button" className="btn btn-export  ml-10">
                                                <span className="fa fa-exchange"> Import File </span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {datagrid}

                        {this.props.IsAutoPaging &&
                            <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle.bind(this)} />
                        }


                        {HideHeaderToolbarGroupTextBox &&
                            <div className="flexbox mb-20 ">
                                <div></div>
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <button className="btn btn-w-md btn-round btn-info" onClick={this.handleOneInsertClick}>Chọn</button>
                                        {MultipleCheck &&
                                            <button className="btn btn-w-md btn-round btn-info ml-20" onClick={this.handleMultipleInsertClick}>Chọn & Tiếp tục</button>
                                        }
                                        <button className="btn btn-w-md btn-round btn-secondary  ml-20" onClick={this.handleCloseModel} >Bỏ qua</button>
                                    </div>
                                </div>
                            </div>
                        }
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }


    }
}

const DatagirdDeliveryAbility = connect(mapStateToProps, mapDispatchToProps)(DatagirdDeliveryAbilityCom);
export default DatagirdDeliveryAbility;