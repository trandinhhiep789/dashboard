import React from 'react';
import { connect } from 'react-redux';

import Notification from './modals/Notification';
// import Confirmation from './modals/Confirmation';
import Confirmation from './modals/Confirmation.1.js';
import ConfirmationNew from './modals/ConfirmationNew.js';
import PreviewMedia from './modals/PreviewMedia';
import CommontModals from './modals/CommontModals';
import ModalSearch from './modals/ModalSearch';
import ConfiComponet from './modals/ConfiComponet.js';
import ModalSlideImage from './modals/ModalSlideImage.js';
import CommonModalView from './modals/CommonModalView';
import DownloadFile from './modals/DownloadFile';
import ShowDownloadFile from './modals/ShowDownloadFile';

import {
    MODAL_TYPE_NOTIFICATION,
    MODAL_TYPE_CONFIRMATION,
    MODAL_TYPE_PREVIEWMEDIA,
    MODAL_TYPE_COMMONTMODALS,
    MODAL_TYPE_SEARCH,
    MODAL_TYPE_CONFIRMATIONNEW,
    MODAL_TYPE_CONFICOMPONET,
    MODAL_TYPE_IMAGE_SLIDE,
    MODAL_TYPE_VIEW,
    MODAL_TYPE_DOWNLOAD_EXCEL,
    MODAL_TYPE_SHOWDOWNLOAD_EXCEL
} from '../../../constants/actionTypes';

const MODAL_COMPONENTS = {
    [MODAL_TYPE_NOTIFICATION]: Notification,
    [MODAL_TYPE_CONFIRMATION]: Confirmation,
    [MODAL_TYPE_PREVIEWMEDIA]: PreviewMedia,
    [MODAL_TYPE_COMMONTMODALS]: CommontModals,
    [MODAL_TYPE_SEARCH]: ModalSearch,
    [MODAL_TYPE_CONFIRMATIONNEW]: ConfirmationNew,
    [MODAL_TYPE_CONFICOMPONET]: ConfiComponet,
    [MODAL_TYPE_IMAGE_SLIDE]: ModalSlideImage,
    [MODAL_TYPE_VIEW]: CommonModalView,
    [MODAL_TYPE_DOWNLOAD_EXCEL]: DownloadFile,
    [MODAL_TYPE_SHOWDOWNLOAD_EXCEL]: ShowDownloadFile
};
const lstModals = [];
const ModalRoot = ({ type, props }) => {
    if (!type) {
        lstModals.splice(lstModals.length - 1, 1);
    } else {
        lstModals.push({ type, props })
    }
    return <div>
        {lstModals.map((item, index) => {
            const ModalComponent = MODAL_COMPONENTS[item.type];
            return <ModalComponent {...item.props} key={index} />
        })}

    </div>;
};

export default connect(state => state.ModalInfo)(ModalRoot);