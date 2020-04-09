import React from "react";
import { connect } from 'react-redux';
import { APIHostName, AddAPIPath, UpdateAPIPath, SearchAPIPath, DeleteAPIPath, GridProductOutAstColumnList, EditObjectDefinition, PKColumnName, InitSearchParams, PagePath } from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { PIE_REQUEST_PRODUCT_BARCODE_VIEW, PIE_REQUEST_PRODUCT_BARCODE_DELETE } from "../../../../constants/functionLists";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGridCell from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import EditOutAst  from './components';

import Datetime from 'react-datetime';
import "../../../../../node_modules/react-datetime/css/react-datetime.css";

class OutAstCom extends React.Component {
    constructor(props) {
        super(props);
        this.showInputForm = this.showInputForm.bind(this);
        this.handleShowInputForm = this.handleShowInputForm.bind(this);


        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleInsertUpdate = this.handleInsertUpdate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleInputGridDelete = this.handleInputGridDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            IsEdit: false,
            PieRequestProductOutAst: {},

            gridDataSource: [],
            ListProductOutAst: [],         
            FormData: {},         
            SearchData: InitSearchParams,
            Listoption:""
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

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            console.log("callSearchData", apiResult);
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    ListProductOutAst: apiResult.ResultObject
                });
            }
        }
        );
    }

    handleDelete(deleteList) {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, deleteList).then((apiResult) => {
            this.showMessage(apiResult.Message);
        }
        );
    }

    onInputChange(name, value) {
        debugger;
        let { PieRequestProductOutAst } = this.state;
        PieRequestProductOutAst[name.Name] = parseInt(name.Value);
        
        // this.setState({ PieRequestProductOutAst: PieRequestProductOutAst }, () => {
        //     this.showInputForm();
        // });
        // this.updatePagePath();
        this.setState({ PieRequestProductOutAst: PieRequestProductOutAst }
        );
        
        // console.log("dasegrgrg", this.state.PieRequestProductOutAst);
    }

    //show popup form nhập dữ liệu 
    handleShowInputForm() {
        this.state.PieRequestProductOutAst = {};
        this.setState({ IsEdit: false });
        this.setState({ PieRequestProductOutAst: this.state.PieRequestProductOutAst }, () => {
            this.showInputForm();
        });
    }

    //action thêm mới +  cập nhật
    handleInsertUpdate() {
        debugger;
        let PieRequestListID = "1";
        let IsOldValue = 0;
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        this.state.PieRequestProductOutAst.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequestProductOutAst.IsOldValue = IsOldValue;
        this.state.PieRequestProductOutAst.LoginlogID = LoginlogID;
        this.state.PieRequestProductOutAst.CreatedUser = CreatedUser;

        if (this.state.IsEdit) {
            console.log("this.state.PieRequestProductOutAst", this.state.PieRequestProductOutAst);
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequestProductOutAst).then((apiResult) => {
                console.log("apiResultapiResultapiResult0", apiResult)
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.SearchData);
                }
                this.showMessage(apiResult.Message);
            });
            
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequestProductOutAst).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.SearchData);            
                }
                this.showMessage(apiResult.Message);
            });
        }
    }

    //hiển thị form chỉnh sửa
    handleInputGridEdit(id) {
        let PieRequest_Product_OutAst = this.state.gridDataSource.filter(a => a.OutAstKey.trim() === id.trim());
        let PieRequestProductOutAst = {
            OutAst: PieRequest_Product_OutAst[0].OutAstKey.trim(),
            OutputTypeIDOld: PieRequest_Product_OutAst[0].OutputTypeID,
            OutputTypeID: PieRequest_Product_OutAst[0].OutputTypeID,
            CompanyID: PieRequest_Product_OutAst[0].CompanyID,
            InStockStoreID: PieRequest_Product_OutAst[0].InStockStoreID,
            IsRequireVoucher: PieRequest_Product_OutAst[0].IsRequireVoucher,
            PieRequestListID: PieRequest_Product_OutAst[0].PieRequestListID,
            IsOldValue: PieRequest_Product_OutAst[0].IsOldValue
        }

        this.setState({ IsEdit: true });
        this.setState({ PieRequestProductOutAst: PieRequestProductOutAst }, () => {
            this.showInputForm();
        });
    }

    //Xóa 
    handleInputGridDelete(listDeleteID) {
        console.log("PieRequestProductOutAst aDS", listDeleteID);
        let PieRequestListID = "1";
        let IsOldValue = 0;
        let DeletedUser = this.props.AppInfo.LoginInfo.Username;

        // this.props.callFetchAPI(APIHostName, DeleteAPIPath, listDeleteID).then((apiResult) => {
        //     console.log("apiResult", apiResult);
        // });
    }

    showInputForm() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập thông tin',
            content: { text:          
                <EditOutAst PieRequestProductOutAst={this.state.PieRequestProductOutAst}></EditOutAst>  
            }
        });
    }

    showInputForm1() {    
        ModalManager.open(
            <ModelContainer
                title="Thêm mới tồn kho"
                name="PieRequestProductOutAst"
                content={"Thêm mới tồn kho sản phẩm thành công!"}
                onRequestClose={() => true}
                onChangeModal={this.handleInsertUpdate}>
            
                <FormControl.TextBox name="OutputTypeID" onValueChange={this.onInputChange} colspan="9" labelcolspan="3" label="Mã hình thức sản xuất:" placeholder="Mã hình thức sản xuất" componenttype="InputControl" value={this.state.PieRequestProductOutAst.OutputTypeID} datasourcemember="OutputTypeID" />   
                <FormControl.TextBox name="CompanyID" onValueChange={this.onInputChange} colspan="9" labelcolspan="3" label="Công ty" placeholder="Mã công ty" componenttype="InputControl" value={this.state.PieRequestProductOutAst.CompanyID} datasourcemember="CompanyID" />
                <FormControl.TextBox name="InStockStoreID" onValueChange={this.onInputChange} colspan="9" labelcolspan="3" label="Mã kho tồn:" placeholder="Mã kho tồn" componenttype="InputControl" value={this.state.PieRequestProductOutAst.InStockStoreID} datasourcemember="InStockStoreID" />                   
                <FormControl.CheckBox name="IsRequireVoucher" onValueChange={this.onInputChange} colspan="9" labelcolspan="3" label="Yêu cầu chứng từ:" placeholder="Yêu cầu chứng từ" componenttype="InputControl" value={this.state.PieRequestProductOutAst.IsRequireVoucher} datasourcemember="IsRequireVoucher" />
            </ModelContainer>
        );

    }
    //End Barcode

    handleSearchSubmit(formData, MLObject) {
        const postData = [{
            SearchKey: "@Keyword",
            SearchValue: MLObject.Keyword
        }];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        this.gridref.current.clearData();
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Xuất khác nơi tồn kho</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="ListProductOutAst"
                                controltype="GridControl"
                                listColumn={GridProductOutAstColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName="chkSelect"
                                PKColumnName={PKColumnName}
                                dataSource={this.state.gridDataSource}
                                //value={this.state.gridDataSource}
                                onInsertClick={this.handleShowInputForm}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick={this.handleInputGridDelete}
                                //MLObjectDefinition={GridMLObjectDefinition}
                                RequirePermission={PIE_REQUEST_PRODUCT_BARCODE_VIEW}
                                DeletePermission={PIE_REQUEST_PRODUCT_BARCODE_DELETE}
                                colspan="12"
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

const OutAst = connect(mapStateToProps, mapDispatchToProps)(OutAstCom);
export default OutAst;
