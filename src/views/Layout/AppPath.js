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

    componentDidUpdate() {
        const { PageInfo } = this.props;

        //Begin customize the Title of Any Page
        let arrPageInfoTitle = document.title.split("|");
        let pageInfoTitle = arrPageInfoTitle[arrPageInfoTitle.length - 1];
        PageInfo.PagePath.forEach((pageInfo, index) => {
            if (index != 0) {
                pageInfoTitle = `${pageInfo.Title} | ${pageInfoTitle}`;
            }
        });
        document.title = pageInfoTitle;
        //End customize the Title of Any Page
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
            pagePath = [{ Link: "/", Title: "Trang chủ", icon: "fa fa-home" }];
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <nav aria-label="breadcrumb" className="nav-breadcrumb">
                        <span className='left-icon'>
                            <i className='fa fa-ellipsis-v'></i>
                        </span>
                        <ol className="breadcrumb">
                            {
                                pagePath.map((item, index) => {

                                    if (index == pagePath.length - 1) {
                                        if (item.Link.length > 0) {
                                            return <li className="breadcrumb-item active 2" key={"li" + index}>
                                                <Link key={index} to={item.Link}>
                                                    <i className={item.icon}></i>
                                                    {item.Title}
                                                </Link>
                                            </li>
                                        }
                                        else {
                                            return <li className="breadcrumb-item active 3" key={"li" + index}>
                                                <i className={item.icon}></i>
                                                {item.Title}
                                            </li>
                                        }
                                    }
                                    else {
                                        return <li className="breadcrumb-item 1" key={"li" + index}>
                                            <Link key={index} to={item.Link}>
                                                <i className={item.icon}></i>
                                                {item.Title}
                                            </Link>
                                        </li>
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