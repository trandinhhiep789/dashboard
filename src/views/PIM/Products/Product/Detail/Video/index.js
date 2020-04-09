import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import ModelContainer from "../../../../../../common/components/Modal/ModelContainer";
import InputGriddđ from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import InputGridNew from "../../../../../../common/components/FormContainer/FormControl/InputGridNew";

import {
    APIHostName,GridMLObjectVideoDefinition, InputProductVideoColumnList

} from "../../Constants";

class VideoCom extends Component {

    constructor(props) {
        super(props);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleEditInsertClick = this.handleEditInsertClick.bind(this);
        this.handleVideoInsert = this.handleVideoInsert.bind(this);
        this.onTextChangeVidoes = this.onTextChangeVidoes.bind(this);
        this.handleSelectedFileVidoe = this.handleSelectedFileVidoe.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        

        this.state = {
            LstProduct_Video: this.props.Videos,
            Product_Video:{},
            file: {},
            filevidoes: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Videos) !== JSON.stringify(nextProps.Videos)) {
            this.setState({
                LstProduct_Video: nextProps.Videos
            })
        }
    }

    handleSelectedFile(e)
    {
           // console.log("handleSelectedFileImage",e,e.target.name, e.target.files[0].name, e.target.files[0]);
           const name = e.target.name;
           let { Product_Video } = this.state;
           Product_Video[name] = e.target.files[0].name;
           //Product_Images['file']=e.target.files[0];
           this.setState({ Product_Video: Product_Video, file: e.target.files[0] }, () => {
               this.openVidoesModal();
           });

    }

    handleSelectedFileVidoe(e)
    {
           const name = e.target.name;
           let { Product_Video } = this.state;
           Product_Video[name] = e.target.files[0].name;
           this.setState({ Product_Video: Product_Video, filevidoes: e.target.files[0] }, () => {
               this.openVidoesModal();
           });

    }

    onTextChangeVidoes(e)
    {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { Product_Video } = this.state;
        Product_Video[name] = value;
        this.setState({ Product_Video: Product_Video }, () => {
            this.openVidoesModal();
        });

    }
   

    handleVideoInsert()
    {
        const { edit, APIHostName, ID } = this.props
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.state.Product_Video.ProductID = ID;
        this.state.Product_Video.CreatedUser = CreatedUser
        this.state.Product_Video.LoginLogID = LoginLogID
        var data = new FormData();
        data.append('filevidoes', this.state.filevidoes)
        data.append('file', this.state.file)
        data.append('MLObject', JSON.stringify(this.state.Product_Video));
        
        this.props.callFetchAPI(APIHostName, "api/Product_Video/Add", data).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    LstProduct_Video: apiResult.ResultObject
                });
                ModalManager.close();
            }
        });

    }

    handleInsertClick()
    {
        this.openVidoesModal()
    }

    handleEditInsertClick(objo)
    {
        this.setState({ Product_Video:objo }, () => {
            this.openVidoesModal()
        });

    }

    openVidoesModal() {
        ModalManager.open(
            <ModelContainer title="Cập nhật video của sản phẩm" name="Product_Images"
                content={"Cập nhật video của sản phẩm!"} onRequestClose={() => true}
                onChangeModal={this.handleVideoInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên Video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="VideoName" onChange={this.onTextChangeVidoes.bind(this)} value={this.state.Product_Video.VideoName} placeholder="Tên vidoe" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Ảnh đại diện video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <div className="input-group file-group">
                            <input type="text" className="form-control file-value" value={this.state.Product_Video.ImageVideofileURL} placeholder="Choose file..." readOnly />
                            <input type="file" name="ImageVideofileURL" id="ImageVideofileURL" onChange={this.handleSelectedFile} accept="image/*" />
                            <span className="input-group-append" >
                                <label className="btn btn-light file-browser" htmlFor="ImageVideofileURL" >
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
                        <label className="col-form-label">Đường dẫn video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <div className="input-group file-group">
                            <input type="text" className="form-control file-value" value={this.state.Product_Video.VideofileURL} placeholder="Choose file..." readOnly />
                            <input type="file" name="VideofileURL" id="VideofileURL" onChange={this.handleSelectedFileVidoe} accept="image/*" />
                            <span className="input-group-append" >
                                <label className="btn btn-light file-browser" htmlFor="VideofileURL" >
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
                        <label className="col-form-label">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <textarea className="form-control form-control-sm" name="Description" onChange={this.onTextChangeVidoes.bind(this)} value={this.state.Product_Video.Description} placeholder="Mô tả" />
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
                        <input type="checkbox" className="" checked={this.state.Product_Video.IsActived} name="IsActived" onChange={this.onTextChangeVidoes.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }
    render() {
        return (
            <InputGridNew name="LstProduct_Video" controltype="GridControl"
            title="Videos"
            listColumn={InputProductVideoColumnList}
            dataSource={this.state.LstProduct_Video}
            Ispopup={true}
            MLObjectDefinition={GridMLObjectVideoDefinition}
            onInsertClick={this.handleInsertClick}
            onInsertClickEdit={this.handleEditInsertClick}
            ID={this.props.ID}
            IDSelectColumnName={"VideoID"}
            IsAutoPaging={true}
            RowsPerPage={5}
            colspan="10"
            IsPermisionAdd={true}
            IsPermisionDelete={true}
            APIHostName={APIHostName}
            Delete={"api/Product_Video/Delete"}
        />
            
            // <div className="card">
            //     <div className="card-body">
            //         <div className="flexbox mb-10 ">
            //             <span>Videos </span>
            //             <div className="btn-toolbar">
            //                 <div className="btn-group btn-group-sm">
            //                     <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleInsertClick}>
            //                         <span className="fa fa-plus ff"> Thêm </span>
            //                     </button>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="card-body">
            //                 <InputGriddđ name="LstProduct_Video"
            //                     controltype="GridControl"
            //                     listColumn={InputProductVideoColumnList}
            //                     dataSource={this.state.LstProduct_Video}
            //                     MLObjectDefinition={GridMLObjectVideoDefinition}
            //                     PKColumnName="VideoID"
            //                     RowsPerPage={10}
            //                     colspan="12"
            //                     IsAutoPaging={false}
            //                     isHideHeaderToolbar={true}
            //                     IsShowRowNull={true}
            //                     IsAdd={true}
            //                     IsDelete={true}
            //                 />
            //             </div>
            //     </div>
            // </div>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}


const Video = connect(mapStateToProps, mapDispatchToProps)(VideoCom);
export default Video;