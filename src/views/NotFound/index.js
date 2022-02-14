import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PagePath } from "./constants";
import { updatePagePath } from "../../actions/pageAction";
import "./NotFoundCom.css"

class NotFoundCom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    render() {
        return (
            <div className="NotFoundCom">
              <div className="NotFoundCom--dflex">
                <div>
                  <img src="/src/img/error/404.png" />
                </div>
                <div className="NotFoundCom__content">
                  <div>
                    <h1 className="text404">404</h1>
                    <h3>Oops Page Not Found</h3>
                    <p>The page you are looking for doesnot exist or has been moved.</p>
                    <Link to="/" className="btn-home">
                      <span>Go to Home</span>
                    </Link>
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