import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import {
    APIHostName,
    BackLink,
    AddAPIPath,
    LoadAPIPath,
    DeleteAPIPath,
    UpdateAPIPath,
    SearchAPIPath,
    GridMLObjectAlbumDefinition,
    InputProductAlbumColumnList,
    AddElementList, MLObjectDefinition
} from "./constants";
import { showToastAlert } from '../../../../common/library/ultils'

class AlbumCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputGridAlbumInsert = this.handleInputGridAlbumInsert.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleAttrInsert = this.handleAttrInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.searchref = React.createRef();
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            gridDataSource: [],
            IsCloseForm: false,
            FormData: {},
            PieRequest_Product_Album: {},
            LstPieRequest_Product_Album: [],
            Isedit: false,
            DataSourcePieRequest: []
        };
    }

    componentDidMount() {
        this.callSearchData();
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

    callSearchData() {
        const PieRequestListID = this.props.match.params.pierequestlistid;
        const searchData = [{
            SearchKey: "@PIEREQUESTLISTID",
            SearchValue: PieRequestListID
        }];
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError,
                    gridDataSource: apiResult.ResultObject,
                    LstPieRequest_Product_Album: apiResult.ResultObject
                })
            }
        }
        );
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }

    handleInputGridEdit(id) {
        const Product_Album = {
            AlbumID: this.state.LstPieRequest_Product_Album[id].AlbumID,
            AlbumName: this.state.LstPieRequest_Product_Album[id].AlbumName,
            icOnFileURL: this.state.LstPieRequest_Product_Album[id].icOnFileURL,
            Description: this.state.LstPieRequest_Product_Album[id].Description,
            IsDefault: this.state.LstPieRequest_Product_Album[id].IsDefault
        }
        this.setState({ Isedit: true });
        this.setState({ PieRequest_Product_Album: Product_Album }, () => {
            this.openAlbumModal();
        });
    }
    handleAttrInsert() {
        debugger;
        let PieRequestListID = this.props.match.params.pierequestlistid;
        let IsOldValue = 0;
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.state.PieRequest_Product_Album.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequest_Product_Album.IsOldValue = IsOldValue;
        this.state.PieRequest_Product_Album.LoginLogID = LoginLogID;
        this.state.PieRequest_Product_Album.CreatedUser = CreatedUser;
        if (this.state.Isedit) {
            this.setState({
                IsOldValue: 1
            });
            this.state.PieRequest_Product_Album.UpDatedUser = CreatedUser;
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequest_Product_Album).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                    ModalManager.close();
                    this.callSearchData(this.state.SearchData);
                }
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequest_Product_Album).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                    ModalManager.close();
                    this.callSearchData(this.state.SearchData);
                }
            });
        }
    }

    onChangeInput(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { PieRequest_Product_Album } = this.state;
        PieRequest_Product_Album[name] = value;
        this.setState({ PieRequest_Product_Album: PieRequest_Product_Album }, () => {
            this.openAlbumModal();
        });
    }
    openAlbumModal() {
        ModalManager.open(
            <ModelContainer
                title={(this.state.Isedit == true ? "Cập nhật thông tin album" : "Thêm thông tin album")}
                name="PieRequest_Product_Article"
                content={"Thêm thuộc tính sản phẩm thành công!"}
                onRequestClose={() => true}
                onChangeModal={this.handleAttrInsert}>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mã album:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" readonly="true" name="AlbumID" onChange={this.onChangeInput.bind(this)} value={this.state.PieRequest_Product_Album.AlbumID} placeholder="Mã album" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên album:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="AlbumName" onChange={this.onChangeInput.bind(this)} value={this.state.PieRequest_Product_Album.AlbumName} placeholder="Tên album" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đường dẫn hình ảnh icon album:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <textarea className="form-control form-control-sm" name="icOnFileURL" onChange={this.onChangeInput.bind(this)} value={this.state.PieRequest_Product_Album.icOnFileURL} placeholder="Đường dẫn hình ảnh icon album" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <textarea className="form-control form-control-sm" name="Description" onChange={this.onChangeInput.bind(this)} value={this.state.PieRequest_Product_Album.Description} placeholder="Mô tả" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Là album mặc định:</label>
                    </div>
                    <div className="form-group col-md-10 checkbox">
                        <label>
                            <input type="checkbox" className="" checked={this.state.PieRequest_Product_Album.IsDefault} name="IsDefault" onChange={this.onChangeInput.bind(this)} />
                            <span className="cr">
                                <i className="cr-icon fa fa-check"></i>
                            </span>
                        </label>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleInputGridAlbumInsert() {
        this.state.PieRequest_Product_Album = {};
        this.setState({ Isedit: false });
        this.setState({ PieRequest_Product_Album: this.state.PieRequest_Product_Album }, () => {
            this.openAlbumModal();
        });
    }
    handleSubmit(formData, MLObject) {

    }

    handleDelete(deleteList) {
        let listProductAlbum = [];
        deleteList.map((selectItem) => {
            let isMath = false;
            this.state.gridDataSource.map((row) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                            isMath = false;
                            break;
                        } else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        row.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                        listProductAlbum.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductAlbum).then((apiResult) => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
        }
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Thông tin album</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="LstPieRequest_Product_Album"
                                controltype="GridControl"
                                listColumn={InputProductAlbumColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"AlbumID"}
                                dataSource={this.state.gridDataSource}
                                value={this.state.LstPieRequest_Product_Album}
                                onInsertClick={this.handleInputGridAlbumInsert}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleDelete}
                                MLObjectDefinition={GridMLObjectAlbumDefinition}
                                colspan="12"
                                IsAdd={this.CheckPermissionUser(16)}
                                IsDelete={this.CheckPermissionUser(16)}
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

const Album = connect(mapStateToProps, mapDispatchToProps)(AlbumCom);
export default Album;
