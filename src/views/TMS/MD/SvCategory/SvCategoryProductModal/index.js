import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    PagePath,
    APIHostName,
    MLObjectDefinition_svCategoryProduct,
    listelement_svCategoryProduct,
    MLObjectDefinitionSvCategoryProductModal
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import ProductComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox.js";

class SvCategoryProductModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initData: this.props.initData,
            validationErrorMessage: {
                OrderIndex: ""
            }
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleChangeComments = this.handleChangeComments.bind(this);
        this.handleChangeOrderIndex = this.handleChangeOrderIndex.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
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

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, "", searchData).then(apiResult => {
            if (!apiResult.IsError) {

            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleChangeComments(name, value) {
        this.setState({
            initData: {
                ...this.state.initData,
                Comments: value
            }
        })
    }

    handleChangeOrderIndex(name, value) {
        this.setState({
            initData: {
                ...this.state.initData,
                OrderIndex: value
            },
            validationErrorMessage: {
                ...this.state.validationErrorMessage,
                OrderIndex: ""
            }
        });
    }

    handleSubmit(FormData, MLObject) {
        if (MLObject.ProductID[0].ProductID == "" || !MLObject.ProductID[0].ProductID) {
            this.addNotification("Vui lòng chọn Sản phẩm/ dịch vụ", true);
            return;
        }
        if (/\D/g.test(this.state.initData.OrderIndex)) {
            this.setState({
                validationErrorMessage: {
                    ...this.state.validationErrorMessage,
                    OrderIndex: "Vui lòng nhập số"
                }
            })
            return;
        } else if (this.state.initData.OrderIndex == "") {
            this.setState({
                validationErrorMessage: {
                    ...this.state.validationErrorMessage,
                    OrderIndex: "Vui lòng nhập Thứ Tự Hiển Thị"
                }
            })
            return;
        }

        this.props.handleSubmit({
            ...MLObject.ProductID[0],
            OrderIndex: parseInt(this.state.initData.OrderIndex),
            Comments: this.state.initData.Comments
        }, this.props.initProductID)
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
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    MLObjectDefinition={MLObjectDefinitionSvCategoryProductModal}
                    listelement={[]}
                    IsCloseModal={true}
                    onSubmit={this.handleSubmit}
                >
                    <ProductComboBox
                        colspan="8"
                        controltype="InputControl"
                        datasourcemember="ProductID"
                        disabled={false}
                        IsLabelDiv={true}
                        isMulti={false}
                        label="sản phẩm/dịch vụ"
                        labelcolspan="4"
                        name="ProductID"
                        placeholder="Sản phẩm/dịch vụ"
                        validationErrorMessage={"123"}
                        validatonList={["Comborequired"]}
                        value={this.state.initData.Product}
                    />

                    <FormControl.TextBox
                        colspan="8"
                        controltype="OrderIndex"
                        datasourcemember="OrderIndex"
                        label="Thứ Tự Hiển Thị"
                        labelcolspan="4"
                        maxSize={10}
                        name="OrderIndex"
                        onValueChange={this.handleChangeOrderIndex}
                        placeholder="Thứ Tự Hiển Thị"
                        validationErrorMessage={this.state.validationErrorMessage.OrderIndex}
                        validatonList={['required', 'numbers']}
                        value={this.state.initData.OrderIndex}
                    />

                    <FormControl.TextArea
                        colspan="8"
                        controltype="Comments"
                        datasourcemember="Comments"
                        label="Ghi chú"
                        labelcolspan="4"
                        maxSize={2000}
                        name="Comments"
                        onValueChange={this.handleChangeComments}
                        placeholder="Ghi chú"
                        validatonList={[]}
                        value={this.state.initData.Comments}
                    />
                </FormContainer>
            </React.Fragment>
        );
    }
}

SvCategoryProductModalCom.defaultProps = {
    initData: {
        Product: [{ ProductID: "", ProductName: "" }],
        OrderIndex: "",
        Comments: ""
    },
    handleSubmit: () => { },
    initProductID: -1
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SvCategoryProductModalCom);