import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { updatePagePath } from "../../../../actions/pageAction";
import InputGridCell from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { LIST_COMPANY_CACHE, LIST_STATUS_PRODUCT_CACHE, APIHostName, AddAPIPath, UpdateAPIPath, LoadAPIPath, BackLink, PagePath } from "./constants";
import { showToastAlert } from '../../../../common/library/ultils'

class StatusCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = { CallAPIMessage: "", IsCallAPIError: false, IsCloseForm: false };
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            ExistData: 0, //0: insert, 1: update
            DataSource: [],
            DataSourcePieRequest: []
        };
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: false });
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    componentDidMount() {
        this.getListCompany();
        this.loadInfo();
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

    handleSubmit() {
        let MLObject = this.state.DataSource;
        let path = this.state.ExistData == 0 ? AddAPIPath : UpdateAPIPath;
        let isValidForm = true;
        //nếu chưa chọn thì ko cho submit
        let mlObjectArr = Object.assign([], MLObject);
        for (let i = 0; i < mlObjectArr.length; i++) {
            if (mlObjectArr[i].ProductStatusID == "") {
                isValidForm = false;
                break;
            }
        }
        if (!isValidForm) {
            this.showMessage("Vui lòng chọn đầy đủ thông tin");
            return;
        }
        this.props.callFetchAPI(APIHostName, path, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.setState({ ExistData: 1 });
            }
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
        });
    }

    onInputChange(data, index) {
        let temp_datasource = Object.assign([], this.state.DataSource);
        temp_datasource[index].ProductStatusID = data.Value;
        this.setState({ DataSource: temp_datasource });
    }

    getListCompany() {
        return new Promise((resolve, reject) => {
            let CreatedUser = this.props.AppInfo.LoginInfo.Username;
            let UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            let PieRequestListID = this.props.match.params.pierequestlistid;
            this.props.callGetCache(LIST_COMPANY_CACHE).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    let companyArr = [];
                    result.ResultObject.CacheData.map((data) => {
                        let temp = { CompanyID: data.CompanyID, CompanyName: data.CompanyName, ProductStatusID: "", PieRequestListID, CreatedUser, UpdatedUser, LoginLogID };
                        companyArr.push(temp);
                    });
                    this.setState({ DataSource: companyArr });
                    resolve(true)
                } else {
                    resolve('error');
                }
            });
        });
    }

    loadInfo() {
        let PieRequestListID = this.props.match.params.pierequestlistid;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, PieRequestListID).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                if (apiResult.ResultObject == null) {
                    this.setState({ ExistData: 0 });
                } else {
                    let temp_datasource = Object.assign([], this.state.DataSource);
                    apiResult.ResultObject.map((data, index) => {
                        temp_datasource[index].ProductStatusID = data.ProductStatusID;
                    });
                    this.setState({ DataSource: temp_datasource, ExistData: 1 });
                }
            }
            this.setState({
                IsLoadDataComplete: true
            })
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Trạng thái sản phẩm</strong></h4>
                        </header>
                        <div className="card-body form-group">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Công ty</th>
                                        <th>Trạng thái sản phẩm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.DataSource.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.CompanyName}</td>
                                                    <td>
                                                        <InputGridCell type="combobox"
                                                            index={index}
                                                            text={data.ProductStatusID}
                                                            value={data.ProductStatusID}
                                                            name={`ProductStatusID${index}`}
                                                            IsAutoLoadItemFromCache={true}
                                                            LoadItemCacheKeyID="PIMCACHE.PIM_PRODUCTSTATUS"
                                                            ValueMember="ProductStatusID"
                                                            NameMember="ProductStatusName"
                                                            onValueChange={this.onInputChange}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <footer className="card-footer text-right">
                            {this.CheckPermissionUser(12) == true ? <button className="btn btn-w-md btn-bold btn-info" onClick={this.handleSubmit}>Cập nhật</button>
                                : <button className="btn btn-w-md btn-bold btn-info" disabled title="Bạn Không có quyền xử lý!" >Cập nhật</button>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const Status = connect(mapStateToProps, mapDispatchToProps)(StatusCom);
export default Status;
