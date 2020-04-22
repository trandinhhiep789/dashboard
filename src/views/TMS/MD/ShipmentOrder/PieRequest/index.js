import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import Search from "./Search";
import PieRequestAdd from "./Add";
import Edit from "./Edit";
//import AddProduct from "../../../../PierequestProduct/PierequestProduct";
// import EditProduct from "../../PierequestProduct/PierequestProduct/Edit";

class PieRequestCom extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <React.Fragment>

                <Route exact path="/PieRequest" component={Search} />
                <Route path="/PieRequest/Add" component={PieRequestAdd} />
                <Route path="/PieRequest/Edit/:id" component={Edit} />
                {/* <Route path="/PierequestProduct/Add/:id" component={AddProduct} /> */}
                {/* <Route path="/PierequestProduct/Edit/:id" component={EditProduct} /> */}

            </React.Fragment>
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


const PieRequest = connect(mapStateToProps, mapDispatchToProps)(PieRequestCom);
export default PieRequest;