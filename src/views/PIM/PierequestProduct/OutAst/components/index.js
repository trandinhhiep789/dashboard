import React from "react";
import { connect } from 'react-redux';
import { APIHostName, AddAPIPath, UpdateAPIPath, SearchAPIPath, DeleteAPIPath, GridProductOutAstColumnList, EditObjectDefinition, PKColumnName, InitSearchParams, PagePath, AddPagePath } from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../common/components/Modal";
import FormControl from "../../../../../common/components/Form/AdvanceForm/FormControl";
import { showModal, hideModal } from '../../../../../actions/modal';

class EditOutAstCom extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.searchref = React.createRef();
        let { PieRequestProductOutAst, CreatedUser, LoginLogID, IsEdit } = this.props;
        this.state = { PieRequestProductOutAst, CreatedUser, LoginLogID, IsEdit };
        this.handleInsertUpdate = this.handleInsertUpdate.bind(this);
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
        this.props.updatePagePath(AddPagePath);
    }

    onInputChange(name, value) {
        let { PieRequestProductOutAst } = this.state;
        PieRequestProductOutAst[name] = value;
        this.setState({ PieRequestProductOutAst: PieRequestProductOutAst }
        );
    }

    //action thêm mới +  cập nhật
    handleInsertUpdate() {
        let PieRequestListID = this.props.PieRequestListID;
        let IsOldValue = 0;
        this.state.PieRequestProductOutAst.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequestProductOutAst.IsOldValue = IsOldValue;
        this.state.PieRequestProductOutAst.LoginLogID = this.state.LoginLogID;
        this.state.PieRequestProductOutAst.CreatedUser = this.state.CreatedUser;
        //validate
        if (this.state.PieRequestProductOutAst.CompanyID == null || this.state.PieRequestProductOutAst.CompanyID === "-1"
            || this.state.PieRequestProductOutAst.OutputTypeID == null || this.state.PieRequestProductOutAst.OutputTypeID === "-1"
            || this.state.PieRequestProductOutAst.InStockStoreID == null || this.state.PieRequestProductOutAst.InStockStoreID === "-1") {
            this.showMessage("Vui lòng chọn đầy đủ thông tin.");
            return;
        }
        if (this.state.IsEdit) {
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequestProductOutAst).then((apiResult) => {
                this.props.hideModal();
                this.props.OnComplete(apiResult.Message, apiResult.IsError);
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequestProductOutAst).then((apiResult) => {
                this.props.hideModal();
                this.props.OnComplete(apiResult.Message, apiResult.IsError);
            });
        }
    }

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
        let disabled = this.props.IsEdit ? "disabled" : "";
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body form-group">
                        <FormControl.ComboBox name="OutputTypeID" type="select" isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.MD_OUTPUTTYPE" valuemember="OutputTypeID" nameMember="OutputTypeName" label="Hình thức xuất:" controltype="InputControl" listoption={[]} datasourcemember="OutputTypeID" onValueChange={this.onInputChange} index={1} value={this.state.PieRequestProductOutAst.OutputTypeID} colspan={10} disabled={disabled} />
                        <FormControl.ComboBox name="CompanyID" type="select" isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.MD_COMPANY" valuemember="CompanyID" nameMember="CompanyName" label="Công ty:" controltype="InputControl" listoption={[]} datasourcemember="CompanyID" onValueChange={this.onInputChange} index={2} value={this.state.PieRequestProductOutAst.CompanyID} colspan={10} disabled={disabled} />
                        <FormControl.ComboBox name="InStockStoreID" type="select" isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.MD_STORE" valuemember="StoreID" nameMember="StoreName" label="Kho tồn:" controltype="InputControl" listoption={[]} datasourcemember="InStockStoreID" onValueChange={this.onInputChange} index={3} value={this.state.PieRequestProductOutAst.InStockStoreID} colspan={10} />
                        <FormControl.CheckBox name="IsRequireVoucher" onValueChange={this.onInputChange} label="Yêu cầu chứng từ:" placeholder="Yêu cầu chứng từ" componenttype="InputControl" datasourcemember="IsRequireVoucher" value={this.state.PieRequestProductOutAst.IsRequireVoucher} />
                    </div>
                    <footer className="card-footer text-right">
                        <button className="btn btn-primary" onClick={this.handleInsertUpdate}>Cập nhật</button>
                        <button className="btn btn-secondary ml-10" onClick={this.props.hideModal}>Quay lại</button>
                    </footer>
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
        hideModal: () => {
            dispatch(hideModal());
        }


    }
}

const EditOutAst = connect(mapStateToProps, mapDispatchToProps)(EditOutAstCom);
export default EditOutAst;
