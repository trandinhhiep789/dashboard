import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, LoadAPIPath, BackLink, EditPagePath } from "../constants"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PIEREQUEST_UPDATE } from "../../../../../constants/functionLists";
import CheckPermission from '../../../../../common/components/CheckPermission';
import PieRequestProduct from '../Component/PieRequestProduct';
import PieRequestAction from '../Component/PieRequestAction';
import PieRequest from '../Component/PieRequest';
import PieRequestComment from '../Component/PieRequestComment';
import PieRequestAttachment from '../Component/PieRequestAttachment';
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            ReloadNumber: -1,
            PieRequestID: this.props.match.params.id
        };
        this.searchref = React.createRef();
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
        />);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                apiResult.ResultObject.RequestDate = new Date(apiResult.ResultObject.RequestDate);
                this.setState({ DataSource: apiResult.ResultObject });
              //  console.log("EditComDataSource ", apiResult.ResultObject);
            }
            this.setState({
                IsLoadDataComplete: true
            })

        });
        this.props.updatePagePath(EditPagePath);
    }

    CheckPermissionUser(id) {
        if (this.state.DataSource.LstPieRequestType_WF_PermIs && this.state.DataSource.LstPieRequestType_WF_PermIs.length > 0) {
            if (this.state.DataSource.LstPieRequestType_WF_PermIs[0].IsFinishStep == true) {
                return false;
            }

            if (this.state.DataSource.LstPieRequestType_WF_PermIs.some(a => a.PiePermissionID === id)) {
                return true;
              }
          //  console.log("this.state.DataSource.LstPieRequestType_WF_PermIs ", this.state.DataSource.LstPieRequestType_WF_PermIs);
        }
        return false;
    }
    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                // <div style={{ margin: '0 auto' }}>
                <CheckPermission PermissionKey={PIEREQUEST_UPDATE}>
                    <React.Fragment>
                        <PieRequest PieRequestID={this.props.match.params.id} IsEdit={this.CheckPermissionUser(1)} IsDelete={this.CheckPermissionUser(2)}></PieRequest>
                        <PieRequestAction PieRequestID={this.props.match.params.id} PieRequestTypeID={this.state.DataSource.PieRequestTypeID} CurrentPieRequestStepID={this.state.DataSource.CurrentPieRequestStepID}></PieRequestAction>
                        <PieRequestProduct PieRequestID={this.props.match.params.id} PieTypeID={this.state.DataSource.PieTypeID}
                            IsAddProduct={this.CheckPermissionUser(3)} IsDeleteProduct={this.CheckPermissionUser(4)}>
                        </PieRequestProduct>
                        <PieRequestAttachment PieRequestID={this.props.match.params.id} IsAttachment={this.CheckPermissionUser(5)} > </PieRequestAttachment>
                        <PieRequestComment PieRequestID={this.props.match.params.id} IsComment={this.CheckPermissionUser(6)}></PieRequestComment>
                    </React.Fragment>
                </CheckPermission>
                //</div >
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        }
    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
const InputLanguageDataSource = [
    {
        LanguageID: 1,
        LanguageName: "English",
        CategoryName: "Phone",
        Description: ""
    },
    {
        LanguageID: 2,
        LanguageName: "Vietnamese",
        CategoryName: "Điện thoại",
        Description: ""
    }
]