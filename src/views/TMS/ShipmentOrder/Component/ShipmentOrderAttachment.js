import React, { Component } from "react";
import { connect } from 'react-redux';
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    DataGridColumnItemList
} from "../constants";
class ShipmentOrderAttachmentCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderAttachment
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderAttachment) !== JSON.stringify(nextProps.ShipmentOrderAttachment)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderAttachment
            })
        }
    }

    render() {
        return (
            <div className='card'>
                        <div className='card-body'>
                            <b>Tập tin đính kèm:</b>
                            <ul className="attachedList">
                                <li>
                                    <div className="addFile" >
                                        <input multiple={true} name='file' type='file' id="files" hidden className='attachmentitem' />
                                        <i>+</i>
                                        <label htmlFor="files" className='attachmentitem'>Thêm file</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="delIcon" >˟</div>
                                    <a>
                                        <div className="pull-left fileType"><span className="doctype docx"></span></div>
                                        <div className="attachName">
                                            <div className="hideCont bold">Baocao3032020</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="delIcon" >˟</div>
                                    <a >
                                        <div className="pull-left fileType"><span className="doctype xlsx"></span></div>
                                        <div className="attachName">
                                            <div className="hideCont bold">Baocao3032020</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="delIcon" >˟</div>
                                    <a >
                                        <div className="pull-left fileType"><span className="doctype zip"></span></div>
                                        <div className="attachName">
                                            <div className="hideCont bold">Baocao3032020</div>
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </div>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderAttachment = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderAttachmentCom);
export default ShipmentOrderAttachment;