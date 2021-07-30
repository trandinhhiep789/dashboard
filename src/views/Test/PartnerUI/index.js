import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import SearchForm from "../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../common/components/DataGrid";
import {
    SearchElementList,
    SearchMLObjectDefinition,
} from "./constants";
import { MODAL_TYPE_VIEW } from "../../../constants/actionTypes";
import { showModal, hideModal } from '../../../actions/modal';
import { TreeSelect, DatePicker } from 'antd';
const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
class PartnerUICom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthPercent: "",
            gridDataSource: [],
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 60) / 100
        })
    };


    
    handleSearchSubmit(formData, MLObject){
        console.log("Search", formData, MLObject)
    }


    render() {
     
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách vận đơn"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    colGroupAction={6}
                    IsButtonExport={false}
                    IsButtonhistory={false}
                    className=""
                />

                {/* <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    RequirePermission={SERVICEAGREEMENT_VIEW}
                    DeletePermission={SERVICEAGREEMENT_DELETE}
                    ExportPermission={SERVICEAGREEMENT_EXPORT}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách hợp đồng"
                    onExportFile={this.handleExportFile.bind(this)}
                    IsImportFile={true}
                    SchemaData={schema}
                    onImportFile={this.handleImportFile.bind(this)}

                /> */}
                

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }

    }
}

const PartnerUI = connect(mapStateToProps, mapDispatchToProps)(PartnerUICom);
export default PartnerUI;