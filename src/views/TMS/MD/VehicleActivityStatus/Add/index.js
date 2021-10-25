import React, { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updatePagePath } from "../../../../../actions/pageAction";

import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
} from "../constants";
import { MessageModal } from "../../../../../common/components/Modal";
import { VEHICLEACITIVITYSTATUS_ADD,VEHICLE_ADD } from "../../../../../constants/functionLists";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";

// export default function Add() {
//     const [callAPIMessage, setCallAPIMessage] = useState('');
//     const searchref = createRef();
//     const [IsCallAPIError, setIsCallAPIError] = useState(false);
//     const [IsCloseForm, setIsCloseForm] = useState(false);
//     const LoginInfo = useSelector(state => state.LoginInfo);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(pageAction.updatePagePath(AddPagePath));
//     }, []);

//     const handleSubmit = (formData, MLObject) => {
//         MLObject.CreatedUser = LoginInfo.Username;
//         MLObject.LoginLogID = JSON.parse(LoginInfo.TokenString).AuthenLogID;
//         dispatch(callFetchAPI(APIHostName, AddAPIPath, MLObject)).then(apiResult => {
            
//             setIsCallAPIError(apiResult.IsError);
//             if(!apiResult.IsError){
                
//             }            
//             showMessage(apiResult.Message);
//         });
//     }

//     const handleCloseMessage = () => {
//         if (!IsCallAPIError) setIsCloseForm(true);
//     }

//     const showMessage = (message) =>{
//         ModalManager.open(
//             <MessageModal
//                 title="Thông báo"
//                 message={message}
//                 onRequestClose={() => true}
//                 onCloseModal={handleCloseMessage}
//             />
//         );
//     }
//     const dataSource = {
//         IsActived: true
//     };
//     if (IsCloseForm) {
//         return <Redirect to={BackLink} />;
//     }
//     return (
//         <FormContainer
//             FormName="Thêm trạng thái hoạt động của phương tiện"
//             MLObjectDefinition={MLObjectDefinition} 
//             listelement={AddElementList}
//             onSubmit={handleSubmit}
//             FormMessage={callAPIMessage}
//             IsErrorMessage={IsCallAPIError}
//             dataSource={dataSource}
//             BackLink={BackLink}
//             RequirePermission={VEHICLEACITIVITYSTATUS_ADD}
//             ref={searchref}
//         />
//     )
// }


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
                   
            this.showMessage(apiResult.Message);
        });
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

    render() {
        const dataSource = {
            IsActived: true
        };
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <SimpleForm
                FormName="Thêm trạng thái hoạt động của phương tiện"
                MLObjectDefinition={MLObjectDefinition} 
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                RequirePermission={VEHICLEACITIVITYSTATUS_ADD}
                ref={this.searchref}
            />
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;