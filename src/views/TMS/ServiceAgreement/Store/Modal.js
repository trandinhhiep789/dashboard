import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';

import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import FormControl from "../../../../common/components/FormContainer/FormControl";

class StoreModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: this.props.dataGrid,
            dataItem: this.props.dataItem,
            errorStore: ""
        };

        this.handleChangeStore = this.handleChangeStore.bind(this);
        this.handleChangeIsActived = this.handleChangeIsActived.bind(this);
        this.handleChangeIsSystem = this.handleChangeIsSystem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
    }

    handleChangeStore(value) {
        if (!value) {
            this.setState({
                errorStore: "Vui lòng chọn kho áp dụng hợp đồng này"
            })
        } else {
            this.setState({
                errorStore: ""
            })
        }

        this.setState({
            dataItem: {
                ...this.state.dataItem,
                ...value
            }
        })
    }

    handleChangeIsActived(name, value) {
        this.setState({
            dataItem: {
                ...this.state.dataItem,
                IsActived: value
            }
        })
    }

    handleChangeIsSystem(name, value) {
        this.setState({
            dataItem: {
                ...this.state.dataItem,
                IsSystem: value
            }
        })
    }

    handleSubmit() {
        try {
            switch (this.props.modalType) {
                case "ADD":
                    if (this.state.dataItem.StoreID == "") {
                        this.setState({
                            errorStore: "Vui lòng chọn kho áp dụng hợp đồng này"
                        })
                        return;
                    }

                    this.props.dataSubmit([...this.props.dataGrid, this.state.dataItem], this.state.dataItem);
                    this.props.hideModal();
                    break;

                case "EDIT":
                    const uptdataGrid = this.props.dataGrid.map(item => {
                        if (item.StoreID == this.state.dataItem.StoreID) {
                            return {
                                ...this.state.dataItem,
                                UpdatedUser: this.props.AppInfo.LoginInfo.Username
                            };
                        } else {
                            return item;
                        }
                    })
                    this.props.dataSubmit(uptdataGrid, { ...this.state.dataItem, UpdatedUser: this.props.AppInfo.LoginInfo.Username });
                    this.props.hideModal();
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.showMessage("Lỗi thêm");
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
                <div className="row p-4">
                    <div className="col-12 mb-2">
                        <FormControl.PartialSelect
                            colspan="8"
                            dataRemove={this.props.dataGrid} // những item đã tồn tại ở table => remove khỏi select
                            defaultValue={
                                this.props.dataItem.StoreID == ""
                                    ? null
                                    : {
                                        value: this.props.dataItem.StoreID,
                                        label: `${this.props.dataItem.StoreID} - ${this.props.dataItem.StoreName}`
                                    }
                            }
                            isDisabled={this.props.isDisabledStore}
                            isautoloaditemfromcache={true}
                            isMultiSelect={false}
                            isShowLable={false}
                            label="kho"
                            labelcolspan="4"
                            loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                            nameMember="StoreName"
                            onChange={this.handleChangeStore}
                            placeholder="Mã kho"
                            validationErrorMessage={this.state.errorStore}
                            validatonList={["Comborequired"]}
                            valuemember="StoreID"
                        />
                    </div>

                    <div className="col-12">
                        <FormControl.CheckBox
                            classNameCustom=""
                            colspan="8"
                            controltype="InputControl"
                            label="Kích hoạt"
                            labelcolspan="4"
                            name="chkIsActived"
                            onValueChange={this.handleChangeIsActived}
                            value={this.state.dataItem.IsActived}
                        />
                    </div>

                    <div className="col-12">
                        <FormControl.CheckBox
                            classNameCustom=""
                            colspan="8"
                            controltype="InputControl"
                            label="Hệ thống"
                            labelcolspan="4"
                            name="chkIsSystem"
                            onValueChange={this.handleChangeIsSystem}
                            value={this.state.dataItem.IsSystem}
                        />
                    </div>
                </div>

                <div className="row justify-content-end px-4 py-2">
                    <button
                        className="btn btn-primary mr-2"
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Cập nhật
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => this.props.hideModal()}
                        type="button"
                    >
                        Đóng
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

StoreModalCom.defaultProps = {
    dataItem: {
        StoreID: "",
        IsActived: true,
        IsSystem: false
    },
    dataGrid: [],
    dataSubmit: () => { },
    isDisabledStore: false,
    modalType: ""
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreModalCom);
