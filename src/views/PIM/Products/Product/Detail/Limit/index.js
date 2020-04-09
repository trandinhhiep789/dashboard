import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import Collapsible from 'react-collapsible';
import DataGrid from "../../../../../../common/components/DataGrid";
import { DataGridColumnList } from "./Constants";

class LimitCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_Limit: this.props.Limit
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Limit) !== JSON.stringify(nextProps.Limit)) {
            this.setState({
                LstProduct_Limit: nextProps.Limit
            })
        }
    }
    render() {

        return (
            <Collapsible trigger="Giới hạn sản phẩm" easing="ease-in" open={true}>
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.LstProduct_Limit}
                    isHideHeaderToolbar={true}
                    IsCustomAddLink={true}
                    PKColumnName=""
                    IsAutoPaging={false}
                />
            </Collapsible>
        );
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
        }

    }
}


const Limit = connect(mapStateToProps, mapDispatchToProps)(LimitCom);
export default Limit;