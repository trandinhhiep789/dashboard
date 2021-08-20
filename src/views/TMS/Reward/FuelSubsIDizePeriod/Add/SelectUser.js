import React from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import { PagePath, APIHostName } from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MessageModal } from "../../../../../common/components/Modal";
import MyContext from './Context';

class SelectUserCom extends React.Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateOptionsSelect: [],
            stateValueSelect: null
        };

        this.callSearchData = this.callSearchData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

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

    callSearchData(KeyWord) {
        let listMLObject = {
            "IndexName": "user",
            "TypeName": "user",
            "Top": 10,
            "IsCompressResultData": false,
            "QueryParamList":
                [
                    {
                        "QueryKey": "", "QueryValue": "", "QueryType": 18, "IsNotQuery": false,
                        "SubQueryParamList":
                            [
                                {
                                    "QueryKey": "uSERNAME",
                                    "QueryValue": KeyWord,
                                    "QueryType": 2,
                                    "IsNotQuery": false
                                },

                                {
                                    "QueryKey": "fULLNAME",
                                    "QueryValue": KeyWord,
                                    "QueryType": 2,
                                    "IsNotQuery": false
                                }
                            ]
                    }
                ]
        }

        this.props.callFetchAPI("ERPAPI", 'api/UserSearch/Search', listMLObject).then(apiResult => {
            const stateOptionsSelect = apiResult.ResultObject.map(item => {
                return {
                    value: item.UserName,
                    label: item.UserName + "-" + item.FullName,
                    UserName: item.UserName,
                    PositionID: item.PositionID
                }
            })
            this.setState({
                stateOptionsSelect
            });
        });
    }

    handleInputChange(...e) {
        const value = e[0], pattern = /^[0-9]{1,}\s{1}$/;

        if (pattern.test(value)) {
            this.callSearchData("*" + value + "*");
        }
    }

    handleChange(...e) {
        if (e[0]) {
            this.context.handleSelectUser({
                UserName: e[0].UserName,
                PositionID: e[0].PositionID
            });
        } else {
            this.context.handleSelectUser(null);
        }

        this.setState({
            stateValueSelect: e[0]
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3 d-flex align-items-center">
                    <span>Mã nhân viên</span>
                </div>
                <div className="col-md-9">
                    <Select
                        onInputChange={this.handleInputChange}
                        onChange={this.handleChange}
                        options={this.state.stateOptionsSelect}
                        isSearchable={true}
                        placeholder={"----Chọn -----"}
                        isClearable
                        value={this.state.stateValueSelect}
                    />
                </div>
            </div>
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
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectUserCom);
