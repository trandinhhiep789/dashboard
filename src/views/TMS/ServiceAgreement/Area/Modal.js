import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';

import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import FormControl from "../../../../common/components/FormContainer/FormControl";

class AreaModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: this.props.dataGrid,
            dataItem: this.props.dataItem,
            errorArea: ""
        };

        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangeIsActived = this.handleChangeIsActived.bind(this);
        this.handleChangeIsSystem = this.handleChangeIsSystem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
    }

    handleChangeArea(value) {
        if (!value) {
            this.setState({
                errorArea: "Vui lòng chọn khu vực áp dụng hợp đồng này"
            })
        } else {
            this.setState({
                errorArea: ""
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
                    if (this.state.dataItem.AreaID == "") {
                        this.setState({
                            errorArea: "Vui lòng chọn khu vực áp dụng hợp đồng này"
                        })
                        return;
                    }

                    this.props.dataSubmit([...this.props.dataGrid, this.state.dataItem]);
                    this.props.hideModal();
                    break;

                case "EDIT":
                    const uptdataGrid = this.props.dataGrid.map(item => {
                        if (item.AreaID == this.state.dataItem.AreaID) {
                            return this.state.dataItem;
                        } else {
                            return item;
                        }
                    })
                    this.props.dataSubmit(uptdataGrid);
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
                                this.props.dataItem.AreaID == ""
                                    ? null
                                    : {
                                        value: this.props.dataItem.AreaID,
                                        label: `${this.props.dataItem.AreaID} - ${this.props.dataItem.AreaName}`
                                    }
                            }
                            isDisabled={this.props.isDisabledArea}
                            isautoloaditemfromcache={true}
                            isMultiSelect={false}
                            isShowLable={false}
                            label="khu vực"
                            labelcolspan="4"
                            loaditemcachekeyid="ERPCOMMONCACHE.AREATT"
                            nameMember="AreaName"
                            onChange={this.handleChangeArea}
                            placeholder="Mã khu vực"
                            validationErrorMessage={this.state.errorArea}
                            validatonList={["Comborequired"]}
                            valuemember="AreaID"
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

AreaModalCom.defaultProps = {
    dataItem: {
        AreaID: "",
        IsActived: true,
        IsSystem: false
    },
    dataGrid: [],
    dataSubmit: () => { },
    isDisabledArea: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(AreaModalCom);
