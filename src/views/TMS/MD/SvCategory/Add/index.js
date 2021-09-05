import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    API_SvCategory_Add,
    API_SvCategory_Search,
    API_SvCategoryType_Search,
    APIHostName,
    initSearchData,
    listColumn_SvCategoryProduct,
    listelement_Add,
    MLObjectDefinition_Add,
    PagePath_Add
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { createListTree } from "../../../../../common/library/ultils";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import SvCategoryProductModalCom from '../SvCategoryProductModal';
class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Files: {},
            listelementAdd: listelement_Add,
            svCategory: null,
            svCategoryProduct: [],
            svCategoryType: null
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.fetchsvCategory = this.fetchsvCategory.bind(this);
        this.fetchsvCategoryType = this.fetchsvCategoryType.bind(this);
        this.handleEditSvCategoryProduct = this.handleEditSvCategoryProduct.bind(this);
        this.handleInsertSvCategoryProduct = this.handleInsertSvCategoryProduct.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleSelectSvCategoryType = this.handleSelectSvCategoryType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitInsertEditSvCategoryProduct = this.handleSubmitInsertEditSvCategoryProduct.bind(this);
        this.handleSubmitSvCategoryProduct = this.handleSubmitSvCategoryProduct.bind(this);
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

    handleEditSvCategoryProduct(value, pkColumnName) {
        const dataItem = this.state.svCategoryProduct.find(item => item.ProductID == value.pkColumnName[0].value);
        const initData = {
            Product: [{ ProductID: dataItem.ProductID, ProductName: dataItem.ProductName }],
            OrderIndex: dataItem.OrderIndex,
            Comments: dataItem.Comments
        };

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Chỉnh sửa sản phẩm/dịch vụ thuộc 1 danh mục dịch vụ",
            content: {
                text: <SvCategoryProductModalCom
                    handleSubmit={this.handleSubmitInsertEditSvCategoryProduct}
                    initData={initData}
                    initProductID={value.pkColumnName[0].value}
                />
            }
        });
    }

    handleInsertSvCategoryProduct() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Thêm sản phẩm/dịch vụ thuộc 1 danh mục dịch vụ",
            content: {
                text: <SvCategoryProductModalCom
                    handleSubmit={this.handleSubmitSvCategoryProduct}
                />
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
        const uptMLObject = {
            ...MLObject,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
            lstSvCategory_Product: this.state.svCategoryProduct,
            OrderIndex: parseInt(MLObject.OrderIndex),
            svCategoryTypeID: parseInt(MLObject.svCategoryTypeID)
        };

        let data = new FormData();
        data.append("svCategoryImageURL", this.state.Files.svCategoryImageURL);
        data.append("svCategoryObj", JSON.stringify(uptMLObject));

        this.props.callFetchAPI(APIHostName, API_SvCategory_Add, data).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.props.history.push("/SvCategory");
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }

    handleSubmitInsertEditSvCategoryProduct(data, initProductID) {
        const uptSvCategoryProduct = this.state.svCategoryProduct.map((item, index) => {
            if (item.ProductID == initProductID) {
                return data;
            } else {
                return item;
            }
        })

        this.setState({
            svCategoryProduct: uptSvCategoryProduct
        })

        this.props.hideModal();
    }

    handleSubmitSvCategoryProduct(data) {
        if (this.state.svCategoryProduct.find(item => item.ProductID == data.ProductID)) {
            this.addNotification("Mã sản phẩm đã tồn tại", true);
            return;
        }

        this.setState({
            svCategoryProduct: [...this.state.svCategoryProduct, data]
        });

        this.props.hideModal();
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
                        <DataGrid
                            dataSource={this.state.svCategoryProduct}
                            headingTitle={"Danh sách sản phẩm/dịch vụ thuộc 1 danh mục dịch vụ"}
                            IDSelectColumnName={"ProductID"}
                            IsAutoPaging={true}
                            IsCustomAddLink={true}
                            IsShowButtonDelete={false}
                            listColumn={listColumn_SvCategoryProduct}
                            onInsertClick={this.handleInsertSvCategoryProduct}
                            onInsertClickEdit={this.handleEditSvCategoryProduct}
                            PKColumnName={"ProductID"}
                        />
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