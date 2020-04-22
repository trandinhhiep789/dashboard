import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
class AppPathCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagePath: this.props.PageInfo.PagePath ? this.props.PageInfo.PagePath : ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.PageInfo) !== JSON.stringify(nextProps.PageInfo)) {
            this.setState({
                pagePath: nextProps.PageInfo.PagePath
            })
        }
    }

    render() {
        let { pagePath } = this.state;
        if (!pagePath || pagePath.length == 0) {
            pagePath = [{ Link: "/", Title: "Trang chủ" }];
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {
                                pagePath.map((item, index) => {
                                    if (index == pagePath.length - 1) {
                                        if (item.Link.length > 0) {
                                            return <li className="breadcrumb-item active" key={"li" + index}><Link key={index} to={item.Link}>{item.Title}</Link></li>
                                        }
                                        else {
                                            return <li className="breadcrumb-item active" key={"li" + index}>{item.Title}</li>
                                        }
                                    }
                                    else {
                                        return <li className="breadcrumb-item" key={"li" + index}><Link key={index} to={item.Link}>{item.Title}</Link></li>
                                    }
                                }
                                )
                            }
                        </ol>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        PageInfo: state.PageInfo
    }
}

const AppPath = connect(mapStateToProps, null)(AppPathCom);
export default AppPath;