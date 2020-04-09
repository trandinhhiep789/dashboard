import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPathModelVariant,
    UpdateAPIPathModelVariant,
    BackLink,
    AddPagePath,
    EditPagePath,
    GridMLObjectModelVariantDefinition,
    AddModelVariantColumnList,
    GridMLObjectDefinitionAttributeValue,
    InputAttributeValueColumnList,
    LoadAPIPathModelVariantByProduct
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";

class AddVariantCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.deleteVariantRow = this.deleteVariantRow.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: this.props.DataSource,
            ResultAttributeValue: this.props.ResultAttributeValue,
            PagePath: this.props.IsEditData ? EditPagePath : AddPagePath,
            APIPathModelVariant: this.props.IsEditData ? UpdateAPIPathModelVariant : AddAPIPathModelVariant
        };
    }

    componentDidMount() {
        this.props.updatePagePath(this.state.PagePath);
        this.props.callGetCache("PIMCACHE.PIMATTRIBUTE").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({ cacheAttribute: result.ResultObject.CacheData });
            }
        });
    }

    valueChangeInputGrid(elementdata, index) {
        if (elementdata.Name == "IsActived") {
            elementdata.Value = elementdata.IsChecked
        }
        const rowGridData = Object.assign({}, this.state.ResultAttributeValue[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultAttributeValue, { [index]: rowGridData });
        this.setState({ ResultAttributeValue: dataSource });
    }

    valueChange(elementname, elementvalue) {
        if (elementname == "ProductID") {
            this.props.callFetchAPI(APIHostName, LoadAPIPathModelVariantByProduct, elementvalue).then(apiResult => {
                if (apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    this.showMessage(apiResult.Message);
                } else {
                    if (apiResult.ResultObject) {
                        let ResultAttributeValue = []
                        if (apiResult.ResultObject.length > 0) {
                            apiResult.ResultObject.map(item => {
                                item.IsActived = "true";
                                return item;
                            })
                            ResultAttributeValue = Object.assign([], this.state.ResultAttributeValue, apiResult.ResultObject);
                        }
                        this.setState({ ResultAttributeValue });
                    }
                }
            });
        }
    }

    deleteVariantRow(index) {
        let ResultAttributeValue = this.state.ResultAttributeValue.filter(function (value, index1) { return index1 != index; });
        this.setState({ ResultAttributeValue });
    }

    handleSubmit(formData, MLObject) {
        // MLObject.AttributeID = 0;
        MLObject.ModelID = this.props.modelID;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        let ResultAttributeValue = this.state.ResultAttributeValue.slice();
        if (this.props.IsEditData) {
            ResultAttributeValue = this.state.ResultAttributeValue.filter(
                x => x.HasChanged == true
            );
            MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            delete MLObject.AttributeID;
            delete MLObject.AttributeName;
            delete MLObject.AttributeValueID;
            delete MLObject.AttributeValue;
            // delete MLObject.IsActived_Parent;
        }
        else {
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        }
        MLObject.ResultAttributeValue = ResultAttributeValue;
        this.props.callFetchAPI(APIHostName, this.state.APIPathModelVariant, MLObject).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.closeVariant(apiResult.IsError, apiResult.Message);
            }
            else {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

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

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                <FormContainer
                    name="ModelVariant"
                    MLObjectDefinition={GridMLObjectModelVariantDefinition}
                    listelement={AddModelVariantColumnList}
                    IsAutoLayout={true}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                    onValueChange={this.valueChange}
                    FormCols={2}
                >
                    <InputGrid
                        name="ResultAttributeValue"
                        controltype="InputControl"
                        colspan="12"
                        isHideHeaderToolbar={true}
                        isUseValueInputControl={true}
                        dataSource={this.state.ResultAttributeValue}
                        listColumn={InputAttributeValueColumnList}
                        MLObjectDefinition={GridMLObjectDefinitionAttributeValue}
                        onValueChangeInputGrid={this.valueChangeInputGrid}
                        onHandleDeleteRow={this.deleteVariantRow}
                        PKColumnName="AttributeID,AttributeValueID"
                    />
                </FormContainer>
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
        }
    };
};

const AddVariant = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddVariantCom);
export default AddVariant;
