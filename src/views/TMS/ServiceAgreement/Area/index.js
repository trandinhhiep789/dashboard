import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';

import { listColumnArea } from '../constants';
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import DataGrid from "../../../../common/components/DataGrid";
import ModalCom from './Modal';

class AreaCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            deletedData: []
        };

        this.handleDataSubmit = this.handleDataSubmit.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
    }

    handleDataSubmit(value) {
        if (this.props.dataSource.length == 0) {
            this.setState({
                dataSource: value
            })
            this.props.serviceAgreementAreaSubmit(value);
        } else {
            if (this.state.deletedData.length == 0) {
                this.setState({
                    dataSource: value
                })
                this.props.serviceAgreementAreaSubmit(value);
            } else {
                const uptValue = value.map(item => {
                    const found = this.state.deletedData.find(item1 => item1.AreaID == item.AreaID);

                    if (found == undefined) {
                        return item;
                    } else {
                        return found;
                    }
                });
                this.setState({
                    dataSource: uptValue
                })
                this.props.serviceAgreementAreaSubmit(uptValue);
            }
        }
    }

    handleDeleteClick(listDeleteID, ListPKColumnName) {
        const listDeleteAreaID = listDeleteID.map(item => {
            return {
                AreaID: item.pkColumnName[0].value
            }
        })

        const uptDataSource = this.state.dataSource.filter(item => {
            const found = listDeleteAreaID.find(item1 => item1.AreaID == item.AreaID);

            return found == undefined;
        })

        if (this.props.dataSource.length == 0) {
            this.props.serviceAgreementAreaSubmit(uptDataSource);
        } else {
            const deletedData = this.props.dataSource.reduce((acc, val) => {
                const found = listDeleteAreaID.find(item1 => item1.AreaID == val.AreaID);

                if (found == undefined) {
                    return acc;
                } else {
                    return [...acc, { ...val, IsDeleted: true }]
                }
            }, []);

            this.props.serviceAgreementAreaSubmit([...uptDataSource, ...deletedData]);

            this.setState({
                deletedData // chỉ áp dụng cho bảng edit
            })
        }

        this.setState({
            dataSource: uptDataSource
        })
    }

    handleInsertClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm khu vực áp dụng hợp đồng này',
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
        const dataItem = this.state.dataSource.find(item => item.AreaID == id.pkColumnName[0].value);

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật khu vực áp dụng hợp đồng này',
            content: {
                text: <ModalCom
                    dataGrid={this.state.dataSource}
                    dataItem={dataItem}
                    dataSubmit={this.handleDataSubmit}
                    isDisabledArea={true}
                    modalType="EDIT"
                />
            },
            maxWidth: '800px'
        });
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
                <DataGrid
                    dataSource={this.state.dataSource}
                    headingTitle="Danh sách khu vực áp dụng hợp đồng"
                    IDSelectColumnName={"chkSelect"}
                    IsAdd={true}
                    IsAutoPaging={true}
                    IsCustomAddLink={true}
                    IsDelete={true}
                    IsExportFile={false}
                    isHideHeaderToolbar={false}
                    IsPrint={false}
                    IsShowButtonAdd={true}
                    IsShowButtonDelete={true}
                    IsShowButtonPrint={false}
                    listColumn={listColumnArea}
                    onDeleteClick={this.handleDeleteClick}
                    onInsertClick={this.handleInsertClick}
                    onInsertClickEdit={this.handleInsertClickEdit}
                    PKColumnName={"AreaID"}
                    RowsPerPage={10}
                />
            </React.Fragment>
        );
    }
}

AreaCom.defaultProps = {
    dataSource: [],
    serviceAgreementAreaSubmit: () => { }
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaCom);
