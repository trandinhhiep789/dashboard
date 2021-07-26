import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from "react-dynamic-modal";
import { Link } from "react-router-dom";
import moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PagePath, APISearch, APIHostName, MLObjectDefinition, APIDeleteList, listElement, dataSearch, APIExportExcel
} from "./constants";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal } from '../../../../actions/modal';
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import AddModalCom from './AddModal';

class SearchCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: null,
            currentPage: 1,
            dataSearch: dataSearch,
            stateObjCheckboxs: {}
        }

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.callSearchData = this.callSearchData.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExportFile = this.handleExportFile.bind(this);
        this.handleSetExcelData = this.handleSetExcelData.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.dataSearch);
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

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    callSearchData(dataSearchArg) {
        this.props.callFetchAPI(APIHostName, APISearch, dataSearchArg).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        return {
                            ...item,
                            IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt'
                        }
                    });

                    this.setState({
                        dataGrid: arrResult
                    });

                } else {
                    this.setState({
                        dataGrid: apiResult.ResultObject
                    });
                }
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleSearch(formData, MLObject) {
        const searchData = this.state.dataSearch.map(element => {
            switch (element.SearchKey) {
                case "@Keyword":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.Keyword
                    }
                case "@TYPENAME":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.Typename
                    }
                case "@FROMDATE":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.CreatedOrderTimeFo
                    }
                case "@TODATE":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.CreatedOrderTimeTo
                    }
                case "@COORDINATORSTOREID":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.CoordinatorStoreID
                    }
                default:
                    return element;
            }
        })

        this.setState({
            dataSearch: searchData
        })

        this.callSearchData(searchData);
    }

    handleChangePage(PageNumber) {
        if (PageNumber == this.state.currentPage) return;

        const { dataSearch } = this.state;

        const searchData = dataSearch.map(element => {
            if (element.SearchKey == "@PAGENUMBER") {
                return {
                    SearchKey: element.SearchKey,
                    SearchValue: PageNumber
                }
            } else {
                return element;
            }
        })

        this.setState({
            currentPage: PageNumber,
            dataSearch: searchData
        });

        this.callSearchData(searchData);
    }

    handleCheckbox(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        if (name == "checkAll") {
            const objCheckAll = this.state.dataGrid.reduce((acc, val) => {
                return {
                    ...acc,
                    [val.ShipmentQualityAssessID]: value
                }
            }, []);
            this.setState({
                stateObjCheckboxs: {
                    ...this.state.stateObjCheckboxs,
                    ...objCheckAll
                }
            })
        } else {
            this.setState({
                stateObjCheckboxs: {
                    ...this.state.stateObjCheckboxs,
                    [name]: value
                }
            })
        }


    }

    handleAdd() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm đánh giá chất lượng giao hàng',
            content: {
                text: <AddModalCom />
            },
            maxWidth: '800px'
        });
    }

    handleDelete() {
        const { stateObjCheckboxs } = this.state;
        let strDelete = "";
        for (const key in stateObjCheckboxs) {
            if (Object.hasOwnProperty.call(stateObjCheckboxs, key)) {
                if (stateObjCheckboxs[key]) {
                    strDelete += `,${key}`;
                }
            }
        }
        if (strDelete == "") {
            alert("Chọn ít nhất một dòng để xóa");
        } else {
            this.props.callFetchAPI(APIHostName, APIDeleteList, strDelete).then(apiResult => {
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.dataSearch);
                }
                this.showMessage(apiResult.Message);
            });
        }
    }

    handleSetExcelData(argumentData) {
        try {
            const ws = XLSX.utils.json_to_sheet([{}]);
            XLSX.utils.sheet_add_json(ws, argumentData);

            const wb = {
                Sheets: { "Đánh giá chất lượng giao hàng": ws },
                SheetNames: ["Đánh giá chất lượng giao hàng"]
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob(
                [excelBuffer],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
            );
            FileSaver.saveAs(data, "Đánh giá chất lượng giao hàng.xlsx");

            this.addNotification("Xuất file thành công!", false);
        } catch (error) {
            this.addNotification("Lỗi xuất file!", true);
        }
    }

    handleExportFile() {
        const { dataSearch } = this.state;

        const postData = dataSearch.filter(item => item.SearchKey != "@PAGENUMBER" && item.SearchKey != "@PAGESIZE");

        this.props.callFetchAPI(APIHostName, APIExportExcel, postData).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length == 0) {
                    this.showMessage("Dữ liệu trống, không thể xuất file");
                } else {
                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        // return {
                        //     ...item,
                        //     IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt'
                        // }
                        return {
                            "Mã vận đơn": item.ShipmentOrderID,
                            "Mã đơn hàng đối tác": item.PartnerSaleOrderID,
                            "Ngày tạo": moment(item.CreatedDate).format("DD/MM/YYYY"),
                            "Người tạo": item.CreatedUserFullName,
                            "Ghi chú đánh giá": item.QualityAssessNote,
                            "Đã duyệt gỡ đánh giá": item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt'
                        }
                    });

                    this.handleSetExcelData(arrResult);
                }
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { dataGrid, currentPage, stateObjCheckboxs } = this.state;

        if (dataGrid === null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="Tìm kiếm đánh giá chất lượng giao hàng"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={listElement}
                        onSubmit={this.handleSearch}
                        ref={this.searchref}
                        className="multiple"
                    />


                    <div className="col-lg-12 SearchForm">
                        <div className="card">
                            <div className="card-title">
                                <span className="title"><b>Đánh giá chất lượng giao hàng</b></span>
                            </div>

                            <div className="card-body">
                                <div className="d-flex justify-content-end mb-10 ">
                                    <div className="btn-toolbar">
                                        <div className="btn-group btn-group-sm">
                                            {/* <Link to={"/ShipmentQualityAssess/Add"}> */}
                                            {/* <button className="btn btn-info" onClick={this.handleAdd}><span className="fa fa-plus ff"> Thêm </span></button> */}
                                            {/* </Link> */}

                                            {/* <button className="btn btn-danger btn-delete ml-10" onClick={this.handleDelete}><span className="fa fa-remove"> Xóa </span></button> */}

                                            <button className="btn btn-export ml-10" onClick={this.handleExportFile}>
                                                <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className=" table-responsive">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0">
                                        <thead className="thead-light">
                                            <tr>
                                                {/* <th className="jsgrid-header-cell">
                                                    <div className="checkbox">
                                                        <label>
                                                            <input name="checkAll" type="checkbox" onChange={this.handleCheckbox} className="form-control form-control-sm" />
                                                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                                        </label>
                                                    </div>
                                                </th> */}
                                                {/* <th className="jsgrid-header-cell">Chi tiết</th> */}
                                                <th className="jsgrid-header-cell">Mã vận đơn</th>
                                                <th className="jsgrid-header-cell">Mã đơn hàng đối tác</th>
                                                <th className="jsgrid-header-cell">Ngày tạo</th>
                                                <th className="jsgrid-header-cell">Người tạo</th>
                                                <th className="jsgrid-header-cell">Ghi chú đánh giá</th>
                                                <th className="jsgrid-header-cell">Đã duyệt gỡ đánh giá</th>
                                                <th className="jsgrid-header-cell">Tác vụ</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                dataGrid.map(item => {
                                                    return <tr key={item.ShipmentQualityAssessID}>
                                                        {/* <td>
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input name={item.ShipmentQualityAssessID} type="checkbox" checked={stateObjCheckboxs[item.ShipmentQualityAssessID] || false} onChange={this.handleCheckbox} className="form-control form-control-sm" />
                                                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                                                </label>
                                                            </div>
                                                        </td> */}
                                                        <td><Link to={`/ShipmentOrder/Detail/${item.ShipmentOrderID}`} target='_blank'>{item.ShipmentOrderID}</Link></td>
                                                        <td>{item.PartnerSaleOrderID}</td>
                                                        <td>{moment(item.CreatedDate).format("DD/MM/YYYY")}</td>
                                                        <td>{item.CreatedUserFullName}</td>
                                                        <td>{item.QualityAssessNote}</td>
                                                        <td>{item.IsRevokeAssessReview == 0 ? <span className='lblstatus text-warning'>Chưa duyệt</span> : (<span className='lblstatus text-success'>Đã duyệt</span>)}</td>
                                                        {/* <td><Link to={`/ShipmentQualityAssess/Edit/${item.ShipmentQualityAssessID}`}>Chỉnh sửa</Link></td> */}
                                                        <td><Link to={`/ShipmentQualityAssess/Detail/${item.ShipmentQualityAssessID}`}>Chi tiết</Link></td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <GridPage numPage={dataGrid[0] ? dataGrid[0].TotalNumPages : 1} currentPage={currentPage} onChangePage={this.handleChangePage} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
