import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TreeSelect } from 'antd';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
     
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
    },
    {
        title: 'Node3',
        value: '0-3',
        key: '0-3',
    },
    {
        title: 'Node4',
        value: '0-4',
        key: '0-4',
    }
];

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
        this.setState({
            ListOption: this.props.listoption,
            SelectedOption: this.props.value == undefined ? this.props.listoption : this.props.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            this.setState({
                SelectedOption: nextProps.value
            })
        }
    }


    handleValueChange(selectedOption) {
        this.setState({ value: selectedOption });
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, selectedOption);
    }


    render() {
        
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
            treeData,
            value: this.state.value,
            onChange: this.handleValueChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            placeholder: '--Vui lòng chọn--',
            style: {
                width: '100%',
            },
        };

        return (
            <div className={formRowClassName} >
                {isLabelDiv &&
                    <div className={labelDivClassName}>
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
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};


const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID)); selectedOption
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}
const MultiTreeSelect = connect(mapStateToProps, mapDispatchToProps)(MultiTreeSelectCom);
export default MultiTreeSelect;