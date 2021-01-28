import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_SEARCH, MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    AddAPIPath, APIHostName,
    DataGridColumnListMultiple,
    GridMLPartnerRoleDefinition, IDSelectColumnName, InputPartnerRoleColumnList, SearchMLmoldeDefinition, SearchPartnerRoleAPIPath, SearchElementModeList
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import SearchModal from "../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"

class PartnerUserRoleCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            UserName: this.props.UserName,
            DataSource: this.props.DataSource ? this.props.DataSource : []
        };
        this.notificationDOMRef = React.createRef();

    }


    componentWillReceiveProps(nextProps) {
        // if (nextProps.MaterialGroupID !== this.state.MaterialGroupID) {
        //     this.setState({ MaterialGroupID: nextProps.MaterialGroupID });
        // }

        // if (nextProps.MaterialGroupProductDataSource !== this.state.MaterialGroupProductDataSource) {
        //     this.setState({ MaterialGroupProductDataSource: nextProps.MaterialGroupProductDataSource });
        // }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
        }
    }

    componentDidMount() {

    }

    handleCloseMessage() {
        //if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleSubmit(data, message) {
        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then((apiResult) => {
            if (!apiResult.IsError) {
                this.props.onComponentSubmitChange();
                this.addNotification(message, false);
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }

        });
    }



    handleinsertItem(lstOption) {
        let _PartnerUserRole = [];
        if (this.state.DataSource) {
            _PartnerUserRole = this.state.DataSource;
        }
        lstOption.map((row, index) => {
            let match = _PartnerUserRole.filter(item => item.PartnerRoleID == row.PartnerRoleID);
            if (match.length <= 0) {
                row.UserName = this.state.UserName;
                _PartnerUserRole.push(row);
            }
        });

        this.handleSubmit(_PartnerUserRole, "Thêm mới vai trò người dùng nhà cung cấp thành công.");

        //const formData = Object.assign({}, this.state.DataSource, { ["ListPartnerUser_Role"]: _PartnerUserRole });
        //this.setState({ DataSource: formData, IsNotSaved: true });
        //this.setState({ DataSource: _PartnerUserRole });
    }

    handleInputUserRoleDelete(listDeleteID) {
        //console.log("listDeleteID", this.state.DataSource)
        // if(listDeleteID || listDeleteID.length > 0){
        //     this.handleSubmit(this.state.DataSource, "Xóa vai trò người dùng nhà cung cấp thành công.");
        // }

        if (this.state.DataSource.length == 0) {
            let _data = [{ UserName: this.state.UserName }];
            this.handleSubmit(_data, "Xóa vai trò người dùng nhà cung cấp thành công.");
        } else {
            this.handleSubmit(this.state.DataSource, "Xóa vai trò người dùng nhà cung cấp thành công.");
        }


    }

    handleInputUserRoleInsert() {
        let SearchValue = "";
        if (this.state.DataSource) {
            this.state.DataSource.map(function (item, index) {
                SearchValue = SearchValue + item.PartnerRoleID + ",";
            });
            SearchValue = SearchValue.substring(0, SearchValue.length - 1);
        }

        let SearchParamsModeList = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            },
            {
                SearchKey: "@PartnerRoleListID",
                SearchValue: SearchValue
            }
        ];



        this.props.showModal(MODAL_TYPE_SEARCH, {
            title: "Danh sách vai trò người dùng",
            content: {
                text: <SearchModal
                    PKColumnName={"PartnerRoleID,PartnerRoleName"}
                    multipleCheck={true}
                    SearchMLObjectDefinition={SearchMLmoldeDefinition}
                    DataGridColumnList={DataGridColumnListMultiple}
                    GridDataSource={[]}
                    SearchAPIPath={SearchPartnerRoleAPIPath}
                    SearchElementList={SearchElementModeList}
                    InitSearchParams={SearchParamsModeList}
                    onClickInsertItem={this.handleinsertItem.bind(this)}
                    IDSelectColumnName={"chkSelect"}
                    name={"PartnerRoleName"}
                    value={"PartnerRoleID"}
                >
                </SearchModal>
            }
        });
    }

    render() {
       
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        
        return (
            <div className="sub-grid detail-inputgrid col-lg-12">
                <ReactNotification ref={this.notificationDOMRef} />
                <InputGrid
                    name="LstPartnerUser_Role"
                    controltype="GridControl"
                    IDSelectColumnName={IDSelectColumnName}
                    listColumn={InputPartnerRoleColumnList}
                    PKColumnName={"PartnerRoleID"}
                    isHideHeaderToolbar={false}
                    dataSource={this.state.DataSource}
                    MLObjectDefinition={GridMLPartnerRoleDefinition}
                    colspan="12"
                    onInsertClick={this.handleInputUserRoleInsert.bind(this)}
                    onDeleteClick={this.handleInputUserRoleDelete.bind(this)}
                    headingTitle={"Vai trò của người dùng"}
                />
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
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

const PartnerUserRole = connect(mapStateToProps, mapDispatchToProps)(PartnerUserRoleCom);
export default PartnerUserRole;
