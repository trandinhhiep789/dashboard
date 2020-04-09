import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../../actions/cacheAction";


class MultiSelectComboBoxCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.bindData = this.bindData.bind(this);
        let SelectedOption = [];
        if (this.props.SelectedOption)
            SelectedOption = this.props.SelectedOption
        this.state = { ListOption: [], SelectedOption: SelectedOption }
    }

    componentDidMount() {
        let listOption = this.props.listoption;
        //console.log("componentDidMount: ",this.props.isautoloaditemfromcache,this.props.listoption,this.props.loaditemcachekeyid);
        if (this.props.isautoloaditemfromcache) {
            const cacheKeyID = this.props.loaditemcachekeyid;
            const valueMember = this.props.valuemember;
            const nameMember = this.props.nameMember;
            this.props.callGetCache(cacheKeyID).then((result) => {

                listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    //console.log("result.IsError: ",result.IsError, result.ResultObject.CacheData);
                    result.ResultObject.CacheData.map((cacheItem) => {
                        listOption.push({ value: cacheItem[valueMember], name: cacheItem[nameMember] });
                    }
                    );
                    this.setState({ ListOption: listOption });
                    const selectedOption = this.bindData(this.state.ListOption);
                    // console.log("selectedOption: ",this.props.loaditemcachekeyid,  this.props.listoption,selectedOption);
                    this.setState({ SelectedOption: selectedOption });
                }
                else {
                    this.setState({ ListOption: listOption });
                }
                //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
            });
        }
        else {
            //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid,  this.props.listoption);
            this.setState({ ListOption: listOption });
        }
        //  console.log("this.selectedOptionbindData: ",this.props.loaditemcachekeyid,this.state.ListOption,  this.props.listoption);
        const selectedOption = this.bindData(this.state.ListOption);
        this.setState({ SelectedOption: selectedOption });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.listoption) !== JSON.stringify(nextProps.listoption)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            this.setState({ ListOption: nextProps.listoption })
            const selectedOption = this.bindData(nextProps.listoption);
            this.setState({ SelectedOption: selectedOption });
        }
    }

    bindData(listOption) {
        let values = this.props.value;
        let selectedOption = [];
        if (this.props.SelectedOption)
            return this.props.SelectedOption;
        if (values == null)
            return selectedOption;
        // if (typeof values.toString() == "string")
        //     values = values.toString().split();
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].name });
                }
            }
        }
        return selectedOption;
    }

    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return values;
        for (let i = 0; i < selectedOption.length; i++) {
            values.push(selectedOption[i].value);
        }
        return values;
    }

    handleValueChange(selectedOption) {
        this.setState({ SelectedOption: selectedOption });
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);
        if (this.props.onValueChangeCus)
            this.props.onValueChangeCus(this.props.name, comboValues);
    }
    render() {

        const listOption = this.state.ListOption;
        let listOptionNew = [];
        for (let i = 0; i < listOption.length; i++) {
            listOptionNew.push({ value: listOption[i].value, label: listOption[i].name, style: { color: 'red' } });
        }
        //   console.log("listOptionNew:", listOptionNew,this.state.SelectedOption)
        const selectedOption = this.state.SelectedOption;
        let formRowClassName = "form-row";
        if (this.props.rowspan)
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let isLabelDiv = true;
        if (typeof this.props.IsLabelDiv !== 'undefined' || typeof this.props.IsLabelDiv !== null)
            isLabelDiv = this.props.IsLabelDiv;
        if (isLabelDiv == false)
            formGroupClassName = "form-group col-md-12";
        // const CustomStyle = {
        //     option: (base, state) => ({
        //         ...base,
        //         backgroundColor: state.isSelected ? { Color1 } : { Color2 },
        //     })
        // }
        //console.log("isLabelDiv:",  this.props.IsLabelDiv,formGroupClassName,labelDivClassName,this.props.label)
        return (
            <div className={formRowClassName} >
                {isLabelDiv &&
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
                    </div>
                }
                <div className={formGroupClassName}>
                    <Select
                        value={selectedOption}
                        onChange={this.handleValueChange}
                        options={listOptionNew}
                        isMulti={true}
                        isDisabled ={this.props.disabled}
                        isSearchable={true}
                        placeholder={"----Chọn -----"}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}
const MultiSelectComboBox = connect(null, mapDispatchToProps)(MultiSelectComboBoxCom);
export default MultiSelectComboBox;