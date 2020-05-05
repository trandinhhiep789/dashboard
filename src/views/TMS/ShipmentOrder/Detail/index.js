import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ShipmentOrderDetail from '../Component/ShipmentOrderDetail.js';
import ShipmentOrderTypeWF from '../Component/ShipmentOrderTypeWF.js';
import ShipmentOrderAddress from '../Component/ShipmentOrderAddress.js';
import InfoProduct from '../Component/InfoProduct.js';
import InfoCoordinator from '../Component/InfoCoordinator.js';




import {
    APIHostName,
    LoadAPIPath,
    PagePath,
} from "../constants";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.ChangeLoadData = this.ChangeLoadData.bind(this);
        this.state = {
            DataSource: {},
            ShipmentOrderType_WorkFlowList: null,
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
        }
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callLoadData(this.props.match.params.id);
    }
    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    ShipmentOrderType_WorkFlowList: apiResult.ResultObject.ShipmentOrderType_WorkFlowList,
                    IsLoadDataComplete: true
                });
            }
        });
    }
    ChangeLoadData(ShipmentOrderData) {
        this.setState({ DataSource: ShipmentOrderData });
    }



    render() {

        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 page-detail">

                    <ShipmentOrderTypeWF
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderTypeWF={this.state.ShipmentOrderType_WorkFlowList}
                        CurrentShipmentOrderStepID={this.state.DataSource.CurrentShipmentOrderStepID}
                    />
                    <ShipmentOrderDetail
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderDetail={this.state.DataSource}
                    />
                    <ShipmentOrderAddress
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderAddress={this.state.DataSource}
                    />
                    <InfoProduct
                        ShipmentOrderID={this.props.match.params.id}
                        InfoProduct={this.state.DataSource}
                    />

                    <InfoCoordinator
                        ShipmentOrderID={this.props.match.params.id}
                        InfoCoordinator={this.state.DataSource}
                        onhandleChange={this.ChangeLoadData}
                    />


                    <div className="card">
                        <h4 className="card-title"><strong>Lịch sử xử lý</strong></h4>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell">Thời gian</th>
                                            <th className="jsgrid-header-cell">Trạng thái</th>
                                            <th className="jsgrid-header-cell">Nhân viên</th>
                                            <th className="jsgrid-header-cell">Hình ảnh</th>
                                            <th className="jsgrid-header-cell">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>05/04/2020 15:00</td>
                                            <td>Bắt đầu đi giao</td>
                                            <td>6500- Nguyễn Hữu Thiện</td>
                                            <td>
                                                <img src='/src/img/may-lanh-lg-v10enh-1-1-org.jpg' className="img-product" />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>05/04/2020 15:00</td>
                                            <td>Chờ giao</td>
                                            <td>6500- Nguyễn Hữu Thiện</td>
                                            <td>
                                                <img src='/src/img/may-lanh-lg-v10enh-1-1-org.jpg' className="img-product" />
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <b>Tập tin đính kèm:</b>
                            <ul className="attachedList">
                                <li>
                                    <div className="addFile" >
                                        <input multiple={true} name='file' type='file' id="files" hidden className='attachmentitem' />
                                        <i>+</i>
                                        <label htmlFor="files" className='attachmentitem'>Thêm file</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="delIcon" >˟</div>
                                    <a>
                                        <div className="pull-left fileType"><span className="doctype docx"></span></div>
                                        <div className="attachName">
                                            <div className="hideCont bold">Baocao3032020</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="delIcon" >˟</div>
                                    <a >
                                        <div className="pull-left fileType"><span className="doctype xlsx"></span></div>
                                        <div className="attachName">
                                            <div className="hideCont bold">Baocao3032020</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="delIcon" >˟</div>
                                    <a >
                                        <div className="pull-left fileType"><span className="doctype zip"></span></div>
                                        <div className="attachName">
                                            <div className="hideCont bold">Baocao3032020</div>
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <h4 className="card-title"><strong>Bình luận</strong></h4>
                        <div className="card-body">
                            <div className='form-row form-group lstcomment'>
                                <div className='comment_account'>
                                    <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                </div>
                                <div className='comment_info'>
                                    <span className='comment_account_name'>administrator</span>
                                    <span className='comment_content'>Tạo yêu cầu</span>
                                    <span className='comment_account_time'>27/022019 08:35</span>
                                </div>
                                <div className='form-row form-group'>
                                    <div className='comment_account'>
                                        <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                    </div>
                                    <div className='comment_info'>
                                        <span className='comment_account_name'>administrator</span>
                                        <span className='comment_content'>Tạo yêu cầu 34123123</span>
                                        <span className='comment_account_time'>27/022019 08:35</span>
                                    </div>

                                </div>
                                <div className='form-row form-group'>
                                    <div className='comment_account'>
                                        <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                    </div>
                                    <div className='comment_info'>
                                        <span className='comment_account_name'>administrator</span>
                                        <span className='comment_content'>Tạo yêu cầu 34123123</span>
                                        <span className='comment_account_time'>27/022019 08:35</span>
                                    </div>

                                </div>
                            </div>
                            <div className='form-row comment'>
                                <div className='comment_account'>
                                    <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                </div>
                                <div className='form-group col-md-11'>
                                    <textarea value="" type='text' placeholder='Gửi bình luận' className='form-control' rows={3}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
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
