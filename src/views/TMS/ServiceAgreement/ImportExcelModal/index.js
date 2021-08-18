import React from "react";
import { connect } from "react-redux";

import { hideModal } from '../../../../actions/modal';
import DataGrid from "../../../../common/components/DataGrid";
import {
    DataGridColumnList_ImportFile,
    PKColumnName
} from '../constants';

class ImportExcelModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitData: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.returnHeadingTitle = this.returnHeadingTitle.bind(this);
    }

    componentDidMount() {
        let validArr = [];
        if (this.props.dataSource.length != 0) {
            validArr = this.props.dataSource.filter(item => item.Errors == "");
        }
        this.setState({
            submitData: validArr
        })
    }

    handleSubmit() {
        this.props.onSubmit(this.state.submitData);
    }

    returnHeadingTitle() {
        let validArr = [];
        if (this.props.dataSource.length != 0) {
            validArr = this.props.dataSource.filter(item => item.Errors == "");
        }

        return (
            <React.Fragment>
                <h5 className="d-flex mb-2">Danh sách hợp đồng dịch vụ<i><small className="text-danger">&nbsp;(Chỉ chấp nhận những dòng hợp lệ)</small></i></h5>
                <div className="container">
                    <div className="row ">
                        <div className="col d-flex justify-content-between align-items-center">
                            <p className="mb-0">Không hợp lệ: {this.props.dataSource.length - validArr.length}</p>
                            <p className="mb-0">Hợp lệ: {validArr.length}</p>
                            <p className="mb-0">Tổng cộng: {this.props.dataSource.length}</p>
                        </div>

                        <div className="col d-flex justify-content-end align-items-center">
                            <button type="button" className="btn btn-info mr-2" disabled={this.state.submitData.length == 0 ? true : false} onClick={this.handleSubmit}>Đồng ý</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <DataGrid
                    dataSource={this.props.dataSource}
                    headingTitle={this.returnHeadingTitle()}
                    IsAutoPaging={true}
                    isHideHeaderToolbar={true}
                    listColumn={DataGridColumnList_ImportFile}
                    PKColumnName={PKColumnName}
                    RowsPerPage={10}
                />
            </React.Fragment>
        )
    }
}

ImportExcelModalCom.defaultProps = {
    dataSource: []
};

const mapDispatchToProps = dispatch => {
    return {
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(null, mapDispatchToProps)(ImportExcelModalCom);