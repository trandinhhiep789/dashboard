import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";


class ListCoordinatedCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
        };
    }

    componentDidMount() {
    }



    render() {

        return (
            <div className="col-lg-12">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">Danh sách vẫn đơn chưa điều phối</h5>
                    </div>
                    <div className="card-body">
                        Table
                    </div>
                </div>
            </div>
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

const ListCoordinated = connect(mapStateToProps, mapDispatchToProps)(ListCoordinatedCom);
export default ListCoordinated;