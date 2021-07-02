import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import Select from "react-select";

import { MessageModal } from "../../../../../common/components/Modal";
import MyContext from '../Context';

class StaffTransfer_ReviewList extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            dataGrid: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSetDataGrid = this.handleSetDataGrid.bind(this);
        this.handleDataSubmit = this.handleDataSubmit.bind(this);
    }

    componentDidMount() {
        this.handleSetDataGrid();
    }

    handleSetDataGrid() {
        const { stateStaffTransfer, stateStaffTransfer_ReviewList } = this.context;

        try {
            const data = stateStaffTransfer.ListStaffTransferType_rvLevel.reduce((acc, val) => {

                const found = acc.findIndex(element => element.ReviewLevelID == val.ReviewLevelID);

                if (found == -1) {
                    return [
                        ...acc,
                        {
                            ReviewLevelID: val.ReviewLevelID,
                            ReviewLevelName: val.ReviewLevelName,
                            options: [{ value: val.UserName, label: `${val.UserName} - ${val.FullName}` }]
                        }
                    ]
                } else {
                    acc[found] = {
                        ...acc[found],
                        options: [
                            ...acc[found].options,
                            {
                                value: val.UserName, label: `${val.UserName} - ${val.FullName}`
                            }
                        ]
                    }
                    return acc;
                }
            }, []);

            stateStaffTransfer_ReviewList.forEach(element => {
                const { ReviewLevelID, UserName, IsReviewed } = element;

                const foundItem = data.find(item => item.ReviewLevelID == ReviewLevelID);
                const index = foundItem.options.findIndex(item => item.value == UserName);

                this.setState({
                    [element.ReviewLevelID]: element.UserName,
                    [`defaultValue_${element.ReviewLevelID}`]: index,
                    [`isDisabled_${element.ReviewLevelID}`]: IsReviewed || ReviewLevelID <= stateStaffTransfer.CurrentReviewLevelID
                })
            });

            this.setState({
                dataGrid: data
            })

        } catch (error) {
            this.setState({
                dataGrid: []
            })
        }
    }

    handleChange(...data) {
        try {
            const { value } = data[0], { name } = data[1];

            this.handleDataSubmit(name, value);

            this.setState({
                [name]: value
            })
        } catch (error) {

        }
    }

    handleDataSubmit(name, value) {
        const { stateStaffTransfer, handelStateStaffTransfer_ReviewList } = this.context;

        try {
            const dataSubmit = stateStaffTransfer.ListStaffTransferType_rvLevel.filter(item => {
                if (item.ReviewLevelID == name) {
                    return value == item.UserName;
                } else {
                    return this.state[item.ReviewLevelID] == item.UserName;
                }

            });

            handelStateStaffTransfer_ReviewList(dataSubmit);
        } catch (error) {
            handelStateStaffTransfer_ReviewList([]);
        }
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

    render() {
        const { dataGrid } = this.state;
        const { stateStaffTransfer, stateStaffTransfer_ReviewList } = this.context;

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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataGrid.map(item => {
                                        return (
                                            <tr key={item.ReviewLevelID}>
                                                <td>{item.ReviewLevelName}</td>

                                                <td>
                                                    <Select
                                                        name={item.ReviewLevelID}
                                                        options={item.options}
                                                        defaultValue={item.options[this.state[`defaultValue_${item.ReviewLevelID}`]]}
                                                        onChange={this.handleChange}
                                                        isDisabled={this.state[`isDisabled_${item.ReviewLevelID}`]}
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