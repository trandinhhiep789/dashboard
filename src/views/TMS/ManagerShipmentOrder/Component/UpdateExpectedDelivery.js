import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { formatMoney } from '../../../../utils/function';
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";

class UpdateExpectedDeliveryCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit() {

    }

    render() {
        const listColumn = [
            {
                type: "select",
                name: "DeliverydateUpdateTypeID",
                label: "Loại cập nhật giờ giao",
                value: -1,
                placeholder: "",
                icon: "",
                listoption: [],
                DataSourceMember: "DeliverydateUpdateTypeID",
                readonly: false,
                validatonList: [],
                IsAutoLoadItemFromCache: true,
                LoadItemCacheKeyID: "ERPCOMMONCACHE.DELIVERYDATEUPDATETYPE",
                ValueMember: "DeliverydateUpdateTypeID",
                NameMember: "DeliverydateUpdateTypeName"
            },
            {
                type: "select",
                name: "DeliverydateUpdateReasonID",
                label: "Lý do thay đổi giờ giao",
                value: -1,
                placeholder: "",
                icon: "",
                listoption: [],
                DataSourceMember: "DeliverydateUpdateReasonID",
                readonly: false,
                validatonList: [],
                IsAutoLoadItemFromCache: true,
                LoadItemCacheKeyID: "ERPCOMMONCACHE.DELIVERYDATEUPDATEREASON",
                ValueMember: "DeliverydateUpdateReasonID",
                NameMember: "DeliverydateUpdateReasonName"
            },
            {
                type: "datetime",
                name: "OldExpectedDeliveryDate",
                label: "Ngày hẹn giao cũ",
                value: "",
                placeholder: "",
                icon: "",
                listoption: {},
                DataSourceMember: "OldExpectedDeliveryDate",
                readonly: true,
                validatonList: ["required"]
            },
            {
                type: "datetime",
                name: "NewExpectedDeliveryDate",
                label: "Ngày hẹn giao mới",
                value: "",
                placeholder: "",
                icon: "",
                listoption: {},
                DataSourceMember: "NewExpectedDeliveryDate",
                readonly: false,
                validatonList: ["required"]
            },
            {
                type: "textarea",
                name: "DeliverydateUpdateReasonNote",
                label: "mô tả",
                value: "",
                maxSize: "1900",
                placeholder: "",
                icon: "",
                rows: "6",
                listoption: {},
                DataSourceMember: "DeliverydateUpdateReasonNote",
                readonly: false,
                validatonList: []
            }];

        const MLObjectDefinition = [
            {
                Name: "DeliverydateUpdateTypeID",
                DefaultValue: "",
                BindControlName: "DeliverydateUpdateTypeID",
                DataSourceMember: "DeliverydateUpdateTypeID"
            },
            {
                Name: "DeliverydateUpdateReasonID",
                DefaultValue: "",
                BindControlName: "DeliverydateUpdateReasonID",
                DataSourceMember: "DeliverydateUpdateReasonID"
            },
            {
                Name: "OldExpectedDeliveryDate",
                DefaultValue: "",
                BindControlName: "OldExpectedDeliveryDate",
                DataSourceMember: "OldExpectedDeliveryDate"
            },
            {
                Name: "NewExpectedDeliveryDate",
                DefaultValue: "",
                BindControlName: "NewExpectedDeliveryDate",
                DataSourceMember: "NewExpectedDeliveryDate"
            },
            {
                Name: "DeliverydateUpdateReasonNote",
                DefaultValue: "",
                BindControlName: "DeliverydateUpdateReasonNote",
                DataSourceMember: "DeliverydateUpdateReasonNote"
            }
        ]


        return (
            <div className="col-12">

                <FormContainer
                    FormName=""
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={listColumn}
                    IsAutoLayout={true}
                    onSubmit={this.handleSubmit}

                    dataSource={[]}

                >
                </FormContainer>

            </div>

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
    }
}
const UpdateExpectedDelivery = connect(mapStateToProps, mapDispatchToProps)(UpdateExpectedDeliveryCom);
export default UpdateExpectedDelivery;