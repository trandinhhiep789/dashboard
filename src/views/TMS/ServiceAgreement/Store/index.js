import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    DataTemplateExportStore,
    listColumnImportFileStore,
    listColumnStore,
    StoreSchema
} from '../constants';
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import DataGrid from "../../../../common/components/DataGrid";
import ModalCom from './Modal';
import ImportExcelModalCom from '../ImportExcelModal';
import { callGetCache } from "../../../../actions/cacheAction";

class StoreCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            deletedData: []
        };

        this.addNotification = this.addNotification.bind(this);
        this.handleDataSubmit = this.handleDataSubmit.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleExportFileTemplateStore = this.handleExportFileTemplateStore.bind(this);
        this.handleImportFile = this.handleImportFile.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
        this.handleSetImportData = this.handleSetImportData.bind(this);
        this.handleSubmitImportFile = this.handleSubmitImportFile.bind(this);
        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
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

    handleDataSubmit(value) {
        if (this.props.dataSource.length == 0) {
            this.setState({
                dataSource: value
            })
            this.props.serviceAgreementStoreSubmit(value);
        } else {
            if (this.state.deletedData.length == 0) {
                this.setState({
                    dataSource: value
                })
                this.props.serviceAgreementStoreSubmit(value);
            } else {
                const uptValue = value.map(item => {
                    const found = this.state.deletedData.find(item1 => item1.StoreID == item.StoreID);

                    if (found == undefined) {
                        return item;
                    } else {
                        return {
                            ...found,
                            IsDeleted: false
                        };
                    }
                });

                const uptDeletedData = this.state.deletedData.filter(item => {
                    const found = uptValue.find(item1 => item1.StoreID == item.StoreID);

                    if (found == undefined) {
                        return item;
                    }
                });

                this.setState({
                    dataSource: uptValue,
                    deletedData: uptDeletedData
                })
                this.props.serviceAgreementStoreSubmit([...uptValue, ...uptDeletedData]);
            }
        }
    }

    handleDeleteClick(listDeleteID, ListPKColumnName) {
        const listDeleteStoreID = listDeleteID.map(item => {
            return {
                StoreID: item.pkColumnName[0].value
            }
        })

        const uptDataSource = this.state.dataSource.filter(item => {
            const found = listDeleteStoreID.find(item1 => item1.StoreID == item.StoreID);

            return found == undefined;
        })

        if (this.props.dataSource.length == 0) {
            this.props.serviceAgreementStoreSubmit(uptDataSource);
        } else {
            const deletedData = this.props.dataSource.reduce((acc, val) => {
                const found = listDeleteStoreID.find(item1 => item1.StoreID == val.StoreID);

                if (found == undefined) {
                    return acc;
                } else {
                    return [...acc, { ...val, IsDeleted: true }]
                }
            }, [...this.state.deletedData]);

            this.props.serviceAgreementStoreSubmit([...uptDataSource, ...deletedData]);

            this.setState({
                deletedData // chỉ áp dụng cho bảng edit
            })
        }

        this.setState({
            dataSource: uptDataSource
        })
    }

    handleExportFileTemplateStore(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFile() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema: StoreSchema }).then((data) => {
                this.handleSetImportData(data);
            }).catch(error => {
                console.log("handleImportFile", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác")
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleInsertClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm kho áp dụng hợp đồng này',
            content: {
                text: <ModalCom
                    dataGrid={this.state.dataSource}
                    dataSubmit={this.handleDataSubmit}
                    modalType="ADD"
                />
            },
            maxWidth: '800px'
        });
    }

    handleInsertClickEdit(id, pkColumnName) {
        const dataItem = this.state.dataSource.find(item => item.StoreID == id.pkColumnName[0].value);

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật kho áp dụng hợp đồng này',
            content: {
                text: <ModalCom
                    dataGrid={this.state.dataSource}
                    dataItem={dataItem}
                    dataSubmit={this.handleDataSubmit}
                    isDisabledStore={true}
                    modalType="EDIT"
                />
            },
            maxWidth: '800px'
        });
    }

    handleSetImportData(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        if (values.errors.length != 0) {
            for (const item of values.errors) {
                let errorText = "";
                if (dataSource[item.row - 1]) {
                    if (dataSource[item.row - 1].Errors == "") {
                        errorText = item.column;
                    } else {
                        errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
                    }
                    dataSource[item.row - 1].Errors = errorText;
                }
            }
        }
        //#endregion

        //#region check nhập trùng
        if (this.state.dataSource.length != 0) {
            dataSource.forEach((element, index) => {
                const found = this.state.dataSource.find(item => item.StoreID == element.StoreID);

                if (found) {
                    let errorText = "";
                    if (dataSource[index].Errors == "") {
                        errorText = "Nhập trùng";
                    } else {
                        errorText = `Nhập trùng, ${dataSource[index].Errors}`
                    }

                    dataSource[index].Errors = errorText;
                }
            });
        }
        //#endregion

        this.props.callGetCache("ERPCOMMONCACHE.STORE")
            .then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {

                    //#region check tồn tại mã kho
                    dataSource.forEach((element, index) => {
                        const found = result.ResultObject.CacheData.find(item => item.StoreID == element.StoreID);

                        if (found) {
                            dataSource[index] = {
                                ...dataSource[index],
                                ...found
                            };
                        } else {
                            let errorText = "";
                            if (dataSource[index].Errors == "") {
                                errorText = "Không tồn tại mã kho";
                            } else {
                                errorText = `Không tồn tại mã kho, ${dataSource[index].Errors}`
                            }

                            dataSource[index].StoreName = "";
                            dataSource[index].Errors = errorText;
                        }
                    });
                    //#endregion

                    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                        title: 'Kết quả nhập từ excel',
                        content: {
                            text: <ImportExcelModalCom
                                dataSource={dataSource}
                                listColumn={listColumnImportFileStore}
                                onSubmit={this.handleSubmitImportFile}
                                PKColumnName="StoreID"
                                titleModal="Danh sách kho áp dụng hợp đồng"
                            />
                        },
                        maxWidth: '80%'
                    })
                } else {
                    this.showMessage("Lỗi import file");
                }
            })
            .catch(error => {
                console.log("handleSetImportData", error);
                this.showMessage("Lỗi import file");
            })
    }

    handleSubmitImportFile(data = []) {
        const value = data.reduce((acc, val) => {
            return [
                ...acc,
                {
                    ...val,
                    IsActived: true,
                    IsSystem: false
                }
            ]
        }, [...this.state.dataSource]);

        if (this.props.dataSource.length == 0) {
            this.setState({
                dataSource: value
            })
            this.props.serviceAgreementStoreSubmit(value);
        } else {
            if (this.state.deletedData.length == 0) {
                this.setState({
                    dataSource: value
                })
                this.props.serviceAgreementStoreSubmit(value);
            } else {
                const uptValue = value.map(item => {
                    const found = this.state.deletedData.find(item1 => item1.StoreID == item.StoreID);

                    if (found == undefined) {
                        return item;
                    } else {
                        return {
                            ...found,
                            IsDeleted: false
                        };
                    }
                });

                const uptDeletedData = this.state.deletedData.filter(item => {
                    const found = uptValue.find(item1 => item1.StoreID == item.StoreID);

                    if (found == undefined) {
                        return item;
                    }
                })
                this.setState({
                    dataSource: uptValue,
                    deletedData: uptDeletedData
                })
                this.props.serviceAgreementStoreSubmit([...uptValue, ...uptDeletedData]);
            }
        }
        this.props.hideModal();
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

                <DataGrid
                    dataSource={this.state.dataSource}
                    DataTemplateExport={DataTemplateExportStore}
                    fileNameTemplate="Danh sách kho áp dụng hợp đồng"
                    headingTitle="Danh sách kho áp dụng hợp đồng"
                    IDSelectColumnName={"chkSelect"}
                    IsAdd={true}
                    IsAutoPaging={false}
                    IsCustomAddLink={true}
                    isCustomImportFile={true}
                    IsDelete={true}
                    IsExportFile={false}
                    isExportFileTemplate={true}
                    isHideHeaderToolbar={false}
                    IsImportFile={true}
                    IsPrint={false}
                    IsShowButtonAdd={true}
                    IsShowButtonDelete={true}
                    IsShowButtonPrint={false}
                    listColumn={listColumnStore}
                    onDeleteClick={this.handleDeleteClick}
                    onExportFileTemplate={this.handleExportFileTemplateStore}
                    onImportFile={this.handleImportFile}
                    onInsertClick={this.handleInsertClick}
                    onInsertClickEdit={this.handleInsertClickEdit}
                    PKColumnName={"StoreID"}
                    RowsPerPage={10}
                />

                <input type="file" id="inputImportFile" hidden />
            </React.Fragment>
        );
    }
}

StoreCom.defaultProps = {
    dataSource: [],
    serviceAgreementStoreSubmit: () => { }
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreCom);
