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

import {
    APIHostName,
    LoadAPIPath,
    PagePath,
} from "../constants";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
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
                    ShipmentOrderType_WorkFlowList:apiResult.ResultObject.ShipmentOrderType_WorkFlowList,
                    IsLoadDataComplete: true
                });
            }
        });
    }


    render() {
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 page-detail">

                    <ShipmentOrderTypeWF
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderTypeWF={this.state.ShipmentOrderType_WorkFlowList}
                    />

                    <ShipmentOrderDetail
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderDetail={this.state.DataSource}
                    />

                    <div className="card">
                        <h4 className="card-title"><strong>Địa chỉ</strong></h4>
                        <div className="card-body">
                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Ngưởi gửi</h4>
                                    <button className="btn btnEditCard">chỉnh sửa</button>
                                </div>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label className="col-form-label icon">
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="col-form-label" >ĐMX 451 Lê Trọng Tấn</label>
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label className="col-form-label icon">
                                                <i className="fa fa-mobile " aria-hidden="true"></i>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="col-form-label">18001061</label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label className="col-form-label icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="col-form-label" >451 Lê Trọng Tấn, P.Sơn Kỳ, Q.Tân Phú, TP.HCM</label>
                                            <a className="mapslink">Xem bản đồ</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Người nhận</h4>
                                    <button className="btn btnEditCard">chỉnh sửa</button>
                                </div>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label className="col-form-label icon">
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="col-form-label" >Trần Thị Hồng</label>
                                        </div>
                                        <div className="form-group col-md-1">
                                            <label className="col-form-label icon">
                                                <i className="fa fa-mobile " aria-hidden="true"></i>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="col-form-label">0835888122</label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-1">
                                            <label className="col-form-label icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="col-form-label" >138 Gò Dầu, Tân Quý, Tân Phú, Hồ Chí Minh, Việt Nam</label>
                                            <a className="mapslink">Xem bản đồ</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h4 className="card-title"><strong>Thông tin hàng hóa</strong></h4>
                        <div className="card-body">

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Loại hàng hóa:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >Điện lạnh</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Tổng số kiện:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">1</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Tổng khối lượng:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >8 kg</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Tổng kích thước:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">77.9 x 20.9 x 29 cm</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Phí vận chuyển:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >20,000 đ</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Tổng tiền COD:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">10,890,000 đ</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Có lắp đặt:</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <div className="checkbox customCheckbox">
                                        <label>
                                            <input type="checkbox" defaultChecked />
                                            <span className="cr">
                                                <i className="cr-icon fa fa-check"></i></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Ghi chú:</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <label className="col-form-label" >Giao trước 18h ngày 3/4/2020</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <h3 className="title">Danh sách hàng hóa:</h3>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell"></th>
                                                <th className="jsgrid-header-cell">Sản phẩm</th>
                                                <th className="jsgrid-header-cell">Kiện</th>
                                                <th className="jsgrid-header-cell">Giá</th>
                                                <th className="jsgrid-header-cell">Số lượng</th>
                                                <th className="jsgrid-header-cell">Đơn vị tính</th>
                                                <th className="jsgrid-header-cell">Kích thước</th>
                                                <th className="jsgrid-header-cell">Khối lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src='/src/img/may-lanh-lg-v10enh-1-1-org.jpg' className="img-product" />
                                                </td>
                                                <td>Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9WKH-8M</td>
                                                <td>Mặc định</td>
                                                <td>10,890,000</td>
                                                <td>1</td>
                                                <td>Cái</td>
                                                <td>77.9 x 20.9 x 29 cm</td>
                                                <td>8 kg</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <h3 className="title">Vật tư lắp đặt:</h3>
                                    <div className="table-responsive">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell">Xuất bán</th>
                                                    <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Tên sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Số lượng</th>
                                                    <th className="jsgrid-header-cell">Đơn vị tính</th>
                                                    <th className="jsgrid-header-cell">Giá</th>
                                                    <th className="jsgrid-header-cell">Mã đơn hàng xuất</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" className="form-control form-control-sm" defaultChecked />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9WKH-8M</td>
                                                    <td>Mặc định</td>
                                                    <td>10,890,000</td>
                                                    <td>1</td>
                                                    <td>Cái</td>
                                                    <td>77.9 x 20.9 x 29 cm</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" className="form-control form-control-sm" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9WKH-8M</td>
                                                    <td>Mặc định</td>
                                                    <td>10,890,000</td>
                                                    <td>1</td>
                                                    <td>Cái</td>
                                                    <td>77.9 x 20.9 x 29 cm</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-title group-card-title">
                            <h4 className="title">Thông tin điều phối</h4>
                            <button className="btn btnEditCard">chỉnh sửa</button>
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Nhân viên  giao:</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <div className="listpersonnel">
                                        <div className="content">
                                            <div className="list-item">
                                                <div className="item">
                                                    <span className="full-name">1125 - Võ Minh Hiếu </span>
                                                    <span className="icon-del">x</span>
                                                </div>
                                                <div className="item">
                                                    <span className="full-name">1125 - Võ Minh Hiếu </span>
                                                    <span className="icon-del">x</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Ghi chú:</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <label className="col-form-label" >Gán nhân viên giao</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Trạng thái:</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <select className="form-control form-control-sm">
                                        <option>Chờ giao</option>
                                        <option>Bắt đầu đi giao hàng</option>
                                        <option>Đến nhà khách</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

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
