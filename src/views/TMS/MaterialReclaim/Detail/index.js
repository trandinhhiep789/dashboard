import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";

import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import { ModalManager } from "react-dynamic-modal";
import {

    APIHostName,
    DetailAPIPath,
    TitleFormDetail,
    MaterialReclaimDetailColumnList,
    LoadAPIPath

} from "../constants";
import { MaterialReclaimInfo } from "./MaterialReclaimInfo";
import {
    GET_CACHE_USER_FUNCTION_LIST, TMS_MATERIALRECLAIM_RETURN, TMS_MATERIALRECLAIM_DESTROY
} from "../../../../constants/functionLists";
class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsLoadDataComplete: false,
            MaterialReclaimItem: {},
            MaterialReclaimDetail: [],
            IsPermissonMTReturn: false,
            IsPermissonDestroy: false,


        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.checkPermission = this.checkPermission.bind(this)

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
            console.log("detail", id, apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {


                this.setState({
                    MaterialReclaimItem: apiResult.ResultObject,
                    MaterialReclaimDetail: apiResult.ResultObject.MaterialReclaimDetailList,
                    IsLoadDataComplete: true
                })
            }
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

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            console.log("object", result.ResultObject.CacheData[i])
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

    handleSubmitMTReturnRequest() {
        this.showMessage("Tính năng đang phát triển")

    }

    handleSubmitDestroy() {
        this.showMessage("Tính năng đang phát triển")
    }



    render() {

        const { IsLoadDataComplete, MaterialReclaimItem, MaterialReclaimDetail, IsPermissonMTReturn, IsPermissonDestroy } = this.state;

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
                                    IsPermissonMTReturn == true ?
                                        <button className="btn btn-primary mr-3" type="button" onClick={this.handleSubmitMTReturnRequest.bind(this)}>Thu hồi về kho</button>
                                        : <button disabled={true} className="btn btn-primary mr-3" type="button" title="Bạn không có quyền!">Thu hồi về kho</button>
                                }

                                {
                                    IsPermissonDestroy == true ?
                                        <button className="btn btn-primary mr-3" type="button" onClick={this.handleSubmitDestroy.bind(this)}>Hủy vật tư</button>
                                        : <button disabled={true} className="btn btn-primary mr-3" type="button" title="Bạn không có quyền!">Hủy vật tư</button>
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
