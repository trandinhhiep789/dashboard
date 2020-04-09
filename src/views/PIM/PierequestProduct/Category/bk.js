import React from "react";
import { Redirect } from "react-router-dom";
import { ModalManager } from 'react-dynamic-modal';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    SearchAPIPath,
    UpdateAPIPath,
    InitSearchParams,
    LIST_CATEGORY_CACHE,
    PagePath
} from "./constants";
import InputGridCell from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { error } from "util";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class CategoryCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            LstCategory_member: [],
            PieRequest_Product_Cat: {},
            IsCallAPIError: false,
            FormContent: "",
            RequestDate: "",
            PieRequestDate: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            SearchData: InitSearchParams,
            cacheCategoryType: [],
            cssNotification: "",
            iconNotification: ""
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
        this.GetAllCategoryType();
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    componentDidMount() {
        this.GetAllCategoryType();
        this.getCacheCategory();
        this._getPieRequestDateByID();
        this.props.updatePagePath(PagePath);
    }

    GetAllCategoryType() {
        let searchData = [{
            SearchKey: "@Keyword",
            SearchValue: ""
        }];
        searchData.push({
            SearchKey: "@PIEREQUESTLISTID",
            SearchValue: this.props.match.params.pierequestlistid.trim()
        })

        this.props.callFetchAPI(APIHostName, "api/CategoryType/GetAllCategoryType", searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                if (!apiResult.IsError) {
                    this.setState({ gridDataSource: apiResult.ResultObject })
                }
            }
        });
    }


    _getPieRequestDateByID() {
        const strPieRequestID = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/GetPieRequestDateById", strPieRequestID).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    PieRequestDate: apiResult.ResultObject.RequestDate,
                });
            }
        });
    }

    getCacheCategory() {
        this.props.callGetCache("PIMCACHE.CATEGORY").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    cacheCategoryType: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    onInputChange(data, index, oldValue) {
        const element = Object.assign({}, this.state.gridDataSource[index], { CategoryID: data.Value }, { "HasChanged": true }, { "OldCategoryID": oldValue });
        const temp_datasource = Object.assign([], this.state.gridDataSource, { [index]: element });
        this.setState({ gridDataSource: temp_datasource });
    }

    handleSubmit() {
        this.state.PieRequest_Product_Cat = this.state.gridDataSource
        let Username = this.props.AppInfo.LoginInfo.Username;
        let RequestDate = this.state.PieRequestDate;
        let PieRequestListID = this.props.match.params.pierequestlistid.trim();
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        let gridDataSource = [];
        this.state.gridDataSource.map((data, index) => {
            if (data.HasChanged) {
                data.PieRequestListID = PieRequestListID;
                data.IsOldValue = 0;
                data.RequestDate = RequestDate;
                data.Comments = "";
                data.LoginLogID = LoginLogID;
                data.CreatedUser = Username;
                gridDataSource.push(data);
            }

        })

        this.props.callFetchAPI(APIHostName, "api/PieRequest_Product_Cat/Add", gridDataSource).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.GetAllCategoryType();
        });
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            })
        }
        else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            })
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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

    render() {

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Danh mục</strong></h4>
                        </header>

                        <div className="card-body form-group">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Loại danh mục</th>
                                        <th>Danh mục chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.gridDataSource.map((data, index) => {
                                            if (data != null) {
                                                let listOption = this.state.cacheCategoryType.filter(x => x.CategoryTypeID == data.CategoryTypeID);
                                                let listOption1 = [];
                                                listOption.map((row) => {
                                                    const rowTemp = Object.assign({}, row, { "value": row.CategoryID }, { "label": row.CategoryName }, { "ParentID": row.ParentID })
                                                    listOption1.push(rowTemp);
                                                });
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.CategoryTypeName}</td>
                                                        <td>
                                                            <InputGridCell type="comboboxCus"
                                                                index={index}
                                                                text=""
                                                                filterName="CategoryTypeID"
                                                                filterValue={data.CategoryTypeID}
                                                                value={data.CategoryID}
                                                                name={`CategoryID${index}`}
                                                                onValueChangeCustom={this.onInputChange}
                                                                listOption={listOption1}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="2">Không có danh mục thuộc yêu này!</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <footer className="card-footer text-right doc-btn-spacing">
                            <button className="btn btn-w-md btn-bold btn-info" onClick={this.handleSubmit}>Cập nhật</button>
                            <button className="btn btn-w-md btn-bold btn-secondary">Quay lại</button>
                        </footer>
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
        updatePagePath: (PagePath) => {
            dispatch(updatePagePath(PagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const Category = connect(mapStateToProps, mapDispatchToProps)(CategoryCom);
export default Category;
