import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import {
    SearchComputeElementList ,
    SearchComputeMLObjectDefinition ,
    PagePath,
    InitSearchComputeParams,
    SearchComputeAPIPath,
    APIHostName,

} from "../constants";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";

import SearchForm from "../../../../common/components/FormContainer/SearchForm";


import { PARTNERPAYABLE_VIEW} from "../../../../constants/functionLists";


class ComputeCom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gridDataSource: []
        }
        this.gridref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    callData(postData) {
        this.props.callFetchAPI(APIHostName, SearchComputeAPIPath, postData).then(apiResult => {
            this.showMessage(apiResult.Message)
        })
    }

    handleSearchSubmit(formData, MLObject) {

        const postData = MLObject.PayableMonth != '' ? MLObject.PayableMonth.format() : MLObject.PayableMonth;
        
        if(postData == ""){
            this.showMessage("Vui lòng chọn tháng muốn thêm.");
        }
        this.callData(postData);
    }
    
    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tính chi phí theo tháng"
                    MLObjectDefinition={SearchComputeMLObjectDefinition}
                    listelement={SearchComputeElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                    TitleButton="Thêm"
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Compute = connect(mapStateToProps, mapDispatchToProps)(ComputeCom);
export default Compute;
