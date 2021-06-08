import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from "react-dynamic-modal";

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PagePath, SearchAPIPath, APIHostName, listColumn, LoadAPIPath
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import ReactContext from '../ReactContext';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import ShipmentQualityAssessDetail from '../ShipmentQualityAssessDetail';
import Add from '../Add'

export class SearchCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: [],
        }

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.callSearchData = this.callSearchData.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.onShowModalDetail = this.onShowModalDetail.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
        this.onInsertClick = this.onInsertClick.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData()
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

    callSearchData() {
        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ];

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                apiResult.ResultObject[0].TotaLRows = apiResult.ResultObject.length;

                this.setState({
                    dataGrid: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }



    onShowModalDetail(objValue, name) {
        const { key, value } = objValue[0];
        const { dataGrid } = this.state;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chi tiết đánh giá chất lượng giao hàng',
            content: {
                text: <ReactContext.Provider
                    value={{
                        dataGrid: dataGrid,
                        handleDataGrid: () => { },
                    }}
                >
                    <ShipmentQualityAssessDetail
                        ShipmentQualityAssessId={value}
                    />
                </ReactContext.Provider>
            },
            maxWidth: '1000px'
        });

    }

    onUpdateClick() {
        this.showMessage("Tính năng đang phát triển")
    }

    onInsertClick(MLObjectDefinition, modalElementList, dataSource) {

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm đánh giá chất lượng giao hàng',
            content: {
                text: <ReactContext.Provider
                    value={{
                        handleDataGrid: () => { }
                    }}
                >
                    <Add />
                </ReactContext.Provider>
            },
            maxWidth: '1000px'
        });
    }

    render() {
        const { dataGrid } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <DataGrid
                    listColumn={listColumn}
                    dataSource={dataGrid}
                    IsFixheaderTable={false}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsCustomAddLink={true}
                    onInsertClick={this.onInsertClick}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    ref={this.gridref}
                    IsExportFile={false}
                    DataExport={[]}
                    fileName=""
                    PKColumnName={'ShipmentQualityAssessID'}
                    // RequirePermission={}
                    // ExportPermission={}
                    // onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail}
                />
            </React.Fragment>
        )
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
