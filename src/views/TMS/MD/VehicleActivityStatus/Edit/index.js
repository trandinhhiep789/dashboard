import React, { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import { updatePagePath } from "../../../../../actions/pageAction";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
} from "../constants";
import { connect } from "react-redux";
import { VEHICLEACITIVITYSTATUS_UPDATE,VEHICLE_ADD,VEHICLE_UPDATE } from "../../../../../constants/functionLists";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import {useParams} from 'react-router-dom';

// export default function Edit() {
//     const [CallAPIMessage, setCallAPIMessage] = useState('');
//     const [DataSource, setDataSource] = useState([]);
//     const searchref = createRef();
//     const [IsCallAPIError, setIsCallAPIError] = useState(false);
//     const [IsLoadDataComplete, setIsLoadDataComplete] = useState(false);
//     const [IsCloseForm, setIsCloseForm] = useState(false);
//     const LoginInfo = useSelector(state => state.LoginInfo);
//     const dispatch = useDispatch();
//     const params = useParams();

//     useEffect(() => {
//         dispatch(updatePagePath(EditPagePath));
//         const id = props.match.params.id;
//         dispatch(callFetchAPI(APIHostName, LoadAPIPath, id)).then(apiResult => {
//             if (apiResult.IsError) {
//                 setIsCallAPIError(apiResult.IsError);
//                 showMessage(apiResult.Message);
//             } else {
//                 setDataSource(apiResult.ResultObject);
//             }
//             setIsLoadDataComplete(true);
//         });
//     }, [])

//     const handleSubmit = (formData, MLObject) =>{
//         MLObject.UpdatedUser = LoginInfo.Username;
//         MLObject.LoginLogID = JSON.parse(LoginInfo.TokenString).AuthenLogID;
//         dispatch(callFetchAPI(APIHostName, UpdateAPIPath, MLObject)).then(apiResult => {
//             setIsCallAPIError(apiResult.IsError);

//             if(!apiResult.IsError){
                
//             }      
//             showMessage(apiResult.Message);
//         });
//     }

//     const handleCloseMessage = () =>{
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


//     if (IsCloseForm) {
//         return <Redirect to={BackLink} />;
//     }
//     if (IsLoadDataComplete) {
//         return (
//             <FormContainer
//                 FormName="Cập nhật trạng thái hoạt động của phương tiện"
//                 MLObjectDefinition={MLObjectDefinition}
//                 listelement={EditElementList}
//                 onSubmit={handleSubmit}
//                 FormMessage={CallAPIMessage}
//                 IsErrorMessage={IsCallAPIError}
//                 dataSource={DataSource}
//                 BackLink={BackLink}
//                 RequirePermission={VEHICLEACITIVITYSTATUS_UPDATE}
//                 ref={searchref}
//             />
//         );
//     }
//     return (
//         <div>
//             <label>Đang nạp dữ liệu...</label>
//         </div>
//     );
// }

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
                if (apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError
                    });
                    this.showMessage(apiResult.Message);
                } else {
                    this.setState({ DataSource: apiResult.ResultObject });
                }
                this.setState({
                    IsLoadDataComplete: true
                });
            });
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
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
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <SimpleForm
                    FormName="Cập nhật trạng thái hoạt động của phương tiện"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                    RequirePermission={VEHICLEACITIVITYSTATUS_UPDATE}
                    ref={this.searchref}
                />
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
