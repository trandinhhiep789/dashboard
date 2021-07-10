import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatDate } from '../../../../common/library/CommonLib'

export class DocumentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DocumentInfo: {}
        }
    }

    componentDidMount() {
        this.setState({
            DocumentInfo: this.props.DocumentItem
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.DocumentItem) !== JSON.stringify(nextProps.DocumentItem)) {
            this.setState({ DocumentInfo: nextProps.DocumentItem });
        }
    }

    render() {
        const { DocumentInfo } = this.state;
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tên tài liệu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.DocumentName}
                        </label>
                    </div>
                 

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Từ khóa tìm kiếm:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.SearchKeyword}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Thư mục:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.DocumentFolderID + " - " + DocumentInfo.DocumentFolderName}
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại tài liệu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.DocumentTypeID + " - " + DocumentInfo.DocumentTypeName}
                        </label>
                    </div>

                   
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tổng lượt xem:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.TotalViews}
                        </label>

                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tổng lượt thích:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.ToTalLikes}
                        </label>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tổng lượt tải về:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.TotalDownLoad}
                        </label>

                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tổng lượt bình luận:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.TotalComments}
                        </label>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người upload đầu tiên:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.UpLoadFullName}
                        </label>
                        
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày upload đầu tiên:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(DocumentInfo.UpLoadDate, false)}
                        </label>
                    </div>

                </div>


                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người cập nhật lần cuối:</label>
                    </div>
                    <div className="form-group col-md-4">
                        {DocumentInfo.ModifyFullName}
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày cập nhật lần cuối:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(DocumentInfo.ModifyDate, false)}
                        </label>
                    </div>
                </div>

               

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã triển khai:</label>
                    </div>
                    <div className="form-group col-md-4">

                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={DocumentInfo.IsPublished} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày triển khai:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(DocumentInfo.PublishedDate, false)}
                        </label>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người triển khai:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {DocumentInfo.PublishedFullName}
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Khóa bình luận:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={DocumentInfo.IsLockComment} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentInfo)
