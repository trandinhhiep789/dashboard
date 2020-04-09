import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { updatePagePath } from "../../../../actions/pageAction";
import Row from "../../../../common/components/PageLayout/Row.js";
import Col from "../../../../common/components/PageLayout/Col.js";
import Card from "../../../../common/components/PageLayout/Card.js";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import InputGridCell from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { LIST_COMPANY_CACHE, LIST_STATUS_PRODUCT_CACHE, APIHostName, AddAPIPath, MLObjectDefinition, BackLink, AddPagePath } from "./constants";

class StatusCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {CallAPIMessage:"", IsCallAPIError: false, IsCloseForm: false};
        this.searchref = React.createRef();
        this.state = {
            CallAPIMessage:"", 
            IsCallAPIError: false, 
            IsCloseForm: false,
            ListProductID: "1",
            ListCompany: [],
            //Listoption: [],
            StatusProduct: [],
            DataSource: [],
        };
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError)
        //     this.setState({ IsCloseForm: true });
        //this.props.updatePagePath(AddPagePath);
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} 
            //onRequestClose={() => true}
            //onCloseModal={this.handleCloseMessage}
        />);
    }


    componentDidMount() {
        this.getListCompany();
        console.log("CompanyObject:", this.state.ListCompany);
        console.log("dtasource:", this.state.DataSource);
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit() {
        //console.log("formData:",formData);
        console.log("MLObject:",this.state.ListCompany);
        let MLObject = this.state.ListCompany;
        // MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        // MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
            this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            //this.showMessage(apiResult.Message);

        }

        );
    }

    onInputChange(data, index) {
        let companyArr= Object.assign([],this.state.ListCompany);
        companyArr[index].ProductStatusID=data.Value;
        this.setState({ ListCompany: companyArr });
    }

    getListCompany() {
        return new Promise((resolve, reject) => {
            let CreatedUser = this.props.AppInfo.LoginInfo.Username;
            let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            this.props.callGetCache(LIST_COMPANY_CACHE).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    let companyArr = [];
                    result.ResultObject.CacheData.map((data) => {
                        let temp = { CompanyID: data.CompanyID, CompanyName: data.CompanyName, PieRequestListID: 1, CreatedUser, LoginLogID  };
                        companyArr.push(temp);
                    });
                    this.setState({ ListCompany: companyArr });
                    //console.log("CompanyObject:", this.state.ListCompany);
                    resolve(true)
                } else {
                    resolve('error');
                }
            });
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Trạng thái sản phẩm</strong></h4>
                        </header>

                        <div className="card-body form-group">
                            {/* <Row>
                                <Col lg="3">Công ty</Col>
                                <Col lg="3">Trạng thái sản phẩm</Col>                         
                            </Row>
                            <Row>
                                <Col lg="3">Công ty Cổ Phần Thế Giới Di Động</Col>
                                <Col lg="3"><input type="text" className="form-control"></input></Col>                           
                            </Row>
                            <Row>
                                <Col lg="3">Công ty Cổ Phần Thương Mại Bách Hóa Xanh</Col>
                                <Col lg="3"><input type="text" className="form-control"></input></Col>                              
                            </Row> */}




                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Công ty</th>
                                        <th>Trạng thái sản phẩm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.ListCompany.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.CompanyName}</td>
                                                    <td>
                                                        <InputGridCell type="combobox"
                                                            index={index}
                                                            text=""
                                                            value={data.ProductStatusID}
                                                            name={`ProductStatusID${index}`}
                                                            IsAutoLoadItemFromCache={true}
                                                            LoadItemCacheKeyID="PIMCACHE.PIM_PRODUCTSTATUS"
                                                            ValueMember="ProductStatusID"
                                                            NameMember="ProductStatusName"
                                                            onValueChange={this.onInputChange}
                                                        />
                                                    </td>
                                                </tr>
                                            )

                                        })
                                    }
                                    {/* <tr>
                                        <td>Công ty Cổ Phần Thế Giới Di Động</td>
                                        <td>
                                            <FormControl.TextBox name="ProductStatusID" label="Mã trạng thái sản phẩm" controltype="InputControl" onValueChange={this.onInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Công ty Cổ Phần Thương Mại Bách Hóa Xanh</td>
                                        <td><input type="text" className="form-control"></input></td>
                                    </tr> */}

                                </tbody>
                            </table>
                        </div>

                        <footer className="card-footer text-right">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                            <button className="btn btn-secondary">Back</button>
                        </footer>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }

    }
}

const Status = connect(mapStateToProps, mapDispatchToProps)(StatusCom);
export default Status;
