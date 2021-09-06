import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
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
            validationErrorMessage: {
                OrderIndex: ""
            },
            dataSubmit: this.props.selectedItem,
            selectedIndex: -1
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleChangeComments = this.handleChangeComments.bind(this);
        this.handleChangeOrderIndex = this.handleChangeOrderIndex.bind(this);
        this.handleSetSelectedIndex = this.handleSetSelectedIndex.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.handleSetSelectedIndex();
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

    handleChangeComments(name, value) {
        this.setState({
            dataSubmit: {
                ...this.state.dataSubmit,
                Comments: value
            }
        })
    }

    handleChangeOrderIndex(name, value) {
        this.setState({
            dataSubmit: {
                ...this.state.dataSubmit,
                OrderIndex: value == "" ? "" : parseInt(value)
            },
            validationErrorMessage: {
                ...this.state.validationErrorMessage,
                OrderIndex: ""
            }
        });
    }

    handleSetSelectedIndex() {
        const { ProductID } = this.props.selectedItem.Product[0];
        const selectedIndex = this.props.initDataGrid.findIndex(item => item.ProductID == ProductID);

        this.setState({
            selectedIndex
        })
    }

    handleSubmit(FormData, MLObject) {
        if (MLObject.ProductID[0].ProductID == "" || !MLObject.ProductID[0].ProductID) {
            this.addNotification("Vui lòng chọn Sản phẩm/ dịch vụ", true);
            return;
        }
        if (/\D/g.test(this.state.dataSubmit.OrderIndex)) {
            this.setState({
                validationErrorMessage: {
                    ...this.state.validationErrorMessage,
                    OrderIndex: "Vui lòng nhập số"
                }
            })
            return;
        } else if (this.state.dataSubmit.OrderIndex == "") {
            this.setState({
                validationErrorMessage: {
                    ...this.state.validationErrorMessage,
                    OrderIndex: "Vui lòng nhập Thứ Tự Hiển Thị"
                }
            })
            return;
        }

        if (this.state.selectedIndex == -1) { //modal add
            if (!this.props.initDataGrid.find(item => item.ProductID == MLObject.ProductID[0].ProductID)) {
                this.props.handleSubmit([
                    ...this.props.initDataGrid,
                    {
                        ...MLObject.ProductID[0],
                        OrderIndex: this.state.dataSubmit.OrderIndex,
                        Comments: this.state.dataSubmit.Comments
                    }
                ])
            } else {
                this.addNotification("Mã sản phẩm đã tồn tại", true);
            }
        } else { //modal edit
            const tempInitDataGrid = this.props.initDataGrid.filter((item, index) => index != this.state.selectedIndex);

            if (!tempInitDataGrid.find(item => item.ProductID == MLObject.ProductID[0].ProductID)) {
                const uptInitDataGrid = this.props.initDataGrid.map((item, index) => {
                    if (index == this.state.selectedIndex) {
                        return {
                            ...MLObject.ProductID[0],
                            OrderIndex: this.state.dataSubmit.OrderIndex,
                            Comments: this.state.dataSubmit.Comments
                        }
                    } else {
                        return item;
                    }
                });

                this.props.handleSubmit(uptInitDataGrid);
            } else {
                this.addNotification("Mã sản phẩm đã tồn tại", true);
            }
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
                        disabled={this.props.disableProduct}
                        IsLabelDiv={true}
                        isMulti={false}
                        label="sản phẩm/dịch vụ"
                        labelcolspan="4"
                        name="ProductID"
                        placeholder="Sản phẩm/dịch vụ"
                        validationErrorMessage={"123"}
                        validatonList={["Comborequired"]}
                        value={this.state.dataSubmit.Product}
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
                        value={this.state.dataSubmit.OrderIndex}
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
                        value={this.state.dataSubmit.Comments}
                    />
                </FormContainer>
            </React.Fragment>
        );
    }
}

SvCategoryProductModalCom.defaultProps = {
    selectedItem: {
        Product: [{ ProductID: "", ProductName: "" }],
        OrderIndex: "",
        Comments: ""
    },
    disableProduct: false,
    handleSubmit: () => { },
    initDataGrid: []
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