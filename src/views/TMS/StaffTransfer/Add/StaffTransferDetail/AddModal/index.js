import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { DatePicker } from 'antd';
import moment from 'moment';
import "react-notifications-component/dist/theme.css";

import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_COORDINATORGROUP } from "../../../../../../constants/keyCache";
import { MessageModal } from "../../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../../actions/modal';
import { listelement, MLObjectDefinition, APIHostName, listColumn } from './constants';
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import MyContext from '../../Context';


class AddModal extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            CoordinatorGroupData: null,
            CACHE_COORDINATORGROUP: null,
            dataGrid: [],
            isError: false
        }

        this.searchref = React.createRef();

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSearchForm = this.handleChangeSearchForm.bind(this);
        this.handleSetDataGrid = this.handleSetDataGrid.bind(this);
        this.handleChangeNewCoordinatorGroup = this.handleChangeNewCoordinatorGroup.bind(this);
        this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);

        this.fetchCoordinatorGroupData = this.fetchCoordinatorGroupData.bind(this);
        this.getCacheCoordinatorGroupData = this.getCacheCoordinatorGroupData.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
    }

    componentDidMount() {
        this.getCacheCoordinatorGroupData();
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

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit() {
        const { dataGrid } = this.state;

        let errorFlag = false;
        dataGrid.forEach(item => {
            if ((this.state[item.UserName] != null && this.state[`APPLYDATE_${item.UserName}`] == "")
                || (this.state[item.UserName] == null && this.state[`APPLYDATE_${item.UserName}`] != "")) {
                errorFlag = true;
            }
        })

        if (errorFlag == true) {
            this.showMessage("Vui lòng chọn đầy đủ điều kiện thuyên chuyển");
            return;
        }

        const dataSubmit = dataGrid.reduce((acc, val) => {
            if (this.state[val.UserName] == null) {
                return acc;
            } else {
                return [
                    ...acc,
                    {
                        RequestDate: new Date(),
                        UserName: val.UserName,
                        FullName: val.FullName,
                        FromCoordinatorGroupID: parseInt(val.CoordinatorGroupID),
                        ToCoordinatorGroupID: this.state[val.UserName].value,
                        ApplyDate: new Date(this.state[`APPLYDATE_${val.UserName}`]),
                        IsSystem: val.IsSystem,
                        CreatedUser: this.props.AppInfo.LoginInfo.Username
                    }
                ]
            }
        }, []);

        if (dataSubmit.length == 0) {
            this.showMessage("Vui lòng chọn ít nhất một điều kiện thuyên chuyển");
            return;
        }

        this.context.handleAddStaffTransferDetailData(dataSubmit);
        this.props.hideModal();
    }

    handleChangeSearchForm(FormDataContolLstd, MLObjectDefinition) {
        this.fetchCoordinatorGroupData(FormDataContolLstd.cbCoordinatorGroupID.value);
    }

    handleSetDataGrid(ResultObject) {
        try {
            const { CACHE_COORDINATORGROUP } = this.state;
            const { StaffTransferDetail } = this.context;
            const { ListCoordinatorGroup_DUser } = ResultObject;

            const notItemSelect = ListCoordinatorGroup_DUser.reduce((acc, val) => {
                const found = StaffTransferDetail.findIndex(item => item.FromCoordinatorGroupID == val.CoordinatorGroupID && item.UserName == val.UserName);

                if (found == -1) {
                    return [
                        ...acc,
                        val
                    ]
                } else {
                    return acc;
                }
            }, []);

            const dataGrid = notItemSelect.map(item => {
                const options = CACHE_COORDINATORGROUP.reduce((acc, val) => {
                    if (item.CoordinatorGroupID == val.CoordinatorGroupID) {
                        return acc;
                    } else {
                        return [
                            ...acc,
                            { value: val.CoordinatorGroupID, label: `${val.CoordinatorGroupID} - ${val.CoordinatorGroupName}` }
                        ]
                    }
                }, []);

                return {
                    ...item,
                    options
                }
            })

            dataGrid.forEach(element => {
                this.setState({
                    [element.UserName]: null,
                    [`APPLYDATE_${element.UserName}`]: ""
                })
            });

            this.setState({
                dataGrid
            })
        } catch (error) {
            this.setState({
                dataGrid: []
            })
        }
    }

    handleChangeNewCoordinatorGroup(...data) {
        const { name } = data[1];
        try {
            const { value, label } = data[0];

            this.setState({
                [name]: { value, label }
            })
        } catch (error) {
            this.setState({
                [name]: null
            })
        }
    }

    handleChangeDatePicker(...data) {
        try {
            this.setState({
                [`APPLYDATE_${data[2]}`]: data[1]
            })
        } catch (error) {
            this.setState({
                [`APPLYDATE_${data[2]}`]: ""
            })
        }
    }

    fetchCoordinatorGroupData(id) {
        this.props.callFetchAPI(APIHostName, "api/CoordinatorGroup/Load", id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.handleSetDataGrid(apiResult.ResultObject);
                this.setState({ CoordinatorGroupData: apiResult.ResultObject });
            }
        });
    }

    getCacheCoordinatorGroupData() {
        this.props.callGetCache(ERPCOMMONCACHE_COORDINATORGROUP).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    CACHE_COORDINATORGROUP: result.ResultObject.CacheData
                });
            }
        });
    }

    disabledDate(current) {
        return current < moment().add(-1, 'days');;
    }

    render() {
        const { CoordinatorGroupData, dataGrid, isError } = this.state;

        return (
            <div className="card modalForm">
                <SearchForm
                    FormName={""}
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={listelement}
                    onchange={this.handleChangeSearchForm}
                    ref={this.searchref}
                    IsShowButtonSearch={false}
                    className="multiple multiple-custom multiple-custom-display"
                    classNamebtnSearch="btn-custom-bottom"
                />

                {
                    CoordinatorGroupData != null ? <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell">Mã nhân viên giao hàng</th>
                                            <th className="jsgrid-header-cell">Tên nhân viên giao hàng</th>
                                            <th className="jsgrid-header-cell">Thuyên chuyển tới</th>
                                            <th className="jsgrid-header-cell">Ngày áp dụng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataGrid.map(item => {
                                                return (
                                                    <tr key={item.UserName}>
                                                        <td>{item.UserName}</td>
                                                        <td>{item.FullName}</td>
                                                        <td>
                                                            <Select
                                                                name={item.UserName}
                                                                options={item.options}
                                                                isClearable={true}
                                                                value={this.state[item.UserName]}
                                                                onChange={this.handleChangeNewCoordinatorGroup}
                                                                placeholder={"--Chọn nhân viên--"}
                                                            />
                                                            {
                                                                (this.state[item.UserName] == null && this.state[`APPLYDATE_${item.UserName}`] != "")
                                                                    ? <p className="text-danger mb-0">
                                                                        Vui lòng chọn nhóm thuyên chuyển tới
                                                                    </p>
                                                                    : <React.Fragment></React.Fragment>
                                                            }
                                                        </td>
                                                        <td>
                                                            <DatePicker
                                                                size={"large"}
                                                                onChange={(...data) => this.handleChangeDatePicker(...data, item.UserName)}
                                                                disabledDate={this.disabledDate}
                                                                placeholder={"--Chọn ngày--"}
                                                            />
                                                            {
                                                                (this.state[item.UserName] != null && this.state[`APPLYDATE_${item.UserName}`] == "")
                                                                    ? <p className="text-danger mb-0">
                                                                        Vui lòng chọn ngày thuyên chuyển
                                                                    </p>
                                                                    : <React.Fragment></React.Fragment>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                        : <React.Fragment></React.Fragment>
                }

                <div className="modal-footer">
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit} disabled={isError}>
                        Cập nhật
                    </button>

                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal}>
                        Đóng
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddModal));