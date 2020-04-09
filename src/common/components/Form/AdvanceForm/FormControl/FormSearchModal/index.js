import React, { Component } from 'react';
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import SearchForm from "../../../SearchForm";
import { showModal, hideModal } from '../../../../../../actions/modal';
import DataGrid from "../../../../DataGrid";
import InputGrid from "../InputGrid";
import {
    APIHostName,
    InitSearchParams,
    IDSelectColumnName,
    IDSelectColumnNameMultiple
} from './constants';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


class SearchModalCom extends Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.addNotification = this.addNotification.bind(this);
        
        this.state = {
            DataSource: {},
            GridDataSource: [],
            DataGridColumnList: [],
            SearchData: InitSearchParams
        }
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    componentDidMount() {
        //console.log("this.props SearchCom", this.props);
        this.setState({
            GridDataSource: this.props.GridDataSource
        })
        this.callSearchData(this.state.SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, this.props.SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                })
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }

    handleInsertItem(listMLObject){
        let selectedOption = [];
        if (listMLObject !== null && listMLObject !== undefined) {
            for (let i = 0; i < listMLObject.length; i++) {
                selectedOption.push({ value: listMLObject[i][this.props.value], label: listMLObject[i][this.props.name]});
            }
        }
        this.props.onClickInsertItem(selectedOption)
        
    }


    render() {

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm"
                    MLObjectDefinition={this.props.SearchMLObjectDefinition}
                    listelement={this.props.SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                />
                <DataGrid
                    listColumn={this.props.DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    PKColumnName={this.props.PKColumnName}
                    isMultipleCheck={this.props.multipleCheck}
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    hasSearch={false}
                    isHideHeaderToolbarGroupTextBox={true}
                    isHideHeaderToolbar={true}
                    RowsPerPage={10}
                    IsAutoPaging={true}
                    ref={this.gridref}
                    onSubmitItem={this.handleInsertItem.bind(this)}
                />
              
            </React.Fragment>
        )
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
    };
};

const SearchModal = connect(mapStateToProps, mapDispatchToProps)(SearchModalCom);
export default SearchModal;