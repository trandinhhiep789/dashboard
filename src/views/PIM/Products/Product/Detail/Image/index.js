import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import ModelContainer from "../../../../../../common/components/Modal/ModelContainer";
import { callGetCache } from "../../../../../../actions/cacheAction";
import {CDN_LOGO_IMAGE} from '../../../../../../constants/systemVars';

class ImageCom extends Component {
    constructor(props) {
        super(props);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleInputImagesEdit = this.handleInputImagesEdit.bind(this);
        this.handleSelectedFileImage = this.handleSelectedFileImage.bind(this);
        this.onTextChangeImages = this.onTextChangeImages.bind(this);
        this.handleImagesInsert = this.handleImagesInsert.bind(this);

        

        this.state = {
            LstProduct_Images: this.props.Images,
            LstProductImageType: [],
            Product_Images: {},
            file: {}
        }
    }

    componentDidMount() {
        this._getCachePRODUCTIMAGETYPE();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Images) !== JSON.stringify(nextProps.Images)) {
            this.setState({
                LstProduct_Images: nextProps.Images
            })
        }
    }

    _getCachePRODUCTIMAGETYPE() {
        this.props.callGetCache("PIMCACHE.PRODUCTIMAGETYPE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstProductImageType: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    handleInsertClick() {
        this.state.Product_Images = {};
        this.setState({ Product_Images: this.state.Product_Images }, () => {
            this.openImagesModal();
        });
    }

    handleInputImagesEdit(id) {
        let Product_Images = this.state.LstProduct_Images.filter(a => a.ImagesID === id);
        this.setState({ Isedit: true });
        this.setState({ Product_Images: Product_Images[0] }, () => {
            this.openImagesModal()
        });
    }
    handleSelectedFileImage(e) {
        // console.log("handleSelectedFileImage",e,e.target.name, e.target.files[0].name, e.target.files[0]);
        const name = e.target.name;
        let { Product_Images } = this.state;
        Product_Images[name] = e.target.files[0].name;
        //Product_Images['file']=e.target.files[0];
        this.setState({ Product_Images: Product_Images, file: e.target.files[0] }, () => {
            this.openImagesModal();
        });
    }

    onTextChangeImages(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { Product_Images } = this.state;
        Product_Images[name] = value;
        this.setState({ Product_Images: Product_Images }, () => {
            this.openImagesModal();
        });
    }

    openImagesModal() {
        ModalManager.open(
            <ModelContainer title="Cập nhật hình ảnh" name="Product_Images"
                content={"Cập nhật hình ảnh!"} onRequestClose={() => true}
                onChangeModal={this.handleImagesInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Album:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" name="AlbumID" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.AlbumID} placeholder="Album" >
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.props.Album.map((optionItem, i) => {
                                return (
                                    <option key={i} value={optionItem.AlbumID} label={optionItem.AlbumName} />
                                )
                            }
                            )}
                        </select>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên hình ảnh:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="ImageName" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.ImageName} placeholder="Tên hình ảnh" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại hình ảnh:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" name="ProductImageTypeID" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.ProductImageTypeID} placeholder="Loại hình ảnh" >
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstProductImageType.map((optionItem, i) => {
                                return (
                                    <option key={i} value={optionItem.ProductImageTypeID} label={optionItem.ProductImageTypeName} />
                                )
                            }
                            )}
                        </select>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đường dẫn hình ảnh:</label>
                    </div>
                    <div className="form-group col-md-10">
                        {/* <input className="form-control form-control-sm" name="ImagefileURL" 
                            onChange={this.onTextChangeImages.bind(this)} 
                            value={this.state.Product_Images.ImagefileURL} placeholder="Đường dẫn" /> */}
                        <div className="input-group file-group">
                            <input type="text" className="form-control file-value" value={this.state.Product_Images.ImagefileURL} placeholder="Choose file..." readOnly />
                            <input type="file" name="ImagefileURL" id="ImagefileURL" onChange={this.handleSelectedFileImage} accept="image/*" />
                            <span className="input-group-append" >
                                <label className="btn btn-light file-browser" htmlFor="ImagefileURL" >
                                    <i className="fa fa-upload"></i>
                                </label>
                            </span>
                        </div>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mặc định:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Images.Isdefault} name="Isdefault" onChange={this.onTextChangeImages.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Images.IsActived} name="IsActived" onChange={this.onTextChangeImages.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleImagesInsert() {
        const { edit, APIHostName, ID } = this.props
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.state.Product_Images.ProductID = ID;
        this.state.Product_Images.CreatedUser = CreatedUser
        this.state.Product_Images.LoginLogID = LoginLogID
        var data = new FormData();
        data.append('file', this.state.file)
        data.append('MLObject', JSON.stringify(this.state.Product_Images));

        this.props.callFetchAPI(APIHostName, edit, data).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    LstProduct_Images: apiResult.ResultObject
                });
                ModalManager.close();
            }
        });
    }
    handleDeleteClick(id)
    {
        const { Delete, APIHostName, ID } = this.props
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        let formData = {};
        formData.ProductID = ID;
        formData.DeletedUser = CreatedUser;
        formData.LoginLogID = LoginLogID;
        formData.ImagesID = id;
        let confir = 1;
		if ((typeof this.props.isUseConfirmMessage === "undefined") ||
			(typeof this.props.isUseConfirmMessage !== "undefined" && this.props.isUseConfirmMessage == true)) {
			confir = confirm("Bạn có chắc rằng muốn xóa ?");
		}
		if (confir == 1) {

        this.props.callFetchAPI(APIHostName, Delete, formData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    LstProduct_Images: apiResult.ResultObject
                });
                ModalManager.close();
            }
        });
    }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="flexbox mb-10 ">
                        <span>Hình ảnh </span>
                        <div className="btn-toolbar">
                            <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleInsertClick}>
                                    <span className="fa fa-plus ff"> Thêm </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lstImages">
                        <div className="content-images">
                            <div className="images">

                                {this.state.LstProduct_Images.map((optionItem, i) => {
                                    return (
                                        <div className="img" key={i}>
                                            <div className="item">
                                                <div className="groupActionImage">
                                                    <button className="btn btn-square btn-outline btn-success" onClick={(e) => this.handleInputImagesEdit(optionItem.ImagesID, e)} >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-square btn-outline btn-danger" onClick={(e) => this.handleDeleteClick(optionItem.ImagesID, e)} >
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </div>
                                                <img src={CDN_LOGO_IMAGE+"/"+optionItem.ImagefileURL} />
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Image = connect(mapStateToProps, mapDispatchToProps)(ImageCom);
export default Image;