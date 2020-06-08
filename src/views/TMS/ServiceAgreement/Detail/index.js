import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import FormContainer from "../../../../common/components/FormContainer";
import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";

import {
    APIHostName,
    LoadAPIPath,
    PagePath,
    DetailAPIPath,
    LoadNewAPIPath,
    MLObjectDefinition,
    BackLink,
    TitleFormDetail,
    TitleFromAbiliti,
    PKColumnNameFeeAppendix,
    TitleFromFeeAppendix,
    DataGridColumnItemListFeeAppendix,
    IDSelectColumnNameFeeAppendix,
    AddLinkFeeAppendix,
    DataGridColumnItemListAbiliti

} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import ServiceAgreementInfo from "./ServiceAgreementInfo";
import Abiliti from "./Abiliti";
import FeeAppendix from './FeeAppendix';

import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import AbilityElement from "../FeeAppendix/Component/AbilityElement";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            ServiceAgreementInfo: {},
            FeeAppendix: {},
            PageNumber: 1,
            Abiliti: {},
            IsLoadDataComplete: false
        }
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
            console.log('DetailCom', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    ServiceAgreementInfo: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
            }
        });
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

    handleonChangePageFeeAppendix() {

    }

    handleItemDeleteFeeAppendix() {

    }

    handleItemInsertAbiliti(){
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm năng lực',
            content: {
                text: <AbilityElement/>
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditAbiliti(){

    }

    handleItemDeleteAbiliti(){

    }


    render() {
        console.log('aa', this.state.ServiceAgreementInfo.FeeAppendix_ItemList)
        if (this.state.IsLoadDataComplete) {
            return (
                // <FormContainer
                //     FormName={TitleFormDetail}
                //     MLObjectDefinition={MLObjectDefinition}
                //     dataSource={this.state.DataSource}
                //     listelement={[]}
                //     BackLink={BackLink}
                //     isSubmitForm={false}
                // >
                //  </FormContainer>
                <div className="col-lg-12">
                    <div className="card">
                        <h4 className="card-title"><strong>{TitleFormDetail}</strong></h4>
                        <div className="card-body">
                            <ServiceAgreementInfo
                                ServiceAgreementInfo={this.state.ServiceAgreementInfo}
                            />

                            {/* <FeeAppendix
                        ServiceAgreementID={this.state.ServiceAgreementInfo.ServiceAgreementID}
                        FeeAppendix={this.state.ServiceAgreementInfo.FeeAppendix_ItemList}
                    /> */}

                            {/* <Abiliti
                        Abiliti={this.state.ServiceAgreementInfo.Ability_ItemList}
                    /> */}

                            <DataGrid
                                listColumn={DataGridColumnItemListFeeAppendix}
                                dataSource={this.state.ServiceAgreementInfo.FeeAppendix_ItemList}
                                title={TitleFromFeeAppendix}
                                AddLink={AddLinkFeeAppendix}
                                params={this.state.ServiceAgreementInfo.ServiceAgreementID}
                                IDSelectColumnName={IDSelectColumnNameFeeAppendix}
                                PKColumnName={PKColumnNameFeeAppendix}
                                onDeleteClick={this.handleItemDeleteFeeAppendix}
                                onChangePage={this.handleonChangePageFeeAppendix}
                                IsDelete={true}
                                PageNumber={this.state.PageNumber}
                                IsAutoPaging={false}
                                RowsPerPage={10}
                                classCustom=""
                                ref={this.gridref}
                            />

                            <InputGridControl
                                name="Ability_ItemList"
                                controltype="InputGridControl"
                                title={TitleFromAbiliti}
                                IDSelectColumnName={"AbilityID"}
                                listColumn={DataGridColumnItemListAbiliti}
                                dataSource={this.state.ServiceAgreementInfo.Ability_ItemList}
                                onInsertClick={this.handleItemInsertAbiliti.bind(this)}
                                onEditClick={this.handleItemEditAbiliti.bind(this)}
                                onDeleteClick={this.handleItemDeleteAbiliti.bind(this)}
                            />
                        </div>
                    </div>
                </div>



            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
