import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
class CategoryTypeCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/CategoryType" component={Search} />
        <Route path="/CategoryType/Add" component={Add} />
        <Route path="/CategoryType/Edit/:id" component={Edit} />
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
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    }
  };
};

const CategoryType = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTypeCom);
export default CategoryType;
