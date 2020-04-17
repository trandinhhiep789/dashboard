import React, { Component } from "react";
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import InputGrid from "../../../../common/components/FormContainer/FormControl/InputGrid";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import { hideModal } from '../../../../actions/modal';

import { InputGridColumnList, InputGridMLObjectDefinition, APIHostName, SearchAPIPath, LoadAPIPath, AddAPIPath, UpdateAPIPath, DeleteAPIPath, InitSearchParams } from "./Constants";

class ProductTypeImeiFormatCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: [],
            IsCallAPIError: false,
            IsLoadComplete: false,
            SearchData: InitSearchParams
        }
        this.callSearchData = this.callSearchData.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: this.props.ProductTypeID
            }
        ];
        this.callSearchData(searchData);
        this.setState({ SearchData: searchData });

    }

    callSearchData(searchData) {
        this.setState({ IsLoadComplete: false });
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({ DataSource: apiResult.ResultObject, IsCallAPIError: apiResult.IsError, IsLoadComplete: true })
            }
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     if (JSON.stringify(this.props.ProductTypeAttibuteItems) !== JSON.stringify(nextProps.ProductTypeAttibuteItems)) // Check if it's a new user, you can also use some unique property, like the ID
    //     {
    //         this.setState({
    //             DataSource: nextProps.ProductTypeAttibuteItems
    //         })
    //     }
    // }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    //thêm mới
    handleInsert(formData) {
        formData.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        formData.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        formData.ProductTypeID = this.props.ProductTypeID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, formData).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.hideModal();
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);

        });

    }

    //cập nhật
    handleUpdate(formData) {
        formData.UpDatedUser = this.props.AppInfo.LoginInfo.Username;
        formData.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        formData.ProductTypeID = this.props.ProductTypeID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, formData).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.hideModal();
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });

    }
    //xóa
    handleDelete(formData) {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, formData).then(apiResult => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }

    render() {
        if (this.state.IsLoadComplete) {
            return (
                <Collapsible trigger="Định dạng IMEI của một loại sản phẩm" easing="ease-in" open={true}>
                    <InputGrid name="GridProductTypeAttribute" controltype="GridControl"
                        title="Định dạng IMEI của một loại sản phẩm"
                        listColumn={InputGridColumnList}
                        dataSource={this.state.DataSource}
                        Ispopup={true}
                        autoCloseModal={false}
                        MLObjectDefinition={InputGridMLObjectDefinition}
                        listvalidationError={[]}
                        IsAutoPaging={false}
                        RowsPerPage={100}
                        colspan="10"
                        IsPermisionAdd={true}
                        IsPermisionDelete={true}
                        isSystem={this.props.isSystem}
                        onInsertPermanently={this.handleInsert}
                        onUpdatePermanently={this.handleUpdate}
                        onDeleteClick={this.handleDelete}
                    />
                </Collapsible>
            );
        } else {
            return ("Đang nạp dữ liệu");
        }

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
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        }

    }
}


const ProductTypeImeiFormat = connect(mapStateToProps, mapDispatchToProps)(ProductTypeImeiFormatCom);
export default ProductTypeImeiFormat;