import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import Collapsible from 'react-collapsible';
import DataGrid from "../../../../../../common/components/DataGrid";
import { DataGridColumnList } from "./Constants";

class PartnerCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_Partner: this.props.Partner
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Partner) !== JSON.stringify(nextProps.Partner)) {
            this.setState({
                LstProduct_Partner: nextProps.Partner
            })
        }
    }
    render() {

        return (
            <Collapsible trigger="Đối tác sản phẩm" easing="ease-in" open={true}>
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.LstProduct_Partner}
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


const Partner = connect(mapStateToProps, mapDispatchToProps)(PartnerCom);
export default Partner;