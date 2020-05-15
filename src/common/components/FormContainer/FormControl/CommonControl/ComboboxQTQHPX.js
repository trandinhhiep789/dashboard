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
        this.state = { FormData: {} };
    }

    componentDidMount() {
    }
    renderSearchForm() {
        const listElement = this.props.listelement;
        return (
            <React.Fragment>
                {
                    listElement.map((elementItem, index) => {
                        switch (elementItem.type) {
                            case "text":
                                return (
                                    <ElementSearch.ElementText
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "ComboBox":
                                return (
                                    <ElementSearch.ElementComboBox
                                        onValueChange={this.onValueChange}
                                        value={1}
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