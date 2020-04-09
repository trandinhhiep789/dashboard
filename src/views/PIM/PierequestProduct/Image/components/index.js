import React from "react";
import { connect } from 'react-redux';
import { APIHostName, AddAPIPath, UpdateAPIPath, GetAlbumAPI, SearchAPIPath, DeleteAPIPath, GridProductOutAstColumnList, EditObjectDefinition, PKColumnName, InitSearchParams, PagePath, AddPagePath } from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../common/components/Modal";
import FormControl from "../../../../../common/components/Form/AdvanceForm/FormControl";
import { hideModal } from '../../../../../actions/modal';

class EditImageCom extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFileUpLoadChange = this.onFileUpLoadChange.bind(this);
        this.searchref = React.createRef();
        let { PieRequestProductImage, CreatedUser, LoginLogID, IsEdit, ListAlbum } = this.props;
        this.state = { PieRequestProductImage, CreatedUser, LoginLogID, IsEdit, ListAlbum, Files: {} };
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
        let { PieRequestProductImage } = this.state;
        PieRequestProductImage[name] = value;
        this.setState({ PieRequestProductImage: PieRequestProductImage }
        );
    }

    onFileUpLoadChange(name, value, file) {
        let { PieRequestProductImage, Files } = this.state;
        PieRequestProductImage[name] = value;
        Files[`${name}_File`] = file;
        this.setState({ PieRequestProductImage: PieRequestProductImage, Files: Files }
        );
    }

    //action thêm mới +  cập nhật
    handleInsertUpdate() {
        let PieRequestListID = this.props.PieRequestListID;
        let IsOldValue = 0;
        this.state.PieRequestProductImage.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequestProductImage.IsOldValue = IsOldValue;
        this.state.PieRequestProductImage.LoginLogID = this.state.LoginLogID;
        this.state.PieRequestProductImage.CreatedUser = this.state.CreatedUser;
        this.state.PieRequestProductImage.UpDatedUser = this.state.CreatedUser;
        //validate
        if (this.state.PieRequestProductImage.AlbumID === "-1" || this.state.PieRequestProductImage.AlbumID == null
            || this.state.PieRequestProductImage.ImageName === "" || this.state.PieRequestProductImage.ImageName === null
            || this.state.PieRequestProductImage.ProductImageTypeID === "-1" || this.state.PieRequestProductImage.ProductImageTypeID == null
            || this.state.PieRequestProductImage.ImageFileURL === "" || this.state.PieRequestProductImage.ImageFileURL == null
            || this.state.PieRequestProductImage.Description === "" || this.state.PieRequestProductImage.Description == null) {
            this.showMessage("Chưa nhập đầy đủ thông tin");
            return;
        }
        if (this.state.IsEdit) {
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequestProductImage).then((apiResult) => {
                this.props.hideModal();
                this.props.OnComplete(apiResult.Message, apiResult.IsError);
            });
        }
        else {
            var data = new FormData();
            data.append('ImageFileURL', this.state.Files.ImageFileURL_File);
            data.append('ThumbnailImageFileURL', this.state.Files.ThumbnailImageFileURL_File);
            data.append('MobileImageFileURL', this.state.Files.MobileImageFileURL_File);
            data.append('MediumImageFileURL', this.state.Files.MediumImageFileURL_File);
            data.append('LargeImageFileURL', this.state.Files.LargeImageFileURL_File);
            data.append('ImageObj', JSON.stringify(this.state.PieRequestProductImage));
            this.props.callFetchAPI(APIHostName, AddAPIPath, data).then((apiResult) => {
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
        return (
            <React.Fragment>
                <div className="card">
                <div className="card-body form-group">
                    <FormControl.ComboBox name="AlbumID" type="select" isautoloaditemfromcache={false} listoption={this.state.ListAlbum} onValueChange={this.onInputChange} label="Mã Album:" datasourcemember="AlbumID" controltype="InputControl" colspan={10} value={this.state.PieRequestProductImage.AlbumID} />
                    <FormControl.TextBox name="ImageName" onValueChange={this.onInputChange} label="Tên hình ảnh:" datasourcemember="ImageName" controltype="InputControl" colspan={10} value={this.state.PieRequestProductImage.ImageName} />
                    <FormControl.ComboBox name="ProductImageTypeID" type="select" isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTIMAGETYPE" valuemember="ProductImageTypeID" nameMember="ProductImageTypeName" listoption={[]} onValueChange={this.onInputChange} label="Loại hình ảnh:" datasourcemember="ProductImageTypeID" controltype="InputControl" colspan={10} value={this.state.PieRequestProductImage.ProductImageTypeID} />
                    <FormControl.FileUpload name="ImageFileURL" onValueChange={this.onFileUpLoadChange} label="Đường dẫn hình ảnh:" datasourcemember="ImageFileURL" controltype="InputControl" colspan={10} disabled={(this.state.IsEdit) ? 'disable' : ''} textFileValue={this.state.PieRequestProductImage.ImageFileURL} />
                    <FormControl.TextArea name="Description" onValueChange={this.onInputChange} label="Mô tả:" datasourcemember="Description" rows="6" controltype="InputControl" colspan={10} value={this.state.PieRequestProductImage.Description} />
                    <FormControl.CheckBox name="IsDefault" onValueChange={this.onInputChange} label="Hình ảnh mặt định: " componenttype="InputControl" datasourcemember="IsDefault" value={false} value={this.state.PieRequestProductImage.IsDefault} />
                    <FormControl.CheckBox name="IsActived" onValueChange={this.onInputChange} label="Kích hoạt: " componenttype="InputControl" datasourcemember="IsActived" value={true} value={this.state.PieRequestProductImage.IsActived} />
                    <FormControl.CheckBox name="IsSystem" onValueChange={this.onInputChange} label="Hệ thống: " componenttype="InputControl" datasourcemember="IsSystem" value={false} value={this.state.PieRequestProductImage.IsSystem} />
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
        hideModal: () => {dispatch(hideModal());
        }

    }
}

const EditImage = connect(mapStateToProps, mapDispatchToProps)(EditImageCom);
export default EditImage;
