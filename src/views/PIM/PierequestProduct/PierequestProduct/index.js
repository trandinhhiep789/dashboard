import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import MenuProduct from "../../PierequestProduct/MenuProduct";
import { formatDate } from "../../../../common/library/CommonLib.js";

import GeneralInfo from "../GeneralInfo";
import Barcode from "../Barcode";
import Attribute from "../Attribute";
import Category from "../Category";
import Status from "../Status";
import OutAst from "../OutAst";
import Album from "../Album";
import Article from "../Article";
import Content from "../Content";
import Partner from "../Partner";
import Limit from "../Limit";
import Image from "../Image";
import Video from "../Video";

import { APIHostName, SearchPieRequestListAPIPath } from "./constants";


class PieRequestProductCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PieRequestID: "",
            PieRequestListID: "",
            DataSource: []
        }

    }
    componentDidMount() {
        this.loadPieRequest(this.props.match.params.id);
        this.setState({
            PieRequestID: this.props.match.params.id,
            PieRequestListID: this.props.match.params.pierequestlistid
        })
    }

    loadPieRequest(PieRequestID) {
        this.setState({ IsLoading: true });
        this.props.callFetchAPI(APIHostName, "api/PieRequest/Load", PieRequestID).then((apiResult) => {
            if (apiResult && !apiResult.IsError && apiResult.ResultObject) {
                apiResult.ResultObject.RequestDate = new Date(apiResult.ResultObject.RequestDate);
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message
                })
                this.MObjectDefine = apiResult.ResultObject;
            }
            this.setState({ IsLoading: false });
        });
    }

    render() {
        return (
            <React.Fragment>

                <div className="col-12">
                    <div className="card">
                        <div className="card-body frminfo">
                            <div className="form-row">
                                {/* <div className="form-group col-md-1">
                                    <label className="col-form-label">Mã Yêu cầu:</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>{this.state.DataSource.PieRequestID}</label>
                                </div> */}
                                <div className="form-group col-md-1">
                                    <label className="col-form-label">Loại yêu cầu:</label>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="col-form-label">{this.state.DataSource.PieRequestTypeName}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label">Ngày yêu cầu:</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">{formatDate(this.state.DataSource.RequestDate, true)}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label">Người yêu cầu:</label>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="col-form-label">{this.state.DataSource.CreatedUser}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <span className="btn btn-w-md btn-bold btn-secondary">
                                        <Link className="btnback" to={"/PieRequest/Edit/" + this.state.PieRequestID}>Quay lại</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <MenuProduct PieRequestID={this.state.PieRequestID} PieRequestListID={this.state.PieRequestListID} />
                        {/* <Route exact path="/PierequestProduct/Add/" component={PieRequestProduct} /> */}
                        <Route path="/PieRequestProduct/Generalinfo/:id/:pierequestlistid" component={GeneralInfo} />
                        <Route path="/PieRequestProduct/Barcode/:id/:pierequestlistid" component={Barcode} />
                        <Route path="/PieRequestProduct/Attribute/:id/:pierequestlistid" component={Attribute} />
                        <Route path="/PieRequestProduct/Category/:id/:pierequestlistid" component={Category} />
                        <Route path="/PieRequestProduct/Status/:id/:pierequestlistid" component={Status} />
                        <Route path="/PieRequestProduct/Album/:id/:pierequestlistid" component={Album} />
                        <Route path="/PieRequestProduct/Article/:id/:pierequestlistid" component={Article} />
                        <Route path="/PieRequestProduct/Content/:id/:pierequestlistid" component={Content} />
                        <Route path="/PieRequestProduct/Partner/:id/:pierequestlistid" component={Partner} />
                        <Route path="/PieRequestProduct/Limit/:id/:pierequestlistid" component={Limit} />
                        <Route path="/PieRequestProduct/OutAst/:id/:pierequestlistid" component={OutAst} />
                        <Route path="/PieRequestProduct/Image/:id/:pierequestlistid" component={Image} />
                        <Route path="/PieRequestProduct/Video/:id/:pierequestlistid" component={Video} />
                    </div>

                </div>
            </React.Fragment>
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

        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}

const PieRequestProduct = connect(mapStateToProps, mapDispatchToProps)(PieRequestProductCom);

export default PieRequestProduct;