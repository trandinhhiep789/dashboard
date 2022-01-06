import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../../common/components/FormContainer";
import InputGrid from "../../../../../../common/components/FormContainer/FormControl/InputGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import { showModal } from '../../../../../../actions/modal';
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    GridInstallBundle_Materia,
    InstallBundle_MateriaColumnListEdit,
    schema,
    DataTemplateExport,
    ImportMaterialAPIPath,
    ExportMaterialAPIPath
} from "../constants";

import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { INSTALLBUNDLE_UPDATE } from "../../../../../../constants/functionLists";
import { ERPCOMMONCACHE_INSTALLBUNDLE } from "../../../../../../constants/keyCache";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);
        this.getDataForExport = this.getDataForExport.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            DataExport: []

        };

        this.notificationDOMRef = React.createRef();
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }


    callSearchData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (!apiResult.ResultObject.InstallBundle_MaterialList) {
                    this.setState({
                        DataSource: apiResult.ResultObject
                    });
                } else {
                    const uptInstallBundle_MaterialList = apiResult.ResultObject.InstallBundle_MaterialList.map(item => {
                        return {
                            ...item,
                            MaterialGroupIDName: `${item.MaterialGroupID} - ${item.MaterialGroupName}`
                        }
                    })

                    this.setState({
                        DataSource: {
                            ...apiResult.ResultObject,
                            InstallBundle_MaterialList: uptInstallBundle_MaterialList
                        }
                    });
                };
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
        this.getDataForExport();
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (!apiResult.ResultObject.InstallBundle_MaterialList) {
                    this.setState({
                        DataSource: apiResult.ResultObject
                    });
                } else {
                    const uptInstallBundle_MaterialList = apiResult.ResultObject.InstallBundle_MaterialList.map(item => {
                        return {
                            ...item,
                            MaterialGroupIDName: `${item.MaterialGroupID} - ${item.MaterialGroupName}`
                        }
                    })

                    this.setState({
                        DataSource: {
                            ...apiResult.ResultObject,
                            InstallBundle_MaterialList: uptInstallBundle_MaterialList
                        }
                    });
                };
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
        this.props.updatePagePath(EditPagePath);
        this.getDataForExport();
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        if (Array.isArray(MLObject.ShipmentOrderTypeID)) {
            MLObject.ShipmentOrderTypeID = MLObject.ShipmentOrderTypeID.join();
        }

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_INSTALLBUNDLE);
            }
            this.showMessage(apiResult.Message);
        });
    }

    getDataForExport() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, ExportMaterialAPIPath, id).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã gói lắp đặt": item.InstallBundleID,
                        "Mã nhóm vật tư": item.MaterialGroupID,
                        "Số lượng sử dụng chuẩn": item.StandardUsAgeQuantity,
                        "Số lượng sử dụng tối đa": item.MaxUsAgeQuantity,
                        "Hình thức ghi nhận sử dụng(1: Nhập tay, 2: Quy đổi)": item.UsAgeRecordType,
                        "Mã nhóm vật tư muốn quy đổi": item.ConvertToMaterialGroupID,
                        "Tỷ lệ quy đổi": item.ConvertRatio,
                        "Hình thức xuất sử dụng": item.OutputUsAgeType,
                        "Có khuyến mãi hay không?": item.IsHasPromotion,
                        "Số lượng khuyến mãi": item.PromotionQuantity,
                        "Loại giới hạn tạm ứng; 1: Giới hạn theo số lượng, 2: Giới hạn theo tổng tiền, 3: Không giới hạn": item.AdvanceLimitType,
                        "Số lượng giới hạn tạm ứng": item.AdvanceLimitQuantity,
                        "Số lượng tồn được phép tạm ứng": item.AllowAdvanceMaxStockQuantity,
                        "Có làm tròn số lượng hay không?": item.IsRoundIngQuantity,
                        "Ghi chú": item.Note,
                        "Bội số làm tròn": item.RoundingMultiple,
                        "Là vật tư dịch vụ": item.IsServiceMaterial,
                        "Là vật tư sử dụng cho từng sản phẩm lắp đặt": item.IsMaterialForEachpRoduct,
                        "Kiểm tra tồn kho tại nhóm vật tư khác": item.IsCheckStockInanotheRGroup,
                        "Nhóm vật tư kiểm tra tồn kho": item.InStockMaterialGroupID,
                        "Là nhóm vật tư không xuất kho": item.IsNonOutputMaterial,
                        "Cho phép tạm ứng": item.IsAllowAdvance,
                        "Cho phép tạm ứng nhiều sản phẩm trong một nhóm": item.IsCanMultiAdvance,
                        "Cho phép sử dụng nhiều sản phẩm trong một nhóm": item.IsCanMultiUsage,
                        "Hiển thị đầu tiên khi tạm ứng": item.IsShowTopWhenAdvance,
                        "Thứ tự hiển thị khi tạm ứng": item.AdvanceShowOrderindex,
                        "Hiển thị đầu tiên khi sử dụng": item.IsShowTopWhenUsage,
                        "Thứ tự hiển thị khi sử dụng": item.UsageShowOrderindex,
                        "Có kiểm tra số lượng tồn tối thiểu không": item.IsCheckMinInStock,
                        "Số lượng tồn tối thiểu cần kiểm tra": item.MinInStockQuantity,
                        "Có kiểm tra số lượng sử dụng tối thiểu không": item.IsCheckMinUsage,
                        "Số lượng sử dụng tối thiểu cần kiểm tra": item.MinUsageQuantity,
                        "Kích hoạt": item.IsActived,
                        "Hệ thống": item.IsSystem

                    };
                    return element;

                })

                this.setState({
                    DataExport: exelData
                });
            }
        });
    }



    handleExportCSV() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        // if (!this.state.IsAllowExport) {
        //     result = {
        //         IsError: true,
        //         Message: "Bạn không có quyền xuất file exel!"
        //     };
        // }
        if (this.state.DataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(this.state.DataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, "Danh sách vật tư của gói lắp đặt" + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        }
        //this.props.onExportFile(result);
        this.addNotification(result.Message, result.IsError);

    }

    //import exel file 
    handleExportFileTemplate() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;

        try {
            const ws = XLSX.utils.json_to_sheet(DataTemplateExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "Danh sách vật tư của gói lắp đặt" + fileExtension);
            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        } catch (error) {
            result = {
                IsError: true,
                Message: "Lỗi xuất file!"
            }
        } finally {
            this.addNotification(result.Message, result.IsError);
        }
    }

    handleImportFile() {
        const input = document.getElementById('buttonImportFile');
        input.click();

        let count = 0;
        //const schema = this.props.SchemaData;

        input.addEventListener('change', () => {
            readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
                if (count > 0) {
                    return;
                }
                this.onHandleImportFile(rows, errors);
                count++;

            }, function (error) {
                alert("File vừa chọn lỗi. Vui lòng chọn file khác.")
            });

            setTimeout(() => {
                input.value = '';
            }, 1000);



        });
    }


    onHandleImportFile(resultRows, errors) {
        debugger;
        const id = this.props.match.params.id;
        const CreatedUser = this.props.AppInfo.LoginInfo.Username;
        const LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        const importData = resultRows.map(item => {
            const { UserName, RewardPositionID, IsSystem } = item
            return {
                ...item,
                CreatedUser,
                LoginLogID
                //ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                //WardFullName: `${WardID} - ${WardName}`
            }
        })


        //console.log("data", importData);
        

        let _isError = false;
        importData.map((itemObject, index) => {
            let _OutputUsAgeType = parseFloat(itemObject.OutputUsAgeType);
            if (!itemObject.InstallBundleID && _isError == false) {
                this.addNotification("Vui lòng nhập mã gói lắp đặt.", true);
                _isError = true;
            }
            else if (itemObject.InstallBundleID.toString() != id.toString() && _isError == false) {
                this.addNotification("Mã gói lắp đặt không hợp lệ.", true);
                _isError = true;
            }
            else if (!itemObject.MaterialGroupID && _isError == false) {
                this.addNotification("Vui lòng nhập mã nhóm vật tư.", true);
                _isError = true;
            } 
            else if (isNaN(parseFloat(itemObject.StandardUsAgeQuantity)) && _isError == false) {
                this.addNotification("Vui lòng nhập số lượng sử dụng chuẩn.", true);
                _isError = true;
            }
            else if (isNaN(parseFloat(itemObject.MaxUsAgeQuantity)) && _isError == false) {
                this.addNotification("Vui lòng nhập số lượng sử dụng tối đa.", true);
                _isError = true;
            }
            else if (isNaN(parseFloat(itemObject.AdvanceLimitType)) && _isError == false) {
                this.addNotification("Vui lòng nhập loại giới hạn tạm ứng.", true);
                _isError = true;
            }
            else if ((isNaN(_OutputUsAgeType) || ![1, 2, 3].includes(_OutputUsAgeType)) && _isError == false) {
                this.addNotification("Vui lòng nhập hình thức xuất sử dụng.", true);
                _isError = true;
            }
        });

        if (_isError) {
            return;
        }

        if(errors.length>0){
            this.addNotification("File import không hợp lệ", true);
            return;
        }

        this.props.callFetchAPI(APIHostName, ImportMaterialAPIPath, importData).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }

            this.addNotification(apiResult.Message, apiResult.IsError);

        });



    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        FormName="Cập nhật gói sản phẩm lắp đặt kèm theo"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={this.state.EditElementList}
                        onSubmit={this.handleSubmit}
                        BackLink={BackLink}
                        dataSource={this.state.DataSource}
                        RequirePermission={INSTALLBUNDLE_UPDATE}
                    >
                        <div className="installBuldleOutPutBtn">
                            <div className="btn-toolbar" style={{ position: "absolute", bottom: "-47px", right: "16px", zIndex: "1" }}>
                                <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.handleExportCSV}>
                                        <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                    </button>

                                    {/* import file exel */}
                                    <button type="button" className="btn btn-export ml-10" onClick={this.handleExportFileTemplate.bind(this)}>
                                        <span className="fa fa-exchange">Xuất file mẫu</span>
                                    </button>
                                    <button type="button" className="btn btn-export  ml-10" onClick={this.handleImportFile.bind(this)} >
                                        <span className="fa fa-exchange"> Import File </span>
                                    </button>
                                    < input type="file" id="buttonImportFile" style={{ display: "none" }} ref={input => this.inputElement = input} />
                                </div>
                            </div>
                        </div>

                        <InputGrid
                            name="InstallBundle_MaterialList"
                            controltype="InputGridControl"
                            title="vật tư của gói lắp đặt"
                            Ispopup={true}
                            IDSelectColumnName={"MaterialGroupID"}
                            PKColumnName={""}
                            MLObjectDefinition={GridInstallBundle_Materia}
                            listColumn={InstallBundle_MateriaColumnListEdit}
                            dataSource={this.state.DataSource.InstallBundle_MaterialList}
                            isSystem={this.state.DataSource.IsSystem}
                            colspan="12"
                        />
                    </FormContainer>
                </React.Fragment>
            );
        }
        return <label>Đang nạp dữ liệu...</label>;
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
