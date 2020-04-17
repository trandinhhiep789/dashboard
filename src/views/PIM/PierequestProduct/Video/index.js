import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { GetMLObjectData } from "../../../../common/library/form/FormLib";

import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import { showModal } from '../../../../actions/modal';
import { MODAL_TYPE_CONFIRMATION, MODAL_TYPE_PREVIEWMEDIA } from '../../../../constants/actionTypes';

import {
    GridColumnList,
    GridMLObjectDefinition,
    ModalMLObjectDefinition,
    AddAPIPath,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    UpdateAPIPath,
    AddModalColumnList,
    ModifyModalColumnList,
} from "./constants";
import { PIE_REQUEST_PRODUCT_VIDEO_VIEW, PIE_REQUEST_PRODUCT_VIDEO_DELETE } from "../../../../constants/functionLists";
import { showToastAlert } from '../../../../common/library/ultils'

class VideoCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.previewMedia = this.previewMedia.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.state = {
            gridDataSource: [],
            IsCallAPIError: false,
            IsCloseForm: false,
            FormData: {},
            SearchData: InitSearchParams,
            PieRequestListID: "",
            DataSourcePieRequest: []
        };
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

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới Video của sản phẩm',
            onConfirm: (isConfirmed, formData, selectedFileList) => {
                if (isConfirmed) {
                    let data = new FormData()
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.PieRequestListID = this.props.match.params.pierequestlistid.trim();
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
                        Object.keys(MLObject).forEach(function (key) {
                            data.append(key, MLObject[key])
                        });
                        Object.keys(selectedFileList).forEach(function (key) {
                            data.append(key, selectedFileList[key])
                        });
                        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                        });
                    }
                }
            },
            modalElementList: modalElementList
        });
    }

    handleInputGridEdit(MLObjectDefinition, modalElementList, dataSource, formData, index) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa Video của sản phẩm',
            onConfirm: (isConfirmed, formData, selectedFileList) => {
                if (isConfirmed) {
                    let data = new FormData()
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.PieRequestListID = this.state.PieRequestListID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
                        Object.keys(MLObject).forEach(function (key) {
                            data.append(key, MLObject[key])
                        });
                        Object.keys(selectedFileList).forEach(function (key) {
                            data.append(key, selectedFileList[key])
                        });
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, data).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                        });
                    }
                }
            },
            modalElementList: modalElementList,
            formData: formData
        });
    }

    handleDelete(deleteList) {
        let listProductVideo = [];
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
                        listProductVideo.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductVideo).then((apiResult) => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
        });
    }

    handleDeleteAll() {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, this.state.gridDataSource).then((apiResult) => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
        });
    }

    valueChangeInputGrid() {
        console.log("valueChangeInputGrid");
    }

    previewMedia(typeMedia, src) {
        this.props.showModal(MODAL_TYPE_PREVIEWMEDIA,
            {
                title: 'Xem trước',
                typeMedia: typeMedia,
                src: src
            });
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
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
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Video của sản phẩm</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid name="LstProduct_Video"
                                controltype="GridControl"
                                listColumn={GridColumnList}
                                dataSource={this.state.gridDataSource}
                                MLObjectDefinition={GridMLObjectDefinition}
                                IDSelectColumnName={IDSelectColumnName}
                                modalElementList={AddModalColumnList}
                                modifyModalElementList={ModifyModalColumnList}
                                modalMLObjectDefinition={ModalMLObjectDefinition}
                                onInsertClick={this.handleInputGridInsert}
                                onDeleteClick_Customize={this.handleDelete}
                                onDeleteAll={this.handleDeleteAll}
                                onhandleEditClick={this.handleInputGridEdit}
                                onValueChangeInputGrid={this.valueChangeInputGrid}
                                previewMedia={this.previewMedia}
                                PKColumnName="VideoID"
                                // RequirePermission={PIE_REQUEST_PRODUCT_VIDEO_VIEW}
                                // DeletePermission={PIE_REQUEST_PRODUCT_VIDEO_DELETE}
                                RowsPerPage={10}
                                colspan="12"
                                IsAutoPaging={false}
                                isHideHeaderToolbar={false}
                                IsShowRowNull={true}
                                IsAdd={this.CheckPermissionUser(20)}
                                IsDelete={this.CheckPermissionUser(20)}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }

    }
}

const Video = connect(mapStateToProps, mapDispatchToProps)(VideoCom);
export default Video;
