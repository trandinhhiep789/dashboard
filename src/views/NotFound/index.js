import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PagePath } from "./constants";
import { updatePagePath } from "../../actions/pageAction";

class NotFoundCom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    render() {
        return (
            <div className="container page-404">
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-6 img-404">
                                <img src="/src/img/error/404.png" />
                            </div>
                            <div className="col-sm-6 content-404">
                                <h1>404</h1>
                                <h3>Oops Page Not Found</h3>
                                <p>The page you are looking for doesnot exist or has been moved.</p>
                                <Link to="/" className="btn-home">
                                    <span>Go to Home</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        AuthenticationInfo: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
    };
};

const NotFound = connect(mapStateToProps, mapDispatchToProps)(NotFoundCom);
export default NotFound