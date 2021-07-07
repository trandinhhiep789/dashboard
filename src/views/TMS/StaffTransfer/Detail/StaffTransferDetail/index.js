import React from "react";
import { connect } from "react-redux";

import MyContext from "../Context";
import DataGrid from "../../../../../common/components/DataGrid";

import { listColumn } from './constants';

class StaffTransferDetailCom extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            stateStaffTransferDetail: []
        }

        this.handleInitStaffTransferDetail = this.handleInitStaffTransferDetail.bind(this);
    }

    componentDidMount() {
        this.handleInitStaffTransferDetail();
    }

    handleInitStaffTransferDetail() {
        const { contextStaffTransfer } = this.context;

        try {
            const arrResult = contextStaffTransfer.ListStaffTransferDetail.map(item => {
                return {
                    ...item,
                    FromCoordinatorGroupID_Name: `${item.FromCoordinatorGroupID} - ${item.FromCoordinatorGroupName}`,
                    ToCoordinatorGroupID_Name: `${item.ToCoordinatorGroupID} - ${item.ToCoordinatorGroupName}`,
                }
            });
            this.setState({
                stateStaffTransferDetail: arrResult
            })
        } catch (error) {
            this.setState({
                stateStaffTransferDetail: contextStaffTransfer.ListStaffTransferDetail
            })
        }
    }

    render() {
        const { stateStaffTransferDetail } = this.state;

        return (
            <React.Fragment>
                <DataGrid
                    headingTitle="Danh sách nhân viên thuyên chuyển"
                    listColumn={listColumn}
                    dataSource={stateStaffTransferDetail}
                    IDSelectColumnName={"chkSelectUserName"}
                    PKColumnName={"UserName"}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsDelete={false}
                    IsAutoPaging={false}
                    IsCustomAddLink={true}
                />
            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransferDetailCom);