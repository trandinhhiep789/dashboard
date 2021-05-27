import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';
import { CDN_DOWNLOAD_FILE } from '../../../../constants/systemVars';

const DownloadFile = (props) => {
    return (
        <Modal title={props.title} onClose={props.onClose} maxWidth={props.maxWidth}>
            <a
                className="btn-download-file"
                href={CDN_DOWNLOAD_FILE + props.URLDownloadFile}
                data-url={CDN_DOWNLOAD_FILE + props.URLDownloadFile}
            >
                <img className="item" src="/src/img/icon/icon-down.gif" alt="download file icon" />
                <span className="item" >[Link File]</span>
            </a>
        </Modal>
    )
};

DownloadFile.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
};

export default connect(null, { hideModal })(DownloadFile);
