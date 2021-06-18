import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TreeSelect } from 'antd';
import { callGetCache, callGetUserCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

const { SHOW_PARENT } = TreeSelect;


class MultiTreeSelectCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = {
            ListOption: [],
            SelectedOption: [],
            value: []
        }
    }

    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterName, filterValue, filterobj } = this.props;
        if (IsAutoLoadItemFromCache) {
            this.props.callGetCache(LoadItemCacheKeyID).then((result) => {
                let listoptionnew = [];
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    if (typeof filterobj != undefined) {
                        result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                            listoptionnew.push({ value: cacheItem[ValueMember], key: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );
                    }
                    else {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoptionnew.push({ value: cacheItem[ValueMember], key: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );
                    }

                    this.setState({ ListOption: listoptionnew, Data: result.ResultObject.CacheData });
                    const aa = this.bindcombox(this.props.value, listoptionnew);
                    this.setState({ SelectedOption: aa });
                }
                else {
                    this.setState({ ListOption: listoptionnew });
                }
            });


        }
        else {
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
    }
    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return selectedOption;
        if (typeof values.toString() == "string")
            values = values.toString().split(',');
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, key: listOption[j], label: listOption[j].label });
                }
            }
        }
        return selectedOption;
    }

    handleValueChange(selectedOption) {

        let comboValues = [];
        if (Array.isArray(selectedOption)) {
            comboValues = this.getComboValue(selectedOption);
        }
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);
    }

    getComboValue(selectedOption) {
        let result = "";
        if (selectedOption != -1 && selectedOption != null && selectedOption != "") {
            result = selectedOption.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        return result;
    }

    render() {
        let { placeholder, maxTagCount, name } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan)
            formRowClassName = "col-md-" + this.props.rowspan + " " + this.props.classNameCol;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;

        let labelDivClassName = "col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "col-md-" + this.props.labelcolspan;
        }
        let isLabelDiv = true;
        if (typeof this.props.IsLabelDiv !== 'undefined' || typeof this.props.IsLabelDiv !== null)
            isLabelDiv = this.props.IsLabelDiv;
        if (isLabelDiv == false)
            formGroupClassName = "form-group col-md-12";
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let classNameselect = "select react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            classNameselect += " is-invalid";
        }

        const tProps = {
            treeData: this.state.ListOption,
            value: this.state.SelectedOption,
            onChange: this.handleValueChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            maxTagCount: maxTagCount,
            placeholder: placeholder,
            style: {
                width: '100%',
            },
            filterTreeNode: (search, item) => {
                return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
            }
        };

        return (
            <div className={formRowClassName} >
                {
                    isLabelDiv &&
                    <div className={this.props.divClassNameLabel}>
                        {/*  <div className={labelDivClassName}> */}
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                }
                <div className="form-group">
                    <TreeSelect {...tProps} />
                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                </div>
            </div>
        );
    }
}

MultiTreeSelectCom.defaultProps = {
    divClassNameLabel: 'form-group form-group-input-select-label'
};

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
const MultiTreeSelect = connect(mapStateToProps, mapDispatchToProps)(MultiTreeSelectCom);
export default MultiTreeSelect;