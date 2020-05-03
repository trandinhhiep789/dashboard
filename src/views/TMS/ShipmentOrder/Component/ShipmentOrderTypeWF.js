import React, { Component } from "react";
import { connect } from 'react-redux';
class ShipmentOrderTypeWFCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrderType_WF: this.props.ShipmentOrderTypeWF
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderTypeWF) !== JSON.stringify(nextProps.ShipmentOrderTypeWF)) {
            this.setState({
                ShipmentOrderType_WF: nextProps.ShipmentOrderTypeWF
            })
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="stepper">
                        {this.state.ShipmentOrderType_WF && this.state.ShipmentOrderType_WF.map((item, index) => {
                            return (<div className="stepper-item" key={index}>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="fa fa-check" aria-hidden="true"></i>
                                        </div>
                                    </span>
                                    <span className="step-label">{item.ShipmentOrderStepName}</span>
                                    <span className={(item.IsProcess ==true ? "step-time" : "")}>{item.ProcessDate}</span>
                                </span>
                            </div>
                            )
                        })}

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
        }
    }
}


const ShipmentOrderTypeWF = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderTypeWFCom);
export default ShipmentOrderTypeWF;