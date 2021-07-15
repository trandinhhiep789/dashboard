import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

import DataGrid from "../../../../../../common/components/DataGrid";
import { lstColImportExcelModal, APIHostName } from '../../constants';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../../common/components/Modal";
import { hideModal } from '../../../../../../actions/modal';

class ImportExcelModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateListUsers: null,
            stateCoordinatorGroupMember: [],
            stateCoordinatorGroupDUser: [],
            stateMemberDisableAcceptBtn: false,
            stateDUserDisableAcceptBtn: false
        };

        this.showMessage = this.showMessage.bind(this);
        this.fetchListUsers = this.fetchListUsers.bind(this);
        this.handleSetPropsExportData = this.handleSetPropsExportData.bind(this);
        this.handleAcceptBtnInHeadingTitle = this.handleAcceptBtnInHeadingTitle.bind(this);
        this.handleGetListFromPropsExportData = this.handleGetListFromPropsExportData.bind(this);
        this.handleCloseMessageModal = this.handleCloseMessageModal.bind(this);
        this.returnHeadingTitle = this.returnHeadingTitle.bind(this);
    }

    componentDidMount() {
        const cautionMess = <span>Khi bạn nhấn ĐỒNG Ý sẽ <span className="text-danger">xóa hết danh sách nhân viên</span> có trong nhóm chi nhánh quản lý tương ứng và thay thế hoàn toàn bằng danh sách nhân viên nhập từ excel</span>;
        this.showMessage(cautionMess);
        this.handleGetListFromPropsExportData();
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessageModal}
            />
        );
    }

    fetchListUsers(postData) {
        this.props.callFetchAPI(APIHostName, "api/CoordinatorGroup/LoadListUsers", postData).then(apiResult => {
            if (apiResult.IsError == false) {
                this.handleSetPropsExportData(apiResult.ResultObject);
                this.setState({
                    stateListUsers: apiResult.ResultObject
                })
            } else {
                this.setState({
                    stateListUsers: []
                })
            }
        });
    }

    handleCloseMessageModal() {
        const { stateMemberDisableAcceptBtn, stateDUserDisableAcceptBtn } = this.state;
        if (stateMemberDisableAcceptBtn == true && stateDUserDisableAcceptBtn == true) {
            this.props.hideModal();
        }
    }

    handleGetListFromPropsExportData() {
        const { propsExportData } = this.props;

        try {
            const { CoordinatorGroupMember } = propsExportData[0];
            const { CoordinatorGroupDUser } = propsExportData[1];

            const strCoordinatorGroupMember = CoordinatorGroupMember.reduce((acc, val, index) => {
                if (index == 0) {
                    return acc;
                } else {
                    return `${acc},${val[1]}`
                }
            }, "");

            const strCoordinatorGroupDUser = CoordinatorGroupDUser.reduce((acc, val, index) => {
                if (index == 0) {
                    return acc;
                } else {
                    return `${acc},${val[1]}`
                }
            }, "");
            this.fetchListUsers(`${strCoordinatorGroupMember},${strCoordinatorGroupDUser}`)
        } catch (error) {
            this.fetchListUsers("");
        }
    }

    handleSetPropsExportData(argumentListUsers = []) {
        const { propsExportData, propsMDCoordinatorGroup } = this.props;

        try {
            const { CoordinatorGroupMember } = propsExportData[0];
            const { CoordinatorGroupDUser } = propsExportData[1];

            const arrCoordinatorGroupMember = CoordinatorGroupMember.reduce((acc, val, index) => {
                if (index == 0) {
                    return acc;
                } else {
                    const foundCoordinatorGroup = propsMDCoordinatorGroup.find(element => element.CoordinatorGroupID == val[0]);
                    const foundUser = argumentListUsers.find(element => element.UserName == val[1]);

                    let ErrorContent = "";
                    if (foundCoordinatorGroup == undefined && foundUser == undefined) {
                        ErrorContent = "Mã nhóm quản lý không hợp lệ, mã nhân viên không hợp lệ";
                    } else if (foundCoordinatorGroup == undefined) {
                        ErrorContent = "Mã nhóm quản lý không hợp lệ";
                    } else if (foundUser == undefined) {
                        ErrorContent = "Mã nhân viên không hợp lệ";
                    }

                    return [
                        ...acc,
                        {
                            CoordinatorGroupID: val[0],
                            CoordinatorGroupName: foundCoordinatorGroup == undefined ? "" : foundCoordinatorGroup.CoordinatorGroupName,
                            UserName: val[1],
                            FullName: foundUser == undefined ? "" : foundUser.FullName,
                            IsError: foundCoordinatorGroup == undefined || foundUser == undefined ? true : false,
                            ErrorContent
                        }
                    ]
                }
            }, []);
            arrCoordinatorGroupMember.sort((a, b) => b.IsError - a.IsError || a.CoordinatorGroupID - b.CoordinatorGroupID);

            const arrCoordinatorGroupDUser = CoordinatorGroupDUser.reduce((acc, val, index) => {
                if (index == 0) {
                    return acc;
                } else {
                    const foundCoordinatorGroup = propsMDCoordinatorGroup.find(element => element.CoordinatorGroupID == val[0]);
                    const foundUser = argumentListUsers.find(element => element.UserName == val[1]);

                    let ErrorContent = "";
                    if (foundCoordinatorGroup == undefined && foundUser == undefined) {
                        ErrorContent = "Mã nhóm quản lý không hợp lệ, mã nhân viên không hợp lệ";
                    } else if (foundCoordinatorGroup == undefined) {
                        ErrorContent = "Mã nhóm quản lý không hợp lệ";
                    } else if (foundUser == undefined) {
                        ErrorContent = "Mã nhân viên không hợp lệ";
                    }

                    return [
                        ...acc,
                        {
                            CoordinatorGroupID: val[0],
                            CoordinatorGroupName: foundCoordinatorGroup == undefined ? "" : foundCoordinatorGroup.CoordinatorGroupName,
                            UserName: val[1],
                            FullName: foundUser == undefined ? "" : foundUser.FullName,
                            IsError: foundCoordinatorGroup == undefined || foundUser == undefined ? true : false,
                            ErrorContent
                        }
                    ]
                }
            }, []);
            arrCoordinatorGroupDUser.sort((a, b) => b.IsError - a.IsError || a.CoordinatorGroupID - b.CoordinatorGroupID);

            this.setState({
                stateCoordinatorGroupMember: arrCoordinatorGroupMember,
                stateCoordinatorGroupDUser: arrCoordinatorGroupDUser
            })
        } catch (error) {
            this.setState({
                stateCoordinatorGroupMember: [],
                stateCoordinatorGroupDUser: []
            })
        }
    }

    handleAcceptBtnInHeadingTitle(handleType, arrValid) {
        const postData = arrValid.map(item => {
            return {
                CoordinatorGroupID: item.CoordinatorGroupID,
                UserName: item.UserName,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            }
        });

        switch (handleType) {
            case "CoordinatorGroupMember":
                this.props.callFetchAPI(APIHostName, "api/CoordinatorGroup_Member/AddByFile2", postData).then(apiResult => {
                    if (apiResult.IsError == false) {
                        this.setState({
                            stateMemberDisableAcceptBtn: true
                        })
                    }
                    this.showMessage(apiResult.Message);
                });
                break;
            case "CoordinatorGroupDUser":
                this.props.callFetchAPI(APIHostName, "api/CoordinatorGroup_DUser/AddByFile2", postData).then(apiResult => {
                    if (apiResult.IsError == false) {
                        this.setState({
                            stateDUserDisableAcceptBtn: true
                        })
                    }
                    this.showMessage(apiResult.Message);
                });
                break;
            default:
                break;
        }
    }

    returnHeadingTitle(headingTitle, handleType) {
        const { stateCoordinatorGroupMember, stateCoordinatorGroupDUser, stateMemberDisableAcceptBtn, stateDUserDisableAcceptBtn } = this.state;
        let arrValid = [], countValid = 0, countInValid = 0, arrDataSource = [], disableBtn = false;

        switch (handleType) {
            case "CoordinatorGroupMember":
                arrDataSource = stateCoordinatorGroupMember;
                disableBtn = stateMemberDisableAcceptBtn;
                break;
            case "CoordinatorGroupDUser":
                arrDataSource = stateCoordinatorGroupDUser;
                disableBtn = stateDUserDisableAcceptBtn;
                break;
            default:
                break;
        }

        try {
            arrValid = arrDataSource.filter(item => item.IsError == false);
            countValid = arrValid.length;
            countInValid = arrDataSource.length - countValid;
            if (countValid == 0 || disableBtn) disableBtn = true;
        } catch (error) {
            arrValid = [];
            countValid = 0;
            countInValid = 0;
        } finally {
            return (
                <React.Fragment>
                    <h5 className="d-flex mb-2">{headingTitle}<i><small className="text-danger">&nbsp;(Chỉ chấp nhận những dòng hợp lệ)</small></i></h5>
                    <div className="container">
                        <div className="row ">
                            <div className="col d-flex justify-content-between align-items-center">
                                <p className="mb-0">Không hợp lệ: {countInValid}</p>
                                <p className="mb-0">Hợp lệ: {countValid}</p>
                                <p className="mb-0">Tổng cộng: {arrDataSource.length}</p>
                            </div>

                            <div className="col d-flex justify-content-end align-items-center">
                                <button type="button" className="btn btn-info mr-2" disabled={disableBtn} onClick={() => this.handleAcceptBtnInHeadingTitle(handleType, arrValid)}>Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        const { stateCoordinatorGroupMember, stateCoordinatorGroupDUser, stateListUsers } = this.state;
        if (stateCoordinatorGroupMember.length == 0 || stateCoordinatorGroupDUser.length == 0 || stateListUsers == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <DataGrid
                        headingTitle={this.returnHeadingTitle("Danh sách trưởng nhóm", "CoordinatorGroupMember")}
                        listColumn={lstColImportExcelModal}
                        dataSource={stateCoordinatorGroupMember}
                        PKColumnName={"UserName"}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        isHideHeaderToolbar={true}
                    />

                    <br />

                    <DataGrid
                        headingTitle={this.returnHeadingTitle("Danh sách nhân viên", "CoordinatorGroupDUser")}
                        listColumn={lstColImportExcelModal}
                        dataSource={stateCoordinatorGroupDUser}
                        PKColumnName={"UserName"}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        isHideHeaderToolbar={true}
                    />
                </React.Fragment>
            )
        }
    }
}

ImportExcelModalCom.defaultProps = {
    propsExportData: [],
    propsMDCoordinatorGroup: []
};

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportExcelModalCom);