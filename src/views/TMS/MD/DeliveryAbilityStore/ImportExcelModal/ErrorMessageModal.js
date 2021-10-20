import React from "react";
import { connect } from "react-redux";

import {
    lstColErrorMessageModal,
} from '../constants';

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { hideModal } from '../../../../../actions/modal';
import DataGrid from "../../../../../common/components/DataGrid";

class ErrorMessageModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: []
        };

        this.handleSetDataGrid = this.handleSetDataGrid.bind(this);
    }

    componentDidMount() {
        console.log(this.props.dataGrid)

        this.handleSetDataGrid();
    }

    handleSetDataGrid() {
        const dataGrid = this.props.dataGrid.errors.map(item => {
            switch (item.error) {
                case "invalid":
                    return {
                        ...item,
                        row: item.row + 1,
                        errorContent: "Vui lòng điền số"
                    }
                case "required":
                    return {
                        ...item,
                        row: item.row + 1,
                        errorContent: "Vui lòng điền giá trị"
                    }
                default:
                    return {
                        ...item,
                        row: row + 1,
                        errorContent: "Lỗi"
                    }
            }
        })

        this.setState({
            dataGrid
        })
    }

    render() {
        return <React.Fragment>
            <DataGrid
                listColumn={lstColErrorMessageModal}
                dataSource={this.state.dataGrid}
                PKColumnName={""}
                IsAutoPaging={true}
                RowsPerPage={10}
                isHideHeaderToolbar={true}
            />
        </React.Fragment>
    }
}

ErrorMessageModalCom.defaultProps = {
    dataGrid: {
        rows: [],
        errors: []
    }
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
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageModalCom);