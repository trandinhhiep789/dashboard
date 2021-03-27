import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName, PagePath, SearchElementList,
    tableHead, SearchMLObjectDefinition
} from '../constants'
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import { MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes'

export class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tableHead,
            dataSource: this.props.dataSource ? this.props.dataSource : []
        }

        this.notificationDOMRef = React.createRef()
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.showMessage = this.showMessage.bind(this)
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this)
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath)
    }

    handleSearchSubmit(e) {
    }

    showMessage(message) {
    }

    handleOnClickEdit(item) {
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Khai báo tổng tải"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        {
                                            React.Children.toArray(this.state.tableHead.map(thData =>
                                                <th {...thData}>{thData.content}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        React.Children.toArray(this.state.dataSource.map(item =>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <span className="nav-link text-primary hover-primary cursor-pointer"
                                                        onClick={() => this.handleOnClickEdit(item)}>
                                                        Chỉnh sửa
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            {/* <div className="text-right">
                                <button type="button" className="btn btn-info" data-provide="tooltip" data-original-title="Cập nhật" onClick={this.onClickWorkingPlan.bind(this)}>
                                    <span className="fa fa-check-square-o"> Cập nhật</span>
                                </button>
                            </div> */}
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
