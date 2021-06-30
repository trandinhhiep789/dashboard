import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import Select from "react-select";

import { MessageModal } from "../../../../../common/components/Modal";
import MyContext from '../Context';
import { map } from "jquery";

class StaffTransferType_rvLevelCom extends React.Component {
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
        const { StaffTransferData, handelStaffTransferType_rvLevelData } = this.context;

        try {
            const data = StaffTransferData.ListStaffTransferType_rvLevel.reduce((acc, val) => {

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

            const dataSubmit = data.map(item => {
                const found = StaffTransferData.ListStaffTransferType_rvLevel.find(element => item.ReviewLevelID == element.ReviewLevelID && item.options[0].value == element.UserName)

                return found;
            })

            handelStaffTransferType_rvLevelData(dataSubmit);

            data.forEach(item => {
                this.setState({
                    [item.ReviewLevelID]: item.options[0].value
                })
            })

            this.setState({
                dataGrid: data
            })

        } catch (error) {
            this.setState({
                dataGrid: []
            })

            handelStaffTransferType_rvLevelData([]);
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
        const { StaffTransferData, handelStaffTransferType_rvLevelData } = this.context;

        try {
            const dataSubmit = StaffTransferData.ListStaffTransferType_rvLevel.filter(item => {
                if (item.ReviewLevelID == name) {
                    return value == item.UserName;
                } else {
                    return this.state[item.ReviewLevelID] == item.UserName;
                }

            });

            handelStaffTransferType_rvLevelData(dataSubmit);
        } catch (error) {
            handelStaffTransferType_rvLevelData([]);
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
                                                        defaultValue={item.options[0]}
                                                        onChange={this.handleChange}
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransferType_rvLevelCom);