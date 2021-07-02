import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { ModalManager } from 'react-dynamic-modal';

import MyContext from '../Context';
import { MessageModal } from "../../../../../common/components/Modal";
import { formatDate } from '../../../../../common/library/CommonLib';
import MyModal from './MyModal';

class StaffTransfer_ReviewList extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            dataGrid: [],
            stateReviewedNote: ""
        }

        this.handleSetDataGrid = this.handleSetDataGrid.bind(this);
        this.handleDisableSelect = this.handleDisableSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDefaulValue = this.handleDefaulValue.bind(this);
        this.handleChangeReviewedNote = this.handleChangeReviewedNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleSetDataGrid();
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            // onCloseModal={}
            />
        );
    }

    handleSetDataGrid() {
        const { contextStaffTransfer } = this.context;
        const { ListStaffTransfer_ReviewList, ListStaffTransferType_rvLevel } = contextStaffTransfer;

        try {
            const dataGrid = ListStaffTransfer_ReviewList.map(val => {
                const found = ListStaffTransferType_rvLevel.find(item => item.ReviewLevelID == val.ReviewLevelID && item.UserName == val.UserName);

                return {
                    ...val,
                    ReviewLevelID: found.ReviewLevelID,
                    ReviewLevelName: found.ReviewLevelName
                }
            });

            this.setState({ dataGrid })
        } catch (error) {
            this.showMessage("Lỗi lấy danh sách mức duyệt")
        }
    }

    handleDisableSelect(item, index) {
        const { dataGrid } = this.state;
        const { Username } = this.props.AppInfo.LoginInfo

        if (index == 0 && item.UserName == Username && item.IsReviewed == false) {
            return false;
        } else if (index != 0) {
            if (item.UserName != Username) return true;
            else {
                const arrSlice = dataGrid.slice(0, index);
                if (arrSlice.every(element => element.IsReviewed)) return false;
                else return true;
            }
        } else {
            return true;
        }
    }

    handleSubmit(selectedOption, ReviewLevelID) {
        const { handleAgreeOrRefuse } = this.context;
        const { dataGrid, stateReviewedNote } = this.state;

        const found = dataGrid.find(item => item.ReviewLevelID == ReviewLevelID);

        handleAgreeOrRefuse({
            ...found,
            IsReviewed: true,
            ReviewStatus: selectedOption.value,
            ReviewedDate: new Date(),
            ReviewedNote: stateReviewedNote
        });

        ModalManager.close;
    }

    handleChangeReviewedNote(e) {
        const strValue = e.target.value;
        this.setState({
            stateReviewedNote: strValue
        })
    }

    handleChange(selectedOption, ReviewLevelID) {
        ModalManager.open(<MyModal text="Cập nhật mức duyệt"
            onRequestClose={() => true}
            handleSubmitModal={() => this.handleSubmit(selectedOption, ReviewLevelID)}>
            <div className="form-row">
                <div className="form-group col-md-2">
                    <label className="col-form-label bold">Mức duyệt</label>
                </div>
                <div className="form-group col-md-10">
                    <label className="col-form-label">{ReviewLevelID}</label>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <label className="col-form-label bold">Nội dung </label>
                </div>
                <div className="form-group col-md-10">
                    <textarea className="form-control form-control-sm" maxLength={1950} rows="2" cols="50" name="Title" placeholder="Nội dung" onChange={this.handleChangeReviewedNote} />
                </div>
            </div>
        </MyModal>);
    }

    handleDefaulValue(val) {
        switch (val) {
            case 0:
                return { value: 0, label: "Chưa duyệt" };
            case 1:
                return { value: 1, label: "Đồng ý" };
            case 2:
                return { value: 2, label: "Từ chối" };
            default:
                return { value: 0, label: "Chưa duyệt" }
        }
    }

    render() {
        const { dataGrid } = this.state;

        return (
            <div className="col-lg-12 SearchForm">
                <div className="card">
                    <div className="card-title group-card-title">
                        <h4 className="title">Danh sách mức duyệt</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell">Mức duyệt</th>
                                    <th className="jsgrid-header-cell">Người duyệt</th>
                                    <th className="jsgrid-header-cell">Trạng thái duyệt</th>
                                    <th className="jsgrid-header-cell">Ngày duyệt</th>
                                    <th className="jsgrid-header-cell">Duyệt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataGrid.map((item, index) => {
                                        return (
                                            <tr key={item.ReviewLevelID}>
                                                <td>{item.ReviewLevelName}</td>
                                                <td>{item.UserName + ' - ' + item.UserFullName}</td>
                                                <td>{item.IsReviewed ? "Đã duyệt" : "Chưa duyệt"}</td>
                                                <td>{formatDate(item.ReviewedDate, true)}</td>
                                                <td>
                                                    <Select
                                                        options={[{ value: 1, label: "Đồng ý" }, { value: 2, label: "Từ chối" }]}
                                                        placeholder="Duyệt"
                                                        isDisabled={this.handleDisableSelect(item, index)}
                                                        defaultValue={this.handleDefaulValue(item.ReviewStatus)}
                                                        onChange={(selectedOption) => this.handleChange(selectedOption, item.ReviewLevelID)}
                                                    />
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

        )

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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransfer_ReviewList);