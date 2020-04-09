import React, { Component } from "react";
import { showModal } from '../../../../../../actions/modal';
import { connect } from 'react-redux';

import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { MODAL_TYPE_CONFIRMATIONNEW, MODAL_TYPE_CONFICOMPONET } from '../../../../../../constants/actionTypes';

class AbumCom extends Component {
    constructor(props) {
        super(props);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.state = {
            LstProduct_Abum: this.props.Abum
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Abum) !== JSON.stringify(nextProps.Abum)) {
            this.setState({
                LstProduct_Abum: nextProps.Abum
            })
        }
    }

    handleInsertClick()
    {
        let listColumnNew = this.props.listColumn.filter((person, index) => {
			if (this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) { return person; }
		});
		this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
			title: 'Cập nhật ' + this.props.title,
			onConfirm: (isConfirmed, formData) => {
			},
			modalElementList: listColumnNew,
			modalElementOl: this.props.MLObjectDefinition
		});

    }


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="flexbox mb-10 ">
                        <span>Hình ảnh </span>
                        <div className="btn-toolbar">
                            <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleInsertClick}>
                                    <span className="fa fa-plus ff"> Thêm </span>
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="lstImages">
                        <div className="content-images">
                            <div className="row">
                                <div className="col-3">
                                    <div className="abum">
                                        <div className="abumName">
                                            <div class="innerBody">
                                                <h3>Tải tập tin/ hoặc hình ảnh</h3>
                                            </div>
                                        </div>
                                        <div className="hover">
                                            <div className="btnuploadbyabum">
                                                <i className="fa fa-upload"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="images">
                                        <ul className="item">
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                            <li>
                                                <img src="/src/img/samsung-galaxy.png" />
                                                <h3>Samsung galaxy</h3>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
		},
		callGetCache: (cacheKeyID) => {
			return dispatch(callGetCache(cacheKeyID));
		}
		,
		callFetchAPI: (hostname, hostURL, postData) => {
			return dispatch(callFetchAPI(hostname, hostURL, postData));
		}
    }
}


const Abum = connect(mapStateToProps, mapDispatchToProps)(AbumCom);
export default Abum;