import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cssNotification: "",
            iconNotification: "",
            dataSource: []
        }

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
    };

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.showMessage("Tính năng đang phát triển");
    };

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

    callSearchData(searchData) {

        // this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
        //     if (!apiResult.IsError) {
        //         this.setState({
        //             dataSource: apiResult.ResultObject
        //         });
        //     }
        //     else {
        //         this.showMessage(apiResult.Message, apiResult.IsError);
        //     }
        // });
    };

    handleSearchSubmit(formData, MLObject) {
        const postData = [];
        this.callSearchData(postData);
    };

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm báo cáo đơn hàng"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom"
                />

                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className=" table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell text-center" rowSpan={2}>Khu vực</th>
                                            <th className="jsgrid-header-cell text-center" rowSpan={2}>Nhóm kho</th>
                                            <th className="jsgrid-header-cell text-center" colSpan={3}>GHLĐ ĐMX</th>
                                            <th className="jsgrid-header-cell text-center" colSpan={2}>Dịch vụ</th>
                                            <th className="jsgrid-header-cell text-center" colSpan={2}>Bảo hành</th>
                                            <th className="jsgrid-header-cell text-center" colSpan={2}>Tổng</th>
                                            <th className="jsgrid-header-cell text-center" rowSpan={2}>Tỷ lệ Ngoài ĐMX/ĐMX</th>
                                            <th className="jsgrid-header-cell text-center" rowSpan={2}>Định mức</th>
                                            <th className="jsgrid-header-cell text-center" rowSpan={2}>Đánh giá</th>
                                        </tr>
                                        <tr>
                                            <th className="jsgrid-header-cell text-center">Máy lạnh</th>
                                            <th className="jsgrid-header-cell text-center">ĐHK</th>
                                            <th className="jsgrid-header-cell text-center">BHTN</th>
                                            <th className="jsgrid-header-cell text-center">Có phí</th>
                                            <th className="jsgrid-header-cell text-center">Miễn phí</th>
                                            <th className="jsgrid-header-cell text-center">Ủy quyền</th>
                                            <th className="jsgrid-header-cell text-center">OEM</th>
                                            <th className="jsgrid-header-cell text-center">ĐMX</th>
                                            <th className="jsgrid-header-cell text-center">Ngoài ĐMX</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
