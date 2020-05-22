import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementSearch from '../../FormElement/ElementSearch';

class ComboboxQTQHPXCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.elementItemRefs = [];
        const formDataContol = this.bindDataContol();
        console.log("formDataContol",formDataContol);
        this.state = { FormData: formDataContol };
    }

    bindDataContol() {

        let formData = {};
        const listElement = this.props.listelement;
        listElement.map((elementItem) => {
            const elementname = elementItem.name;
         
                const ObjectName = { Name: elementname, value: elementItem.value, Controltype: elementItem.type, label: elementItem.label, ErrorLst: [], validatonList: elementItem.validatonList };
                formData = Object.assign({}, formData, { [elementname]: ObjectName });
            
        });
        return formData;
    }

    componentDidMount() {
    }
    renderSearchForm() {
        const listElement = this.props.listelement;
        //console.log("ComboboxQTQHPXCom", this.state, this.props)
        return (
            <React.Fragment>
                {
                    listElement.map((elementItem, index) => {
                        switch (elementItem.type) {
                            case "text":
                                return (
                                    <ElementSearch.ElementTextNew
                                        onValueChange={this.onValueChange}
                                        value={1}
                                        ValidatonErrorMessage={''}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "ComboBox":
                                return (
                                    <ElementSearch.ElementComboBoxNew
                                        onValueChange={this.onValueChange}
                                        value={3}
                                        valuefilter={2}
                                        ValidatonErrorMessage={""}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            default:
                                break;
                        }
                    })
                }
                </React.Fragment>
        );
    }
    render() {
        let elmentRender = this.renderSearchForm();

        return (
            <React.Fragment>
                {elmentRender}
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}
const ComboboxQTQHPX = connect(mapStateToProps, mapDispatchToProps)(ComboboxQTQHPXCom);
export default ComboboxQTQHPX;