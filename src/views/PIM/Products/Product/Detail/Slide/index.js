import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import ImageGallery from 'react-image-gallery';
import '../../../../../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import {CDN_LOGO_IMAGE} from '../../../../../../constants/systemVars';

class SlideCom extends Component {
    constructor(props) {
        super(props);
    }

    createLstimages(lstImage) {
        let itemListResult = [];
        for (let i = 0; i < lstImage.length; i++) {
            itemListResult.push({ original:CDN_LOGO_IMAGE+"//"+ lstImage[i].ImagefileURL, thumbnail:CDN_LOGO_IMAGE+"//"+ lstImage[i].ImagefileURL });
        }
        return itemListResult;
    }
    render() {
        let images = [
            {
                original: '/src/img/mwg-icon.png',
                thumbnail: '/src/img/mwg-icon.png',
            }
        ]

        if (this.props.lstImage.length > 0) {
            images = this.createLstimages(this.props.lstImage);
        }

        return (
            <div className="col-12 col-md-6 col-lg-4">
                <ImageGallery
                    items={images}
                    showThumbnails={true}
                    thumbnailPosition="right"
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={true}
                    showBullets={false}
                />
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

const Slide = connect(mapStateToProps, mapDispatchToProps)(SlideCom);
export default Slide;