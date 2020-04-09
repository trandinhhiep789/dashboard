import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import TabContainer from "../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../common/components/Tabs/TabPage";
import {
    InputCategoryTypeColumnList,
    MLObjectDefinition,
    APIHostName,
    LoadAPIPath,
    SearchAPIPath,
    InitSearchParams,
    GridMLObjectCategoryTypeDefinition,
    AddElementList
} from "./constants";
import { PIE_REQUEST_PRODUCT_CAT_VIEW} from "../../../../constants/functionLists";


class CategoryCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            LstCategory_member: [],
            PieRequest_Product_Cat: {},
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            SearchData: InitSearchParams,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    handleInputChangeList(formDataTemp, tabNameList, tabMLObjectDefinitionList) {
        debugger
        // console.log("AddCom formDataTemp: ", formDataTemp);
        this.setState({ FormData: formDataTemp });
        //console.log("AddCom formDataTemp: ", this);
    }

    componentDidMount() {

        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            console.log("danh muc", apiResult)
            if (!apiResult.IsError) {
                this.setState({ gridDataSource: apiResult.ResultObject })
            }
        }
        );
    }

    onInputChange(e, index) {
        console.log("this.state ", this.state);
        console.log("e ", e);
        console.log("index ", index);

    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }

    handleSubmit(formData, MLObject) {
        console.log("formData:", formData);
        console.log("MLObject:", MLObject);

    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <FormContainer
                        FormName="Danh mục"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={AddElementList}
                        IsAutoLayout={true}
                        onInputChangeList={this.handleInputChangeList}
                        onSubmit={this.handleSubmit}>

                        <InputGrid
                            name="LstCategory_member"
                            controltype="GridControl"
                            listColumn={InputCategoryTypeColumnList}
                            isHideHeaderToolbar={true}
                            dataSource={this.state.gridDataSource}
                            MLObjectDefinition={GridMLObjectCategoryTypeDefinition}
                            RequirePermission={PIE_REQUEST_PRODUCT_CAT_VIEW}
                            colspan="12"
                        />
                        
                    </FormContainer>
                </div >
            </React.Fragment>
        );
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}

const Category = connect(mapStateToProps, mapDispatchToProps)(CategoryCom);
export default Category;
