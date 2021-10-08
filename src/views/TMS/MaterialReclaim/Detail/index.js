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
    BackLink,
    DetailAPIPath,
    LoadAPIPath,
    MaterialReclaimDetailColumnList,
    TitleFormDetail,
} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../constants/keyCache";
import { MaterialReclaimInfo } from "./MaterialReclaimInfo";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import { GET_CACHE_USER_FUNCTION_LIST, TMS_MATERIALRECLAIM_RETURN, TMS_MATERIALRECLAIM_DESTROY } from "../../../../constants/functionLists";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsLoadDataComplete: false,
            MaterialReclaimItem: {},
            MaterialReclaimDetail: [],
            IsPermissonMTReturn: false,
            IsPermissonDestroy: false,
            DataKeyConfig: [],
            IsCloseForm: false,
        };

        this.btnSubmitDestroy = this.btnSubmitDestroy.bind(this);
        this.btnSubmitMTReturnRequest = this.btnSubmitMTReturnRequest.bind(this);
        this.checkPermission = this.checkPermission.bind(this)
        this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this)
        this.gridref = React.createRef();
        this.handleCloseMessage = this.handleCloseMessage.bind(this)
        this.handleSubmitDestroy = this.handleSubmitDestroy.bind(this);
        this.handleSubmitMTReturnRequest = this.handleSubmitMTReturnRequest.bind(this);
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.checkPermission(TMS_MATERIALRECLAIM_RETURN).then(result => {
            this.setState({
                IsPermissonMTReturn: result
            })
        })
        this.checkPermission(TMS_MATERIALRECLAIM_DESTROY).then(result => {
            this.setState({
                IsPermissonDestroy: result
            })
        })
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        const { callFetchAPI } = this.props;
        callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                const uptMaterialReclaimDetailList = apiResult.ResultObject.MaterialReclaimDetailList.map(item => {
                    return {
                        ...item,
                        InstallProductIDName: `${item.InstallProductID} - ${item.InstallProductName}`,
                        ProductIDName: `${item.ProductID} - ${item.ProductName}`
                    }
                })

                this.setState({
                    MaterialReclaimItem: apiResult.ResultObject,
                    MaterialReclaimDetail: uptMaterialReclaimDetailList,
                    IsLoadDataComplete: true
                })
                this.getCacheKeyConfig()

            }
        });


    }

    getCacheKeyConfig() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then(apiResult => {

            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                this.setState({
                    DataKeyConfig: apiResult.ResultObject.CacheData,
                })
            }
        })
    }
    handleCloseMessage() {
        this.setState({ IsCloseForm: true })
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onCloseModal={this.handleCloseMessage}
            />
        );
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
                    resolve(false)
                } else {
                    resolve('error');
                }
            });
        });
    }

    btnSubmitMTReturnRequest() {
        if (this.state.MaterialReclaimItem.IsAfterReclaimProcess) {
            return <React.Fragment>
                <button className="btn btn-primary mr-3" type="button" disabled>Thu hồi về kho</button>
            </React.Fragment>
        } else if (this.state.IsPermissonMTReturn) {
            return <React.Fragment>
                <button className="btn btn-primary mr-3" type="button" onClick={this.handleShowDescriptionMTReturnRequestModal.bind(this)}>Thu hồi về kho</button>
            </React.Fragment>
        } else {
            return <React.Fragment>
                <button disabled={true} className="btn btn-primary mr-3" type="button" title="Bạn không có quyền!">Thu hồi về kho</button>
            </React.Fragment>
        }
    }

    handleShowDescriptionMTReturnRequestModal() {
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
                    onSubmit={this.handleSubmitMTReturnRequest}
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

    handleSubmitMTReturnRequest(FormData, MLObject) {
        const MTReturnRequestTypeID = this.state.DataKeyConfig.find(n => n.TMSConfigID == "TMS_MATERIALRECLAIM_RETURNRQTYPEID");

        let dataSubmit = {
            ...this.state.MaterialReclaimItem,
            MTReturnRequestTypeID: MTReturnRequestTypeID.TMSConfigValue,
            Description: MLObject.Description
        }

        if (!this.state.MaterialReclaimItem.IsAfterReclaimProcess) {
            this.props.callFetchAPI(APIHostName, "api/MaterialReclaim/UpdateMTRequset", dataSubmit).then(apiResult => {
                this.showMessage(apiResult.Message);
                this.props.hideModal();
            })
        }
        else {
            this.showMessage("Vật tư đã được cập nhật trạng thái");
        }

    }

    btnSubmitDestroy() {
        if (this.state.MaterialReclaimItem.IsAfterReclaimProcess) {
            return <React.Fragment>
                <button className="btn btn-primary mr-3" type="button" disabled>Hủy vật tư</button>
            </React.Fragment>
        } else if (this.state.IsPermissonDestroy) {
            return <React.Fragment>
                <button className="btn btn-primary mr-3" type="button" onClick={this.handleShowDescriptionDestroyModal.bind(this)}>Hủy vật tư</button>
            </React.Fragment>
        } else {
            return <React.Fragment>
                <button disabled={true} className="btn btn-primary mr-3" type="button" title="Bạn không có quyền!">Hủy vật tư</button>
            </React.Fragment>
        }
    }

    handleShowDescriptionDestroyModal() {
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
                    onSubmit={this.handleSubmitDestroy}
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

    handleSubmitDestroy(FormData, MLObject) {
        const { MaterialReclaimItem, DataKeyConfig } = this.state;

        const DestroyRequestTypeID = DataKeyConfig.find(n => n.TMSConfigID == "TMS_MATERIALRECLAIM_RETURNDESTROYRQTYPEID");

        MaterialReclaimItem.DestroyRequestTypeID = DestroyRequestTypeID != undefined ? DestroyRequestTypeID.TMSConfigValue : 0;
        MaterialReclaimItem.Description = MLObject.Description;

        if (!MaterialReclaimItem.IsAfterReclaimProcess) {
            this.props.callFetchAPI(APIHostName, "api/MaterialReclaim/UpdateDestroyRequest", MaterialReclaimItem).then(apiResult => {
                this.showMessage(apiResult.Message);
                this.props.hideModal();
            })
        }
        else {
            this.showMessage("Vật tư đã được cập nhật trạng thái")
        }
    }

    render() {
        const { IsLoadDataComplete, MaterialReclaimItem, MaterialReclaimDetail, IsPermissonDestroy } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                {
                    IsLoadDataComplete == true ?
                        <div className="col-lg-12">
                            <div className="card">
                                <h4 className="card-title">
                                    <strong>{TitleFormDetail}</strong>
                                </h4>
                                <div className="card-body">
                                    <MaterialReclaimInfo
                                        MaterialReclaim={MaterialReclaimItem}
                                    />

                                    <div className="card">
                                        <div className="card-title group-card-title">
                                            <h4 className="title">Danh sách vật tư thu hồi</h4>
                                        </div>
                                        <div className="card-body">
                                            <InputGrid
                                                name="MaterialReclaimDetailList"
                                                controltype="GridControl"
                                                listColumn={MaterialReclaimDetailColumnList}
                                                dataSource={MaterialReclaimDetail}
                                                isHideHeaderToolbar={true}
                                                //MLObjectDefinition={GridMLObjectDefinition}
                                                colspan="12"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="card-footer text-right ">
                                {
                                    this.btnSubmitMTReturnRequest()
                                }

                                {
                                    this.btnSubmitDestroy()
                                }

                                <Link to="/MaterialReclaim">
                                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                                </Link>
                            </footer>
                        </div>
                        : <div className="col-lg-12">
                            Đang tải dữ liệu, xin vui lòng chờ
                        </div>
                }


            </React.Fragment>
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

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
