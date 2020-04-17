import React from "react";
import { connect } from 'react-redux';
import {
    APIHostName, AddAPIPath, UpdateAPIPath,
    SearchAPIPath, DeleteAPIPath, GridProductImageColumnList,
    EditObjectDefinition, PKColumnName, InitSearchParams, PagePath, GetAlbumAPI,
    GridMLObjectProductImageDefinition
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { PIE_REQUEST_PRODUCT_BARCODE_VIEW, PIE_REQUEST_PRODUCT_BARCODE_DELETE } from "../../../../constants/functionLists";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import EditImage from './components';
import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import { showToastAlert } from '../../../../common/library/ultils'

class ImageCom extends React.Component {
    constructor(props) {
        super(props);
        this.showInputForm = this.showInputForm.bind(this);
        this.handleShowInputForm = this.handleShowInputForm.bind(this);
        this.getListAlbum = this.getListAlbum.bind(this);

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleInputGridDelete = this.handleInputGridDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            IsEdit: false,
            PieRequestProductImage: {},
            gridDataSource: [],
            ListProductImage: [],
            FormData: {},
            SearchData: InitSearchParams,
            Listoption: "",
            ListAlbum: [],
            DataSourcePieRequest: []
        };
        this.searchref = React.createRef();
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    componentWillMount() {
        this.getListAlbum();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
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
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: PieRequestListID.trim()
        }];
        this.props.callFetchAPI(APIHostName, SearchAPIPath, InitSearchParams).then((apiResult) => {
            console.log("callSearchData", apiResult);
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    ListProductImage: apiResult.ResultObject
                });
            }
        }
        );
    }

    getListAlbum() {
        const id = 1; //pierequestlistid
        this.props.callFetchAPI(APIHostName, GetAlbumAPI, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                let temp_datasource = [];
                temp_datasource.push({ name: "vuilongchon", value: -1, label: "---Vui lòng chọn---" });
                apiResult.ResultObject.map((data, index) => {
                    let tempAlbum = {};
                    tempAlbum.name = data.AlbumName;
                    tempAlbum.value = data.AlbumID;
                    tempAlbum.label = data.AlbumName;
                    temp_datasource.push(tempAlbum);
                });
                this.setState({ ListAlbum: temp_datasource });
            }
        });
    }

    handleDelete(deleteList) {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, deleteList).then((apiResult) => {
            this.showMessage(apiResult.Message);
        }
        );
    }

    onInputChange(name, value) {
        debugger;
        let { PieRequestProductImage } = this.state;
        PieRequestProductImage[name.Name] = parseInt(name.Value);
        this.setState({ PieRequestProductImage: PieRequestProductImage }
        );
    }

    //show popup form nhập dữ liệu 
    handleShowInputForm() {
        this.state.PieRequestProductImage = {};
        this.setState({ IsEdit: false });
        this.setState({ PieRequestProductImage: this.state.PieRequestProductImage }, () => {
            this.showInputForm();
        });
    }

    //hiển thị form chỉnh sửa
    handleInputGridEdit(index) {
        this.setState({ IsEdit: true });
        this.setState({ PieRequestProductImage: this.state.gridDataSource[index] }, () => {
            this.showInputForm();
        });
    }

    //Xóa 
    handleInputGridDelete(deleteList) {
        let listProductImage = [];
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
                        listProductImage.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductImage).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
            this.callSearchData(this.state.SearchData);
        });
    }

    showInputForm() {
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        let IsEdit = this.state.IsEdit;
        let PieRequestListID = this.props.match.params.pierequestlistid;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập thông tin',
            content: {
                text:
                    <EditImage
                        PieRequestProductImage={this.state.PieRequestProductImage}
                        CreatedUser={CreatedUser}
                        LoginLogID={LoginLogID}
                        IsEdit={IsEdit}
                        ListAlbum={this.state.ListAlbum}
                        PieRequestListID={PieRequestListID}
                        OnComplete={(message, isError) => this.handleSearchSubmit(message, isError)}
                    >
                    </EditImage>
            }
        });
    }

    handleSearchSubmit(message, isError) {
        showToastAlert(message, isError ? 'error' : 'success');
        this.callSearchData(this.state.SearchData);
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Hình ảnh</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="ListProductImage"
                                controltype="GridControl"
                                listColumn={GridProductImageColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName="chkSelect"
                                PKColumnName={PKColumnName}
                                dataSource={this.state.gridDataSource}
                                value={this.state.gridDataSource}
                                onInsertClick={this.handleShowInputForm}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleInputGridDelete}
                                MLObjectDefinition={GridMLObjectProductImageDefinition}
                                //RequirePermission={PIE_REQUEST_PRODUCT_BARCODE_VIEW}
                                colspan="12"
                                IsAdd={true}
                                IsDelete={true}
                            // IsAdd={ this.CheckPermissionUser(19)}
                            // IsDelete={ this.CheckPermissionUser(19) }
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}

const Image = connect(mapStateToProps, mapDispatchToProps)(ImageCom);
export default Image;
