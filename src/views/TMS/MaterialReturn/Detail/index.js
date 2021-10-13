import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";

import {
    APIHostName,
    DetailAPIPath,
    LoadAPIPath,
    MaterialReturnDetailColumnList,
} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../constants/keyCache";
import MaterialReturnInfo from "./MaterialReturnInfo";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import { GET_CACHE_USER_FUNCTION_LIST, TMS_MATERIALRETURN_RETURN } from "../../../../constants/functionLists";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';

class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            isPermissonCreateInputVoucher: false
        };

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();

        this.callLoadData = this.callLoadData.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.btnCreateInputVoucher = this.btnCreateInputVoucher.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.showDescriptionModal = this.showDescriptionModal.bind(this);
        this.handleSubmitCreateInputVoucher = this.handleSubmitCreateInputVoucher.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.checkPermission(TMS_MATERIALRETURN_RETURN).then(result => {
            this.setState({
                isPermissonCreateInputVoucher: result
            })
        });
        this.callLoadData(this.props.match.params.id);
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

    callLoadData(MaterialReturnIDParams) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, MaterialReturnIDParams).then((apiResult) => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject.lstMaterialReturnDetail) {
                    const uptLstMaterialReturnDetail = apiResult.ResultObject.lstMaterialReturnDetail.map(item => {
                        return {
                            ...item,
                            mtProductIDName: `${item.mtProductID} - ${item.mtProductName}`
                        }
                    })

                    this.setState({
                        dataSource: {
                            ...apiResult.ResultObject,
                            lstMaterialReturnDetail: uptLstMaterialReturnDetail
                        }
                    })
                } else {
                    this.setState({
                        dataSource: apiResult.ResultObject
                    })
                }
            }
        })
    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            resolve(true);
                            return;
                        }
                    }
                    resolve(false);
                } else {
                    reject('error');
                }
            });
        });
    }

    btnCreateInputVoucher() {
        //#region
        if (this.state.dataSource.IsCreatedInputVoucher) {
            return <React.Fragment>
                <button className="btn btn-primary mr-3" type="button" disabled>Tạo phiếu nhập</button>
            </React.Fragment>
        } else if (this.state.isPermissonCreateInputVoucher) {
            return <React.Fragment>
                <button className="btn btn-primary mr-3" type="button" onClick={this.showDescriptionModal.bind(this)}>Tạo phiếu nhập</button>
            </React.Fragment>
        } else {
            return <React.Fragment>
                <button disabled={true} className="btn btn-primary mr-3" type="button" title="Bạn không có quyền!">Tạo phiếu nhập</button>
            </React.Fragment>
        }
        //#endregion

        //#region  test
        // return <React.Fragment>
        //     <button className="btn btn-primary mr-3" type="button" onClick={this.showDescriptionModal.bind(this)}>Tạo phiếu nhập</button>
        // </React.Fragment>
        //#endregion
    }

    showDescriptionModal() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Mô tả hiện trạng vật tư',
            content: {
                text: <FormContainer
                    dataSource={[]}
                    IsCloseModal={true}
                    MLObjectDefinition={[
                        {
                            Name: "Description",
                            DefaultValue: "",
                            BindControlName: "txtDescription",
                            DataSourceMember: "Description"
                        }
                    ]}
                    onSubmit={this.handleSubmitCreateInputVoucher}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl.TextArea
                                classNameCustom="customcontrol"
                                colspan="9"
                                controltype="InputControl"
                                datasourcemember="Description"
                                label="mô tả hiện trạng vật tư"
                                labelcolspan="3"
                                maxSize={1000}
                                name="txtDescription"
                                placeholder="Mô tả hiện trạng vật tư"
                                validatonList={["required"]}
                                value=""
                            />
                        </div>
                    </div>
                </FormContainer>
            },
            maxWidth: '800px'
        });
    }

    handleSubmitCreateInputVoucher(FormData, MLObject) {
        //#region
        if (this.state.dataSource.IsCreatedInputVoucher) {
            this.showMessage("Đã tạo phiếu nhập, không thể tạo lại");
        } else {
            let dataSubmit = {
                ...this.state.dataSource,
                Description: MLObject.Description
            }

            this.props.callFetchAPI(APIHostName, CreateInputVoucherAPIPath, dataSubmit).then(apiResult => {
                if (apiResult.IsError) {
                    this.showMessage(apiResult.Message);
                } else {
                    this.showMessage(apiResult.Message);
                    this.props.hideModal();
                    this.callLoadData(this.props.match.params.id);
                }
            })
        }
        //#endregion

        //#region test
        // let dataSubmit = {
        //     ...this.state.dataSource,
        //     Description: MLObject.Description
        // }

        // console.log(dataSubmit)
        //#endregion
    }

    render() {
        if (this.state.dataSource == null) {
            return <React.Fragment>Đang tải dữ liệu</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <div className="col-lg-12">
                        <div className="card">
                            <h4 className="card-title">
                                <strong>Chi tiết yêu cầu nhập xác linh kiện</strong>
                            </h4>
                            <div className="card-body">
                                <MaterialReturnInfo
                                    MaterialReturn={this.state.dataSource}
                                />

                                <div className="card">
                                    <div className="card-title group-card-title">
                                        <h4 className="title">Danh sách linh kiện</h4>
                                    </div>
                                    <div className="card-body">
                                        <InputGrid
                                            colspan="12"
                                            controltype="GridControl"
                                            dataSource={this.state.dataSource.lstMaterialReturnDetail}
                                            isHideHeaderToolbar={true}
                                            listColumn={MaterialReturnDetailColumnList}
                                            name="lstMaterialReturnDetail"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="card-footer text-right">
                            {this.btnCreateInputVoucher()}

                            <Link to="/MaterialReturn">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </React.Fragment>
            )
        }
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCom);