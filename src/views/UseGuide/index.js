import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

class UseGuideCom extends React.Component {
    constructor(props) {
        super(props);

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

        return(
            <div>
                <YouTube videoId="uhqWuclFcME" opts={opts} onReady={this._onReady} />
                <YouTube videoId="79bkkvjwsyY" opts={opts} onReady={this._onReady} />
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const UseGuide = connect(mapStateToProps, null)(UseGuideCom);
export default UseGuide;
