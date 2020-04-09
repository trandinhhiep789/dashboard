import React from "react";
import { connect } from 'react-redux';
import { APIHostName, AddAPIPath, UpdateAPIPath, GetAlbumAPI, SearchAPIPath, DeleteAPIPath, GridProductOutAstColumnList, EditObjectDefinition, PKColumnName, InitSearchParams, PagePath, AddPagePath } from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { ModalManager } from 'react-dynamic-modal';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class EditImageCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lstChangvalition: {}
        };
    }
    componentDidMount() {
    }

    handleSubmit(formData, MLObject) {
        this.props.handleImages(formData, MLObject);
    }
    render() {
        const MLObjectDefinition = [
            {
                Name: "AlbumID",
                DefaultValue: "",
                BindControlName: "cbAlbumID",
                DataSourceMember: "AlbumID"
            },
            {
                Name: "ProductImageTypeID",
                DefaultValue: "",
                BindControlName: "cbProductImageTypeID",
                DataSourceMember: "ProductImageTypeID"
            }
        ];

        return (
            <React.Fragment>
                <FormContainer
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    IsAutoLayout={true}
                    Lstchangvalition={this.state.lstChangvalition}
                    onSubmit={this.handleSubmit.bind(this)}>

                    <FormControl.ComboBox name="cbAlbumID" colspan="8" labelcolspan="2" type="select" validatonList={["Comborequired"]}
                        isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTTYPE" valuemember="ProductTypeID" nameMember="ProductTypeName" label="Album:" controltype="InputControl" value={-1} listoption={null} datasourcemember="AlbumID" />
                    <FormControl.ComboBox name="cbProductImageTypeID" colspan="8" labelcolspan="2" type="select" validatonList={["Comborequired"]}
                        isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTTYPE" valuemember="ProductTypeID" nameMember="ProductTypeName" label="Loại hình ảnh:" controltype="InputControl" value={-1} listoption={null} datasourcemember="ProductImageTypeID" />
                    <FormControl.TextBox name="txtImageName" colspan="8" labelcolspan="2" label="Tên hình ảnh:" placeholder="Tên hình ảnh" validatonList={["required"]}
                        controltype="InputControl" value='' datasourcemember="ImageName" />
                </FormContainer>
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
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}

const EditImage = connect(mapStateToProps, mapDispatchToProps)(EditImageCom);
export default EditImage;
