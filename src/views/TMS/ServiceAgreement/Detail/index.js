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

import {
    APIHostName,
    LoadAPIPath,
    PagePath,
    DetailAPIPath,
    LoadNewAPIPath,
    MLObjectDefinition,
    BackLink,
    TitleFormDetail
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import ServiceAgreementInfo from "./ServiceAgreementInfo";
import Abiliti from "./Abiliti";
import FeeAppendix from './FeeAppendix';

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            ServiceAgreementInfo: {},
            FeeAppendix: {},
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
            console.log('DetailCom', apiResult,)
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




    render() {

        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName={TitleFormDetail}
                    MLObjectDefinition={MLObjectDefinition}
                    dataSource={this.state.DataSource}
                    listelement={[]}
                    BackLink={BackLink}
                    onSubmit={this.handleSubmit}
                >
                    <ServiceAgreementInfo
                        ServiceAgreementInfo={this.state.ServiceAgreementInfo}
                    />

                    <FeeAppendix
                        FeeAppendix={this.state.ServiceAgreementInfo.FeeAppendix_ItemList}
                    />
                    <Abiliti
                        Abiliti={this.state.ServiceAgreementInfo.Ability_ItemList}
                    />

                </FormContainer>

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
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
