import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { CDN_LOGO_IMAGE } from '../../../../../constants/systemVars'

export default class ModalDownloadFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExportFile: false,
        }


    }

    componentDidMount() {

    }



    render() {
        console.log("aaa", this.props)

        return (
            <React.Fragment>
                {/* <a className="btn-download-file" href="http://filecdn.tterpbeta.vn/InventoryMaterialsExport/2021/5/Bao-cao-ton-vat-tu-a96cef3e-7617-41e7-ab6f-54e6b01b2658.xlsx" data-url="http://filecdn.tterpbeta.vn/InventoryMaterialsExport/2021/5/Bao-cao-ton-vat-tu-a96cef3e-7617-41e7-ab6f-54e6b01b2658.xlsx">
                    <img className="item" src="/src/img/icon/icon-down.gif" alt="download file icon" />
                    <span className="item" >[Link File]</span>
                </a> */}
                <a className="btn-download-file" href={CDN_LOGO_IMAGE + this.props.URLDownloadFile} data-url={CDN_LOGO_IMAGE + this.props.URLDownloadFile}>
                    <img className="item" src="/src/img/icon/icon-down.gif" alt="download file icon" />
                    <span className="item" >[Link File]</span>
                </a>
            </React.Fragment >
        )
    }
}
