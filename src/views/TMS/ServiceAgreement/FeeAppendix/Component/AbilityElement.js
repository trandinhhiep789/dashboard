import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

import {
    APIHostName,
    LoadAPIPath,
    MLObjectAbilityItem
} from "../contants/index.js";

class AbilityElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
    }
    handleSubmit(AbilityElementCom) {
    }

    render() {

        const AddElementList = [
            {
                type: "hidden",
                name: "QuantityUnitName",
                label: "",
                datasourcemember: "QuantityUnitName",
                DataSourceMember: "QuantityUnitName"
            },
            {
                type: "hidden",
                name: "PackingUnitName",
                label: "",
                datasourcemember: "PackingUnitName",
                DataSourceMember: "PackingUnitName"
            },
        ]
        return (
            <FormContainer
                MLObjectDefinition={MLObjectAbilityItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.ShipmentOrder_ItemList[this.props.index] : null}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
            >
                <div className="row">

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbServiceSeasonTypeID"
                            colspan="9"
                            labelcolspan="3"
                            label="Loại mùa vụ"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.SERVICESEASONTYPE"
                            valuemember="ServiceSeasonTypeID "
                            nameMember="ServiceSeasonTypeName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            namelabel="PackingUnitName"
                            datasourcemember="ServiceSeasonTypeID"
                        />

                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-6">
                        <FormControl.ElementDatetime
                            name="dtFromDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="Từ ngày"
                            placeholder="Từ ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="FromDate"

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ElementDatetime
                            name="dtToDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="đến ngày"
                            placeholder="đến ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="ToDate "

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtMonthlyAbilityValue"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="theo tháng"
                            placeholder="theo tháng"
                            controltype="InputControl"
                            value=""
                            datasourcemember="MonthlyAbilityValue"
                            classNameCustom="customcontrol"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtDailyAbilityValue"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="theo ngày"
                            placeholder="theo ngày"
                            controltype="InputControl"
                            value=""
                            datasourcemember="DailyAbilityValue"
                            classNameCustom="customcontrol"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtNote"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="Ghi chú"
                            controltype="InputControl"
                            value=""
                            datasourcemember="Note"
                            classNameCustom="customcontrol"
                        />
                    </div>
                    <div className="col-md-6"></div>

                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="ckIsActived"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="kích hoạt"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsActived"
                            classNameCustom="customCheckbox"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="ckIsSystem"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="hệ thống"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsSystem"
                            classNameCustom="customCheckbox"
                        />
                    </div>

                </div>

            </FormContainer>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const AbilityElement = connect(mapStateToProps, mapDispatchToProps)(AbilityElementCom);
export default AbilityElement;