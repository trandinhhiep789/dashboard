import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { PagePath } from './constants';
import { updatePagePath } from "../../actions/pageAction";

class UseGuideCom extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);

    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://www.youtube.com/watch?v=uhqWuclFcME&feature=youtu.be
                autoplay: 1,
            },
        };

        return (
            <React.Fragment>
                <div className="col-md-12">
                    <div className="group-Guide">
                        <h3 className="title">Hướng dẫn sử dụng cho TMS MOBILE cho nhân viên tân tâm</h3>
                        <YouTube
                            videoId="uhqWuclFcME"
                            opts={opts}
                            onReady={this._onReady}
                            className="ifram-youtube" 
                        />
                    </div>

                </div>
                <div className="col-md-12">
                    <div className="group-Guide">
                        <h3 className="title">TMS - hướng dẫn dành cho trưởng nhóm điều phối</h3>
                        <YouTube
                            videoId="79bkkvjwsyY"
                            opts={opts} 
                            onReady={this._onReady}
                            className="ifram-youtube" 
                        />
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        AppInfo: state,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
    };
};

const UseGuide = connect(mapStateToProps, mapDispatchToProps)(UseGuideCom);
export default UseGuide;
