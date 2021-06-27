import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";

import { MessageModal } from "../../../../../common/components/Modal";
import Select from "react-select";

class StaffTransferType_rvLevelCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsDataSource: []
        }

        this.handleOptionsDataSource = this.handleOptionsDataSource.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.handleOptionsDataSource();
    }

    handleOptionsDataSource() {
        try {
            const { dataSource } = this.props;

            const data = dataSource.reduce((acc, val) => {

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

            this.setState({
                optionsDataSource: data
            })
        } catch (error) {
            this.showMessage("Lỗi lấy danh sách user của một mức duyệt");
        }
    }

    handleChange(...data) {
        try {
            const { value } = data[0], { name } = data[1];
            this.setState({
                [name]: value
            })

            this.props.onChangeSelect(name, value);
        } catch (error) {

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
        const { optionsDataSource } = this.state;

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
                                    optionsDataSource.map(item => {
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