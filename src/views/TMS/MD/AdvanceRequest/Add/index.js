import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
    APIHostName,
    AddAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    GetAdvanceRequestAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import AdvanceRequestDetailNew from "../Component/AdvanceRequestDetailNew";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: true,
            IsCloseForm: false,
            gridDataSource: {},
            StoreID: -1,
            AdvanceRequestTypeID: -1,
            errorAdvanceRequestDetail: "",
            MaterialList: [],
            AdvanceCostLimit: 0,
            MaterialAdvanceDebtList: [],
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }




    handleCloseMessage() {
        if (this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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
    handleSubmit(formData, MLObject) {
        MLObject.IsAdvanceByShipmentOrder = this.state.AdvanceRequestDetailList.IsAdvanceByShipmentOrder;
        MLObject.AdvanceRequestDetailList = this.state.AdvanceRequestDetailList.MaterialList
        var msgTotal = MLObject.AdvanceRequestDetailList.reduce(function (prev, cur) {
            return prev + cur.Quantity;
        }, 0);


        if (msgTotal < 1) {
            this.setState({ errorAdvanceRequestDetail: "Vui lòng chọn vật tư tạm ứng" });
        }
        else {
            MLObject.AdvanceRequestDetailList.map((Item) => {
                Item.ReceiverStoreID = this.state.StoreID
            });

            this.setState({ errorAdvanceRequestDetail: "" });
            this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                this.setState({ IsCallAPIError: !apiResult.IsError });
                let strMessage = ReactHtmlParser(apiResult.Message);
                this.showMessage(strMessage);
            });

        }

    }
    onValueChangeCustom(name, value) {
        if (value > -1 && this.state.StoreID > -1) {
            let postData = { AdvanceRequestTypeID: value, ReceiverStoreID: this.state.StoreID };
            this.props.callFetchAPI(APIHostName, GetAdvanceRequestAPIPath, postData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        AdvanceRequestTypeID: value,
                        IsLoadDataComplete: true
                    });
                }
                else {
                    this.setState({
                        gridDataSource: [],
                        AdvanceRequestTypeID: value
                    });

                }
            });

        }
        else {
            this.setState({
                AdvanceRequestDetailList: [],
                gridDataSource: [],
                AdvanceRequestTypeID: value
            });
        }

    }
    onValueChangeSote(name, value) {
        if (value > -1 && this.state.AdvanceRequestTypeID > -1) {
            let postData = { AdvanceRequestTypeID: this.state.AdvanceRequestTypeID, ReceiverStoreID: value }
            this.props.callFetchAPI(APIHostName, GetAdvanceRequestAPIPath, postData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        StoreID: value,
                        IsLoadDataComplete: true
                    });
                }
                else {
                    this.setState({
                        gridDataSource: [],
                        StoreID: value
                    });

                }
            });

        }
        else {
            this.setState({
                AdvanceRequestDetailList: [],
                gridDataSource: [],
                StoreID: value
            });
        }
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleInputChangeGrid(obj) {
        this.setState({
            AdvanceRequestDetailList: obj,
        });
    }
    groupBy(data, fields, sumBy = 'Quantity') {
        let r = [], cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
        data.forEach(x => {
            let y = r.find(z => cmp(x, z));
            let w = [...fields, sumBy].reduce((a, b) => (a[b] = x[b], a), {})
            y ? y[sumBy] = +y[sumBy] + (+x[sumBy]) : r.push(w);
        });
        return r;
    }

    render() {

        console.log("ShipmentOrderNewList", this.state.gridDataSource.ShipmentOrderNewList)
        
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        const { errorAdvanceRequestDetail } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        FormName="Cập nhật thông tin yêu cầu tạm ứng"
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={null}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtReceiverStoreID"
                                    colspan="8"
                                    labelcolspan="4"
                                    onValueChangeCustom={this.onValueChangeSote.bind(this)}
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    label="Kho tạm ứng"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="ReceiverStoreID" />
                            </div>
                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtAdvanceRequestTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    onValueChangeCustom={this.onValueChangeCustom.bind(this)}
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    label="loại yêu cầu tạm ứng"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.ADVANCEREQUESTTYPE"
                                    valuemember="AdvanceRequestTypeID"
                                    nameMember="AdvanceRequestTypeName"
                                    controltype="InputControl"
                                    value={''}
                                    listoption={null}
                                    datasourcemember="AdvanceRequestTypeID" />
                            </div>
                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtAdvanceRequestTitle"
                                    colspan="10"
                                    labelcolspan="2"
                                    readOnly={false}
                                    disabled={false}
                                    label="tiêu đề yêu cầu tạm ứng"
                                    placeholder="tiêu đề yêu cầu tạm ứng"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="AdvanceRequestTitle"
                                    validatonList={['required']}
                                />
                            </div>
                            <div className="col-md-12">
                                <FormControl.TextArea
                                    labelcolspan={2}
                                    colspan={10}
                                    name="txtDescription"
                                    label="Mô tả"
                                    placeholder="Mô tả"
                                    datasourcemember="Description"
                                    controltype="InputControl"
                                    rows={6}
                                    maxSize={500}
                                    classNameCustom="customcontrol"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    label="hệ thống"
                                    name="chkIsSystem"
                                    datasourcemember="IsSystem"
                                    controltype="InputControl"
                                    colspan={10}
                                    labelcolspan={2}
                                    value={false}
                                    classNameCustom="customCheckbox"
                                />
                            </div>
                            {(this.state.gridDataSource.ShipmentOrderNewList != undefined && this.state.gridDataSource.IsAdvanceByShipmentOrder == true) ?
                                <React.Fragment>
                                    <div className="col-lg-12 page-detail">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th className="jsgrid-header-cell" style={{ width: "100%" }}>Mã vận đơn cần tạm ứng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.gridDataSource.ShipmentOrderNewList.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.ShipmentOrderID}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : <div></div>}
                            {
                                errorAdvanceRequestDetail != '' ?
                                    <div className="col-md-12 errorAdvanceRequestDetail">
                                        <p>{this.state.errorAdvanceRequestDetail}</p>
                                    </div>
                                    : <div></div>
                            }

                            <AdvanceRequestDetailNew
                                AdvanceRequestDetail={this.state.gridDataSource}
                                ShipmentOrderCount={1}
                                onValueChangeGrid={this.handleInputChangeGrid.bind(this)}
                            />
                        </div>
                    </FormContainer>
                </React.Fragment>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Add = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCom);
export default Add;
