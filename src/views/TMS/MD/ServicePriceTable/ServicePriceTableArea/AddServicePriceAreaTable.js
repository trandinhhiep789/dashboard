import React, { Component } from "react";
import { connect } from 'react-redux';

import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    MLObjectSPTAreaItem,
    APIHostName,
    AddAPISPTAreaPath,
} from "../../ServicePriceTable/constants";
import { ERPCOMMONCACHE_AREATT } from "../../../../../constants/keyCache";
import { ModalManager } from "react-dynamic-modal";
import { showModal, hideModal } from '../../../../../actions/modal';


class ServicePriceTableAreaCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {};
    }

    handleSubmit(formData, MLObject) {
        MLObject.ServicePriceTableID = this.props.dataSource.ServicePriceTableID;

        let result;
        if (!!MLObject.AreaID && MLObject.AreaID != -1 && MLObject.AreaID != null && MLObject.AreaID != "") {
            result = MLObject.AreaID.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result = ""
        }

        MLObject.AreaIDList = result;
        MLObject.AreaID = 0;

        this.props.callFetchAPI(APIHostName, AddAPISPTAreaPath, MLObject).then(apiResult => {
            this.props.onInputChangeObj(this.props.dataSource.ServicePriceTableID, apiResult);
        });

    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    render() {
        return (
            <FormContainer
                MLObjectDefinition={MLObjectSPTAreaItem}
                dataSource={this.props.dataSourceFormContainer}
                listelement={[]}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
            // onchange={this.handleChange.bind(this)}
            >

                <div className="row">
                    <div className="col-md-12">
                        <FormControl.FormControlComboBox
                            name="cbAreaID"
                            colspan="8"
                            labelcolspan="4"
                            label="khu vực"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            isMultiSelect={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPCOMMONCACHE_AREATT} //"ERPCOMMONCACHE.AREATT"
                            valuemember="AreaID"
                            nameMember="AreaName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="AreaID"
                        //disabled={isDisableCBTechspecsValue}
                        // isselectedOp={true}
                        />
                    </div>
                </div>

            </FormContainer>
        );
    }
}

ServicePriceTableAreaCom.defaultProps = {
    dataSourceFormContainer: {}
};

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePriceTableAreaCom);
