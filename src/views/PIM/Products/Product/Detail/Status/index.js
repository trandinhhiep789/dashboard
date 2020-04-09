import React, { Component } from "react";
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import DataGrid from "../../../../../../common/components/DataGrid";
import { DataGridColumnList } from "./Constants";

class StatusCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_Status: this.props.Status
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Status) !== JSON.stringify(nextProps.Status))
        {
            this.setState({
                LstProduct_Status: nextProps.Status
            })
        }
    }


    render() {
        let Status;
        if (this.state.LstProduct_Status) {
            Status = this.state.LstProduct_Attribute;
        }
        return (

            <Collapsible trigger="Trạng thái sản phẩm" easing="ease-in" open={true}>
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.LstProduct_Status}
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


const Status = connect(mapStateToProps, mapDispatchToProps)(StatusCom);
export default Status;