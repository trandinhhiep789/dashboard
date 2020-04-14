import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath
   
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { BRAND_ADD } from "../../../../constants/functionLists";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import { callGetCache } from "../../../../actions/cacheAction";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
        this.handleGetCache = this.handleGetCache.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            ResultLanguage: [],
            DataSource: {
                BrandID: "",
                BrandName: "",
                Description: "",
                IsActived: true,
                IsSystem: false,
                ManufacturerID: ""
            },
            Files: {}
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

  

 


    handleSubmit(formData, MLObject) {
      
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.PartnerTypeID = 0;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
       
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if(!apiResult.IsError){
                this.handleClearLocalCache();
            }
            
        });
    }

     //file upload
     handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
    }
    
    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    handleClearLocalCache() {
        const CacheKeyID = "PIMCACHE.BRAND";
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(CacheKeyID).then((result) => {
            const postData = {
                CacheKeyID: CacheKeyID,
                UserName: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
                AdditionParamList: []
            };
            this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
                this.handleGetCache();
            });
        });
    }

    handleGetCache() {
        this.props.callGetCache("PIMCACHE.BRAND").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <FormContainer
                FormName="Thêm đối tác"
                name="Brand"
                IsAutoLayout={true}
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                IsErrorMessage={this.state.IsCallAPIError}
                onHandleSelectedFile={this.handleSelectedFile}
                dataSource={this.state.DataSource}
                RequirePermission={BRAND_ADD}
                BackLink={BackLink}
            >
            </FormContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
