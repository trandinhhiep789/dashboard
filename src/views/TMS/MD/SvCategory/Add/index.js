import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    API_SvCategory_Search,
    API_SvCategoryType_Search,
    APIHostName,
    initSearchData,
    listelement_Add,
    MLObjectDefinition_Add,
    PagePath_Add
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { createListTree } from "../../../../../common/library/ultils";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Files: {},
            listelementAdd: listelement_Add,
            svCategory: null,
            svCategoryType: null,
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.fetchsvCategory = this.fetchsvCategory.bind(this);
        this.fetchsvCategoryType = this.fetchsvCategoryType.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleSelectSvCategoryType = this.handleSelectSvCategoryType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTreeSelectParentID = this.handleTreeSelectParentID.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath_Add);
        this.fetchsvCategory();
        this.fetchsvCategoryType();
    }

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    fetchsvCategory() {
        this.props.callFetchAPI(APIHostName, API_SvCategory_Search, initSearchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleTreeSelectParentID(apiResult.ResultObject);

                this.setState({
                    svCategory: apiResult.ResultObject
                })
            } else {
                this.addNotification(apiResult.Message, true);
            }
        });
    }

    fetchsvCategoryType() {
        this.props.callFetchAPI(APIHostName, API_SvCategoryType_Search, initSearchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleSelectSvCategoryType(apiResult.ResultObject);
                this.setState({
                    svCategoryType: apiResult.ResultObject
                })
            } else {
                this.addNotification(apiResult.Message, true);
            }
        });
    }

    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
    }

    handleSelectSvCategoryType(data = []) {
        try {
            const listoption = data.reduce((acc, val) => {
                return [
                    ...acc,
                    {
                        ...val,
                        value: val.svCategoryTypeID,
                        label: `${val.svCategoryTypeID} - ${val.svCategoryTypeName}`
                    }
                ]
            }, [
                {
                    value: -1,
                    label: "- Vui lòng chọn -"
                }
            ]);

            const uptListelementAdd = this.state.listelementAdd.map(item => {
                if (item.name == "cbsvCategoryTypeID") {
                    return {
                        ...item,
                        listoption
                    }
                } else {
                    return item;
                }
            });

            this.setState({
                listelementAdd: uptListelementAdd
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        let data = new FormData();
        data.append("svCategoryImageURL", this.state.Files.svCategoryImageURL);
        data.append("svCategoryObj", JSON.stringify(MLObject));

        console.log(data, MLObject); return;

        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {

        });
    }

    handleTreeSelectParentID(data = []) {
        try {
            const sortedData = data.sort((a, b) => (a.ParentID > b.ParentID) ? 1 : (a.ParentID === b.ParentID) ? ((a.svCategoryID > b.svCategoryID) ? 1 : -1) : -1);

            let treeData = createListTree(sortedData, -1, "ParentID", "svCategoryID", "svCategoryName");

            treeData.unshift({
                ParentID: -1,
                svCategoryID: -1,
                svCategoryName: "",
                key: -1,
                value: -1,
                title: "- Vui lòng chọn -",
                label: "- Vui lòng chọn -",
                children: []
            });

            const listElementAdd = this.state.listelementAdd.map(item => {
                if (item.name == "cbParentID") {
                    return {
                        ...item,
                        treeData,
                        value: -1
                    }
                } else {
                    return item;
                }
            });

            this.setState({
                listelementAdd: listElementAdd
            });
        } catch (error) {
            console.log(error);
        }
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    render() {
        if (this.state.svCategoryType == null || this.state.svCategory == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <FormContainer
                        // RequirePermission={}
                        BackLink={"/SvCategory"}
                        dataSource={[]}
                        FormMessage={""}
                        FormName="Thêm danh mục dịch vụ"
                        IsAutoLayout={true}
                        IsErrorMessage={false}
                        listelement={this.state.listelementAdd}
                        MLObjectDefinition={MLObjectDefinition_Add}
                        onHandleSelectedFile={this.handleSelectedFile}
                        onSubmit={this.handleSubmit}
                    >
                    </FormContainer>
                </React.Fragment>
            );
        }
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);