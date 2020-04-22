import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../../common/components/Modal";
import { APIHostName, AddAPIPath, BackLink, AddPagePath } from "../constants"
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { PIEREQUEST_ADD } from "../../../../../../constants/functionLists";
import PieRequest from '../../Component/PieRequest';
import CheckPermission from '../../../../../../common/components/CheckPermission';
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            PieRequestTypeID: -1,
            DataSource: {
                BrandID: "",
                BrandName: "",
                Description: "",
                IsActived: true,
                ManufacturerID: 1
            },
            Permission: {
                IsLoading: true
            }
        };
        this.searchref = React.createRef();
    }
    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }
    handleCloseMessage() {
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    render() {
        return (
            <div style={{ width: '100%', margin: '0 auto' }}>
                <CheckPermission PermissionKey={PIEREQUEST_ADD}>
                    <React.Fragment>
                        <PieRequest PieRequestID={-1}></PieRequest>
                    </React.Fragment>
                </CheckPermission>
            </div>
        )
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
        checkPermission: (permissionKey) => {
            return dispatch(checkPermission(permissionKey));
        }

    }
}


const PieRequestAdd = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default PieRequestAdd;
