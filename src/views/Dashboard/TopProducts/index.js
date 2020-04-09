import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { SearchAPIPath, APIHostName } from './Constants';
import { HorizontalBar } from 'react-chartjs-2';

class TopProductsCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            dataSource: []
        };
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory() {
        this.props.callFetchAPI(APIHostName, SearchAPIPath).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    dataSource: apiResult.ResultObject
                })
            }

        });
    }


    render() {
        let dataSource = this.state.dataSource;
        const label = [];
        const data1 = [];
        if (dataSource.length > 0) {
            dataSource.map((item, i) => {
                label.push(item.CategoryName)
                data1.push(item.CountProduct)
            })
            
        }
        const data = {
            labels:label,
            datasets: [{
                label: 'Top 10 danh mục có sản phẩm nhiều nhất',
                data: data1,
                fill: false,
                borderColor: '#5b9bd5',
                backgroundColor: '#5b9bd5',
                pointBorderColor: '#5b9bd5',
                pointBackgroundColor: '#5b9bd5',
                pointHoverBackgroundColor: '#5b9bd5',
                pointHoverBorderColor: '#5b9bd5',
            }]
        };
        return (
            <div className="col-md-12 col-md-6 col-lg-6">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">Top 10 danh mục  có số lượng sản phẩm nhiều</h5>
                    </div>
                    <div className="card-body">
                        <HorizontalBar data={data} height={197} />
                    </div>
                </div>
            </div>
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

const TopProducts = connect(mapStateToProps, mapDispatchToProps)(TopProductsCom);
export default TopProducts;