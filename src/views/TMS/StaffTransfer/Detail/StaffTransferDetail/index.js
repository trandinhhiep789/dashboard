import React from "react";
import { connect } from "react-redux";

import MyContext from "../Context";
import DataGrid from "../../../../../common/components/DataGrid";

import { listColumn } from './constants';

class StaffTransferDetailCom extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
    }

    render() {
        const { contextStaffTransfer } = this.context;

        return (
            <React.Fragment>
                <DataGrid
                    headingTitle="Danh sách nhân viên thuyên chuyển"
                    listColumn={listColumn}
                    dataSource={contextStaffTransfer.ListStaffTransferDetail}
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