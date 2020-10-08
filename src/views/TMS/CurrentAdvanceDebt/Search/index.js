import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';

import { SERVICEAGREEMENT_VIEW, SERVICEAGREEMENT_DELETE } from "../../../../constants/functionLists";


import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    APIHostName,
    SearchAPIPath,
    PagePath,
    TitleFormSearch,
    SearchHistoryAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import CurrentAdvanceDebtList from "../Component/CurrentAdvanceDebtList";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            widthPercent: ""

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);

        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    handleSearchSubmit(formData, MLObject) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, MLObject.UserName.value).then(apiResult => {//MLObject.UserName.value

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    handleItemDetail(index) {
        const { gridDataSource } = this.state;
        let MLObject = {}
        MLObject.MaterialGroupID = gridDataSource[index].MaterialGroupID;
        MLObject.ProductID = gridDataSource[index].ProductID;
        MLObject.UserName = gridDataSource[index].UserName;

        this.getdataHistory(MLObject);

    }

    getdataHistory(obj) {

        this.props.callFetchAPI(APIHostName, SearchHistoryAPIPath, obj).then(apiResult => {//

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                apiResult.ResultObject.map((item, index) => {

                    //1: Tạm ứng, 2: sử dụng; 3: Hủy vật tư
                    if (item.AdvanceDebtFlowTypeID == 1) {
                        item.AdvanceDebtFlowTypeName = "Tạm ứng";
                    }
                    else if (item.AdvanceDebtFlowTypeID == 2) {
                        item.AdvanceDebtFlowTypeName = "Sử dụng";
                    }
                    else if (item.AdvanceDebtFlowTypeID == 3) {
                        item.AdvanceDebtFlowTypeName = "Hủy vật tư";
                    }

                })
                this.handleShowModal(apiResult.ResultObject)
            }
        });

    }

    handleShowModal(data) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Lịch sử thay đổi số dư tạm ứng',
            content: {
                text: <CurrentAdvanceDebtList
                    dataSource={data}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    render() {

        return (
            <React.Fragment>
                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    IDSelectColumnName={""}
                    PKColumnName={""}
                    IsDelete={false}
                    IsAutoPaging={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    onDetailClick={this.handleItemDetail.bind(this)}
                    RowsPerPage={10}
                    IsExportFile={false}
                // RequirePermission={SERVICEAGREEMENT_VIEW}
                // DeletePermission={SERVICEAGREEMENT_DELETE}
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
