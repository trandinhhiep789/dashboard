import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

import DataGrid from "../../../../../common/components/DataGrid";
import { APIHostName, lstColImportExcelModal, APIInsertList } from './constants';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { hideModal } from '../../../../../actions/modal';

class ImportExcelModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateDataSource: this.props.propsExportData,
            disableBtn: false,
            submitData: []
        };

        this.showMessage = this.showMessage.bind(this);
        this.handleSetDataSource = this.handleSetDataSource.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.returnHeadingTitle = this.returnHeadingTitle.bind(this);
    }

    componentDidMount() {
        this.handleSetDataSource();
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

    handleSetDataSource() {
        const { stateDataSource } = this.state;

        // const arrNoError = stateDataSource.filter(item => !item.IsError);
        const arrNoError = stateDataSource.reduce((acc, val) => {
            if (val.IsError) {
                return acc;
            } else {
                return [
                    ...acc,
                    {
                        UserName: val.UserName,
                        FromDate: val.FromDate,
                        ToDate: val.ToDate,
                        Note: val.Note
                    }
                ]
            }
        }, []);
        if (arrNoError.length == 0) {
            this.setState({ disableBtn: true })
        }

        this.setState({
            submitData: arrNoError
        })
    }

    handleSubmit() {
        const { submitData } = this.state;

        this.props.callFetchAPI(APIHostName, APIInsertList, submitData).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.props.hideModal();
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    returnHeadingTitle() {
        const { stateDataSource, submitData, disableBtn } = this.state;
        let countInValid = 0, countValid = 0;

        try {
            countValid = submitData.length;
            countInValid = stateDataSource.length - submitData.length;
        } catch (error) {
            this.showMessage("Lỗi xử lý file");
        } finally {
            return (
                <React.Fragment>
                    <h5 className="d-flex mb-2">Danh sách khoảng thời gian nhân viên được phụ cấp xăng<i><small className="text-danger">&nbsp;(Chỉ chấp nhận những dòng hợp lệ)</small></i></h5>
                    <div className="container">
                        <div className="row ">
                            <div className="col d-flex justify-content-between align-items-center">
                                <p className="mb-0">Không hợp lệ: {countInValid}</p>
                                <p className="mb-0">Hợp lệ: {countValid}</p>
                                <p className="mb-0">Tổng cộng: {stateDataSource.length}</p>
                            </div>

                            <div className="col d-flex justify-content-end align-items-center">
                                <button type="button" className="btn btn-info mr-2" disabled={disableBtn} onClick={() => this.handleSubmit()}>Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        const { stateDataSource } = this.state;
        return (
            <React.Fragment>
                <DataGrid
                    headingTitle={this.returnHeadingTitle()}
                    listColumn={lstColImportExcelModal}
                    dataSource={stateDataSource}
                    PKColumnName={"UserName"}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    isHideHeaderToolbar={true}
                />
            </React.Fragment>
        )
    }
}

ImportExcelModalCom.defaultProps = {
    propsExportData: []
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