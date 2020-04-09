import React from "react";
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
            iconNotification: "",
            DataSourcePieRequest: []
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
       // this.getCacheCategory();
        this._getPieRequestDateByID();
        this.props.updatePagePath(PagePath);

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

    // categoryNamePrefix(categoryLevel) {
    //     let resultStr = "";
    //     for (let i = 0; i < categoryLevel; i++) {
    //         resultStr += "---";
    //     }
    //     return resultStr;
    // }

    // createCategoryTree(originListItem) {
    //     let childListItem = originListItem.filter(item => item.ParentID == 0);
    //     //console.log("createCategoryTree childListItem:", childListItem);
    //     let itemListResult = [];
    //     for (let i = 0; i < childListItem.length; i++) {
    //         itemListResult.push({ value: childListItem[i].CategoryID, name: childListItem[i].CategoryName, label: childListItem[i].CategoryName, CategoryTypeID: childListItem[i].CategoryTypeID});
    //         let childItemTree = this.createChildCategoryTree(originListItem, childListItem[i].CategoryID, 1);
    //         //console.log("createCategoryTree childItemTree:", childItemTree);
    //         for (let j = 0; j < childItemTree.length; j++) {
    //             //itemListResult.push(childItemTree[j]);
    //             itemListResult.push({ value: childItemTree[j].CategoryID, name: childItemTree[j].CategoryName, label: childItemTree[j].CategoryName, CategoryTypeID: childItemTree[j].CategoryTypeID});
    //         }
    //     }
    //     return itemListResult;
    // }

    // createChildCategoryTree(originListItem, parentID, categoryLevel) {
    //     let childListItem = originListItem.filter(item => item.ParentID == parentID);
    //     //console.log("createChildCategoryTree childListItem:", childListItem);
    //     let itemListResult = []
    //     for (let i = 0; i < childListItem.length; i++) {
    //         let item = childListItem[i];
    //         item.CategoryName = this.categoryNamePrefix(categoryLevel) + item.CategoryName;
    //         //console.log("createChildCategoryTree childListItem asssssssssssssss:", item);
    //         itemListResult.push(item);
    //         itemListResult.push({ value: item.CategoryID, name: item.CategoryName, label: item.CategoryName, CategoryTypeID: item.CategoryTypeID });
    //         const newCategoryLevel = categoryLevel + 1;
    //         let childListItem2 = originListItem.filter(item => item.ParentID == item.CategoryID);
    //         if (childListItem2.length > 0) {
    //             const childItemTree2 = this.createChildCategoryTree(originListItem, item.CategoryID, newCategoryLevel);
    //            // console.log("childItemTree2", childItemTree2);
    //             for (j = 0; j < childItemTree2.length; j++) {
    //                 itemListResult.push(childItemTree2[j]);
    //                 itemListResult.push({ value: childItemTree2[j].CategoryID, name: childItemTree2[j].CategoryName, label: childItemTree2[j].CategoryName, CategoryTypeID: childItemTree2[j].CategoryTypeID });
    //             }
    //         }
    //     }
    //     return itemListResult;

    // }

    // getCacheCategory() {
    //     let categoryList = [];
    //     this.props.callGetCache("PIMCACHE.CATEGORY").then((apiResult) => {
    //         if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
    //             categoryList = apiResult.ResultObject.CacheData;
    //             //console.log("categoryList", categoryList);
    //             const categoryTree = this.createCategoryTree(categoryList, 0, 0);
    //             //console.log("categoryTree ", categoryTree);
    //             this.setState({
    //                 cacheCategoryType: categoryTree
    //             });
    //         }
    //     });
    // }

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
                                                // let listOption = this.state.cacheCategoryType.filter(x => x.CategoryTypeID == data.CategoryTypeID);
                                                // console.log(" listOption vb", listOption);
                                                // let listOption1 = [];
                                                // listOption.map((row) => {

                                                //     const rowTemp = Object.assign({}, row, { "value": row.value }, { "label": row.label })
                                                //     listOption1.push(rowTemp);
                                                // });
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.CategoryTypeName}</td>
                                                        <td>
                                                            <InputGridCell type="comboboxCus"
                                                                index={index}
                                                                text={data.CategoryID}
                                                                isCategory ={true}
                                                                CategoryTypeID={data.CategoryTypeID}
                                                                // filterName="CategoryTypeID"
                                                                // filterValue={data.CategoryTypeID}
                                                                value={data.CategoryID}
                                                                name={`CategoryID${index}`}
                                                                onValueChangeCustom={this.onInputChange}
                                                                IsAutoLoadItemFromCache= {true}
                                                                LoadItemCacheKeyID="PIMCACHE.CATEGORY"
                                                                ValueMember="CategoryID"
                                                                NameMember="CategoryName"
                                                                listOption={null}
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
                            {this.CheckPermissionUser(8) == true ? <button className="btn btn-w-md btn-bold btn-info" onClick={this.handleSubmit}>Cập nhật</button>
                                : <button className="btn btn-w-md btn-bold btn-info" disabled title="Bạn Không có quyền xử lý!">Cập nhật</button>
                            }
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
