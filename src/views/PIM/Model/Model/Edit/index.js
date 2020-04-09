import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { GetMLObjectData } from "../../../../../common/library/form/FormLib";
import FormControl, {
    ComboBox
} from "../../../../../common/components/Form/AdvanceForm/FormControl";
import TabContainer from "../../../../../common/components/Tabs/TabContainerCustomize";
import TabPage from "../../../../../common/components/Tabs/TabPageCustomize";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";

import AddVariant from "../Variant"
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    IDSelectColumnNameModelUnit,
    IDSelectColumnNameModelVariant,
    BackLink,
    EditPagePath,
    MLObjectDefinition1,
    InputModelCategoryColumnList,
    GridMLObjectModelCategoryDefinition,
    InputModelUnitColumnList,
    GridMLObjectModelUnitDefinition,
    AddModelUnitColumnList,
    ModifyModalColumnList,
    ModalModelUnitMLObjectDefinition,
    InputModelVariantColumnList,
    GridMLObjectModelVariantDefinition,
    AddModelVariantColumnList,
    ModifyModelVariantColumnList,
    ModalModelVariantMLObjectDefinition,
    LoadAPIPathModelCategory,
    LoadAPIPathModelUnit,
    LoadAPIPathModelVariant,
    UpdateAPIPathModelCategory,
    UpdateAPIPathModelUnit,
    UpdateAPIPathModelVariant,
    AddAPIPathModelUnit,
    AddAPIPathModelVariant,
    DeleteAPIPathModelUnit,
    DeleteAPIPathModelVariant,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";

import { showModal, hideModal } from "../../../../../actions/modal";
import { MODAL_TYPE_CONFIRMATION, MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.handleSubmitGrid = this.handleSubmitGrid.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        //////////////////////////
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.openVariant = this.openVariant.bind(this);
        this.closeVariant = this.closeVariant.bind(this);
        this.handleDeleteModelUnit = this.handleDeleteModelUnit.bind(this);
        this.handleDeleteModelVariant = this.handleDeleteModelVariant.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            FormCols: 2,
            ResultModel: [],
            OldResultModel: [],
            ResultModelCategory: [],
            ResultModelUnit: [],
            ResultModelVariant: [],
            ModelID: "",
            searchAPIPath: "",
            addAPIPath: "",
            updateAPIPath: UpdateAPIPath,
            deleteAPIPath: "",
            IsShowSubmitButton: true,
            FocusTabName: "ResultModel"
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const ModelID = this.props.match.params.id.trim();
        this.props.callFetchAPI(APIHostName, LoadAPIPath, ModelID).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    ResultModel: apiResult.ResultObject,
                    OldResultModel: apiResult.ResultObject
                });
            }
            this.setState({
                IsLoadDataComplete: true,
                ModelID
            });
        });
        this.props.callGetCache("PIMCACHE.ATTRIBUTEVALUE").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({ cacheAttributeValue: result.ResultObject.CacheData });
            }
        });
    }

    handleSubmitInsertLog(modelName, modelDescription) {
        let MLObject = {};
        MLObject.ActivityTitle = `Cập nhật model: ${modelName}`;
        MLObject.ActivityDetail = `Cập nhật model: ${modelName} ${"\n"}Mô tả: ${modelDescription}`;
        MLObject.ObjectID = "PIM_MODEL";
        MLObject.ActivityUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit() {
        const resuleName = this.state.FocusTabName;
        let formData = this.state[resuleName];
        if (resuleName == "ResultModel") {
            if (!this.state.ResultModel.HasChanged) {
                // this.showMessage("Không thể thực hiện update dữ liệu khi chưa có sự thay đổi.");
                this.addNotification("Không thể thực hiện update dữ liệu khi chưa có sự thay đổi.", true);
                return false;
            }
            formData.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        } else {
            formData = this.state[resuleName].filter(x => x.HasChanged == true);
            if (formData.length == 0) {
                // this.showMessage("Không thể thực hiện update dữ liệu khi chưa có sự thay đổi.");
                this.addNotification("Không thể thực hiện update dữ liệu khi chưa có sự thay đổi.", true);
                return false;
            }
            formData.map(element => {
                element.ModelID = this.state.ModelID;
                element.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                element.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            });
        }
        this.props.callFetchAPI(APIHostName, this.state.updateAPIPath, formData).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleSubmitInsertLog(formData.ModelName, formData.ModelDescription);
            }
        });
    }

    valueChangeInputGrid(elementdata, index, name) {
        if (name == "ResultModelUnit" || name == "ResultModelVariant") {
        }
        else {
            const rowGridData = Object.assign({}, this.state[name][index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
            const dataSource = Object.assign([], this.state[name], { [index]: rowGridData });
            this.setState({ [name]: dataSource });
        }
    }

    handleSubmitGrid(name) {
        let gridDataSource = this.state[name].filter(x => x.HasChanged == true);
        if (gridDataSource.length > 0) {
            gridDataSource.map(row => {
                if (row.HasExist) {
                    row.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                } else {
                    row.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                }
                row.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            });
            this.props.callFetchAPI(APIHostName, this.state.updateAPIPath, gridDataSource).then(apiResult => {
                if (!apiResult.IsError) {
                }
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.addNotification(apiResult.Message, apiResult.IsError);
            });
        } else {
            this.addNotification("Không tồn tại data chỉnh sửa.", true);
            // this.showMessage("Không tồn tại data chỉnh sửa.");
        }
    }

    handleValueChange(name, value) {
        const ResultModel = Object.assign({}, this.state.ResultModel, { [name]: value }, { HasChanged: true });
        this.setState({ ResultModel });
    }

    handleChangeTab(searchAPIPath, addAPIPath, updateAPIPath, deleteAPIPath, name) {
        let searchParams;
        if (name == "ResultModel") {
            searchParams = this.state.ModelID;
        } else {
            searchParams = [
                {
                    SearchKey: "@MODELID",
                    SearchValue: this.state.ModelID
                }
            ];
        }
        this.props.callFetchAPI(APIHostName, searchAPIPath, searchParams).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    searchAPIPath,
                    addAPIPath,
                    updateAPIPath,
                    deleteAPIPath
                });
                this.showMessage(apiResult.Message);
            } else {
                let ResultObject = apiResult.ResultObject;
                if (name == "ResultModelVariant") {
                    ResultObject = this.groupResultModelVariant(apiResult.ResultObject)
                }
                this.setState({
                    [name]: ResultObject,
                    IsLoadDataComplete: true,
                    searchAPIPath,
                    addAPIPath,
                    updateAPIPath,
                    deleteAPIPath
                });
            }
        });
        if (name == "ResultModel" || name == "ResultModelCategory") {
            this.setState({
                IsShowSubmitButton: true,
                FocusTabName: name
            });
        } else {
            this.setState({
                IsShowSubmitButton: false,
                FocusTabName: name
            });
        }
    }

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource, formData, formValidation) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: "Thêm mới",
            autoCloseModal: true,
            onConfirm: (isConfirmed, formData, selectedFileList, formValidation) => {
                let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                if (MLObject) {
                    MLObject.ModelID = this.state.ModelID.trim();
                    MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                    MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                    this.props.callFetchAPI(APIHostName, this.state.addAPIPath, MLObject).then(apiResult => {
                        if (!apiResult.IsError) {
                            let searchParams;
                            name = this.state.FocusTabName;
                            if (name == "ResultModel") {
                                searchParams = this.state.ModelID;
                            }
                            else {
                                searchParams = [
                                    {
                                        SearchKey: "@MODELID",
                                        SearchValue: this.state.ModelID
                                    }
                                ];
                            }
                            this.props.callFetchAPI(APIHostName, this.state.searchAPIPath, searchParams).then(apiResult => {
                                if (apiResult.IsError) {
                                    this.showMessage(apiResult.Message);
                                }
                                else {
                                    let ResultObject = apiResult.ResultObject;
                                    if (name == "ResultModelVariant") {
                                        ResultObject = this.groupResultModelVariant(apiResult.ResultObject)
                                    }
                                    this.setState({ [name]: ResultObject });
                                }
                            });
                        }
                        this.setState({ IsCallAPIError: apiResult.IsError });
                        this.addNotification(apiResult.Message, apiResult.IsError);
                    });
                }
            },
            modalElementList: modalElementList,
            formData: formData,
            formValidation: formValidation
        });
    }

    handleInputGridEdit(MLObjectDefinition, modalElementList, dataSource, formData) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: "Chỉnh sửa",
            autoCloseModal: true,
            onConfirm: (isConfirmed, formData, selectedFileList) => {
                if (isConfirmed) {
                    const MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    MLObject.ModelID = this.state.ModelID.trim();
                    MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                    MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                    this.props.callFetchAPI(APIHostName, this.state.updateAPIPath, MLObject).then(apiResult => {
                        if (!apiResult.IsError) {
                            let searchParams;
                            name = this.state.FocusTabName;
                            if (name == "ResultModel") {
                                searchParams = this.state.ModelID;
                            }
                            else {
                                searchParams = [
                                    {
                                        SearchKey: "@MODELID",
                                        SearchValue: this.state.ModelID
                                    }
                                ];
                            }
                            this.props.callFetchAPI(APIHostName, this.state.searchAPIPath, searchParams).then(apiResult => {
                                if (apiResult.IsError) {
                                    this.showMessage(apiResult.Message);
                                }
                                else {
                                    let ResultObject = apiResult.ResultObject;
                                    if (name == "ResultModelVariant") {
                                        ResultObject = this.groupResultModelVariant(apiResult.ResultObject)
                                    }
                                    this.setState({
                                        [name]: ResultObject
                                    });
                                }
                            });
                        }
                        this.setState({ IsCallAPIError: apiResult.IsError });
                        this.addNotification(apiResult.Message, apiResult.IsError);
                    });
                }
            },
            modalElementList: modalElementList,
            formData: formData
        });
    }

    openVariant(MLObjectDefinition, modalElementList, dataSource, formData, index) {
        let ResultAttributeValue = [];
        let DataSource = [];
        if (typeof index != "undefined") {
            DataSource = dataSource[index];
            const AttributeValue = dataSource[index].AttributeValueID;
            const cacheAttributeValue = this.state.cacheAttributeValue;
            AttributeValue.map((item1, index1) => {
                const element = cacheAttributeValue.filter(item => { return item.AttributeValueID == item1 })[0]
                ResultAttributeValue.push({
                    ModelVariantID: dataSource[index].ModelVariantID,
                    ProductID: dataSource[index].ProductID,
                    ProductName: dataSource[index].ProductName,
                    AttributeID: element.AttributeID,
                    AttributeName: element.AttributeName,
                    AttributeValueID: item1,
                    AttributeValue: element.AttributeValue,
                    IsActived: dataSource[index].IsActived[index1]
                })
            })
        }
        else {
            DataSource = [{
                IsActived_Parent: true
            }]
        }
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập thông tin',
            content: { text: <AddVariant IsEditData={formData ? true : false} modelID={this.state.ModelID} ResultAttributeValue={ResultAttributeValue} DataSource={DataSource} closeVariant={this.closeVariant} /> },
            maxWidth: '1200px'
        });
    }

    closeVariant(IsError, Message) {
        this.props.hideModal();
        this.setState({ IsCallAPIError: IsError });
        this.addNotification(Message, IsError);
        const searchParams = [
            {
                SearchKey: "@MODELID",
                SearchValue: this.state.ModelID
            }
        ];
        this.props.callFetchAPI(APIHostName, this.state.searchAPIPath, searchParams).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                const ResultObject = this.groupResultModelVariant(apiResult.ResultObject)
                this.setState({ [this.state.FocusTabName]: ResultObject });
            }
        });
    }

    groupResultModelVariant(ResultObject) {
        let groupAttributeID = ResultObject.reduce(function (obj, item) {
            obj[item.ModelVariantID] = obj[item.ModelVariantID] || [];
            obj[item.ModelVariantID].push(item.AttributeID);
            return obj;
        }, {});
        ///////////////////////////////////////////////////////////////
        let groupAttributeName = ResultObject.reduce(function (obj, item) {
            obj[item.ModelVariantID] = obj[item.ModelVariantID] || [];
            if (!obj[item.ModelVariantID].toString().includes(item.AttributeName))
                obj[item.ModelVariantID].push(item.AttributeName);
            return obj;
        }, {});
        ///////////////////////////////////////////////////////////////
        let groupAttributeValueID = ResultObject.reduce(function (obj, item) {
            obj[item.ModelVariantID] = obj[item.ModelVariantID] || [];
            obj[item.ModelVariantID].push(item.AttributeValueID);
            return obj;
        }, {});
        ///////////////////////////////////////////////////////////////
        let groupAttributeValue = ResultObject.reduce(function (obj, item) {
            obj[item.ModelVariantID] = obj[item.ModelVariantID] || [];
            obj[item.ModelVariantID].push(item.AttributeValue);
            return obj;
        }, {});
        ///////////////////////////////////////////////////////////////
        let groupIsActived = ResultObject.reduce(function (obj, item) {
            obj[item.ModelVariantID] = obj[item.ModelVariantID] || [];
            obj[item.ModelVariantID].push(item.IsActived);
            return obj;
        }, {});
        ///////////////////////////////////////////////////////////////
        let groups = Object.keys(groupAttributeID).map(function (key1) {
            let refAttributeName;
            Object.keys(groupAttributeName).map(function (key2) {
                if (key2 == key1)
                    refAttributeName = groupAttributeName[key2];
            })

            let refAttributeValueID;
            Object.keys(groupAttributeValueID).map(function (key2) {
                if (key2 == key1)
                    refAttributeValueID = groupAttributeValueID[key2];
            })

            let refAttributeValue;
            Object.keys(groupAttributeValue).map(function (key2) {
                if (key2 == key1)
                    refAttributeValue = groupAttributeValue[key2];
            })

            let refIsActived;
            Object.keys(groupIsActived).map(function (key2) {
                if (key2 == key1)
                    refIsActived = groupIsActived[key2];
            })

            let productID = ResultObject.filter(item => {
                return item.ModelVariantID == key1
            })

            return {
                ModelVariantID: key1,
                ProductID: productID[0].ProductID,
                ProductName: productID[0].ProductName,
                IsActived_Parent: productID[0].IsActived_Parent,
                AttributeID: groupAttributeID[key1],
                AttributeName: refAttributeName.toString().replace(',', '/'),
                AttributeValueID: refAttributeValueID,
                AttributeValue: refAttributeValue.toString().replace(/,/g, '/'),
                IsActived: refIsActived
            };
        });
        return groups;
    }

    handleDeleteModelUnit(deleteList, dataSource) {
        let listItem = [];
        deleteList.map((selectItem) => {
            let isMath = false;
            dataSource.map((row) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                            isMath = false;
                            break;
                        } else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        row.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                        listItem.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, this.state.deleteAPIPath, listItem).then(apiResult => {
            if (!apiResult.IsError) {
                const searchParams = [
                    {
                        SearchKey: "@MODELID",
                        SearchValue: this.state.ModelID
                    }
                ];
                this.props.callFetchAPI(APIHostName, this.state.searchAPIPath, searchParams).then(apiResult => {
                    if (apiResult.IsError) {
                        this.showMessage(apiResult.Message);
                    } else {
                        let ResultObject = apiResult.ResultObject;
                        this.setState({ [this.state.FocusTabName]: ResultObject });
                    }
                });
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleDeleteModelVariant(deleteList, dataSource) {
        let listMLObject = [];
        deleteList.map((selectItem) => {
            let isMath = false;
            dataSource.map((row) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                            isMath = false;
                            break;
                        } else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        let MLObject = {};
                        MLObject.ModelVariantID = row.ModelVariantID;
                        MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                        listMLObject.push(MLObject);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, this.state.deleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                const searchParams = [
                    {
                        SearchKey: "@MODELID",
                        SearchValue: this.state.ModelID
                    }
                ];
                this.props.callFetchAPI(APIHostName, this.state.searchAPIPath, searchParams).then(apiResult => {
                    if (apiResult.IsError) {
                        this.showMessage(apiResult.Message);
                    } else {
                        let ResultObject = ResultObject = this.groupResultModelVariant(apiResult.ResultObject)
                        this.setState({ [this.state.FocusTabName]: ResultObject });
                    }
                });
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <TabContainer
                        defaultActiveTabIndex={0}
                        controltype="TabContainer"
                        title="Chỉnh sửa thông tin Model"
                        IsAutoLoadDataGrid={true}
                        IsAutoLayout={true}
                        IsShowSubmitButton={this.state.IsShowSubmitButton}
                        onHandleTabClick={this.handleChangeTab}
                        onValueChangeInputGrid={this.valueChangeInputGrid}
                        onValueChange={this.handleValueChange}
                        onHandleSubmit={this.handleSubmit}
                        loginUserName={this.props.AppInfo.LoginInfo.Username}
                    >
                        <TabPage
                            title="Thông tin chung"
                            name="ResultModel"
                            MLObjectDefinition={MLObjectDefinition1}
                            datasource={this.state.ResultModel}
                            searchAPIPath={LoadAPIPath}
                            updateAPIPath={UpdateAPIPath}
                        >
                            <div className="form-row">
                                <div className="col-sm-8">
                                    <FormControl.TextBox
                                        name="ModelID"
                                        label="Mã model"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.ModelID}
                                        datasourcemember="ModelID"
                                        placeholder="(ID tạo tự động)"
                                        readonly={true}
                                        labelcolspan={3}
                                        colspan={9}
                                    />
                                    <FormControl.TextBox
                                        name="ModelName"
                                        label="Tên model"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.ModelName}
                                        datasourcemember="ModelName"
                                        readonly={false}
                                        labelcolspan={3}
                                        colspan={9}
                                        maxSize={400}
                                    />
                                    <FormControl.ComboBox
                                        name="ProductTypeID"
                                        label="Loại sản phẩm"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.ProductTypeID}
                                        listoption={[]}
                                        datasourcemember="ProductTypeID"
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="PIMCACHE.PRODUCTTYPE"
                                        valuemember="ProductTypeID"
                                        nameMember="ProductTypeName"
                                        labelcolspan={3}
                                        colspan={9}
                                    />
                                    <FormControl.ComboBox
                                        name="DefaultCategoryID"
                                        label="Danh mục mặc định"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.DefaultCategoryID}
                                        listoption={[]}
                                        datasourcemember="DefaultCategoryID"
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="PIMCACHE.CATEGORY"
                                        valuemember="CategoryID"
                                        nameMember="CategoryName"
                                        labelcolspan={3}
                                        colspan={9}
                                    />
                                    <FormControl.ComboBox
                                        name="BrandID"
                                        label="Nhãn hiệu"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.BrandID}
                                        listoption={[]}
                                        datasourcemember="BrandID"
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="PIMCACHE.BRAND"
                                        valuemember="BrandID"
                                        nameMember="BrandName"
                                        labelcolspan={3}
                                        colspan={9}
                                    />
                                    <FormControl.ComboBox
                                        name="DefaultQuantityUnitID"
                                        label="Đơn vị tính mặc định"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.DefaultQuantityUnitID}
                                        listoption={[]}
                                        isautoloaditemfromcache={true}
                                        datasourcemember="DefaultQuantityUnitID"
                                        loaditemcachekeyid="PIMCACHE.QUANTITYUNIT"
                                        valuemember="QuantityUnitID"
                                        nameMember="QuantityUnitName"
                                        labelcolspan={3}
                                        colspan={9}
                                    />
                                    <div className="form-row">
                                        {/* <FormControl.Number
                                            name="VAT"
                                            label="VAT(%)"
                                            controltype="InputControl"
                                            value={this.state.ResultModel.VAT}
                                            datasourcemember="VAT"
                                            readonly={false}
                                            labelcolspan={4}
                                            colspan={8}
                                            rowspan={9}
                                            paddinginput={8}
                                            min={"1"}
                                            max={"5"}
                                        /> */}
                                        <FormControl.Numeric name="VAT"
                                            label="VAT(%)"
                                            datasourcemember="VAT" controltype="InputControl"
                                            labelcolspan={4}
                                            colspan={8}
                                            rowspan={9}
                                            value={this.state.ResultModel ? this.state.ResultModel.VAT : ""}
                                            maxSize={5}
                                        />
                                        <FormControl.CheckBox
                                            name="IsNoVAT"
                                            label="Không thuế xuất"
                                            controltype="InputControl"
                                            value={this.state.ResultModel.IsNoVAT}
                                            datasourcemember="IsNoVAT"
                                            labelcolspan={10}
                                            colspan={1}
                                            rowspan={3}
                                            swaplabel={true}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <FormControl.Numeric
                                            name="POVAT"
                                            label="VAT mua hàng(%)"
                                            controltype="InputControl"
                                            value={this.state.ResultModel.POVAT}
                                            datasourcemember="POVAT"
                                            readonly={false}
                                            labelcolspan={4}
                                            colspan={8}
                                            rowspan={9}
                                            maxSize={5}
                                        />
                                        <FormControl.CheckBox
                                            name="IsNoPOVAT"
                                            label="Không thuế xuất mua hàng"
                                            controltype="InputControl"
                                            value={this.state.ResultModel.IsNoPOVAT}
                                            datasourcemember="IsNoPOVAT"
                                            labelcolspan={10}
                                            colspan={1}
                                            rowspan={3}
                                            swaplabel={true}
                                        />
                                    </div>
                                    <FormControl.CheckBox
                                        name="IsActived"
                                        label="Kích hoạt"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.IsActived}
                                        datasourcemember="IsActived"
                                        labelcolspan={3}
                                        colspan={8}
                                    />
                                    <FormControl.CheckBox
                                        name="IsSystem"
                                        label="Hệ thống"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.IsSystem}
                                        datasourcemember="IsSystem"
                                        labelcolspan={3}
                                        colspan={8}
                                    />
                                    <FormControl.TextArea
                                        name="ModelDescription"
                                        label="Mô tả model"
                                        controltype="InputControl"
                                        value={this.state.ResultModel.ModelDescription}
                                        datasourcemember="ModelDescription"
                                        readonly={false}
                                        labelcolspan={3}
                                        colspan={9}
                                        rows="6"
                                        maxSize={2000}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    {/* <FormControl.TextArea
                                    name="ModelDescription"
                                    label="Mô tả model"
                                    controltype="InputControl"
                                    value="312312312312312"
                                    datasourcemember="ModelDescription"
                                    readonly={false}
                                    labelcolspan={3}
                                    colspan={9}
                                // rowspan={8}
                                /> */}
                                </div>
                            </div>
                        </TabPage>
                        <TabPage
                            title="Danh mục"
                            name="ResultModelCategory"
                            datasource={this.state.ResultModelCategory}
                            searchAPIPath={LoadAPIPathModelCategory}
                            updateAPIPath={UpdateAPIPathModelCategory}
                        >
                            <InputGrid
                                name="ResultModelCategory"
                                controltype="GridControl"
                                listColumn={InputModelCategoryColumnList}
                                dataSource={this.state.ResultModelCategory}
                                MLObjectDefinition={GridMLObjectModelCategoryDefinition}
                                onHandleSubmitGrid={this.handleSubmitGrid}
                                colspan="10"
                                IsAutoPaging={false}
                                IsShowRowNull={true}
                                isHideHeaderToolbar={true}
                                isShowFooterToolbar={false}
                            />
                        </TabPage>
                        <TabPage
                            title="Đơn vị tính"
                            name="ResultModelUnit"
                            datasource={this.state.ResultModelUnit}
                            searchAPIPath={LoadAPIPathModelUnit}
                            addAPIPath={AddAPIPathModelUnit}
                            updateAPIPath={UpdateAPIPathModelUnit}
                            deleteAPIPath={DeleteAPIPathModelUnit}
                        >
                            <InputGrid
                                name="ResultModelUnit"
                                controltype="GridControl"
                                listColumn={InputModelUnitColumnList}
                                dataSource={this.state.ResultModelUnit}
                                MLObjectDefinition={GridMLObjectModelUnitDefinition}
                                IDSelectColumnName={IDSelectColumnNameModelUnit}
                                PKColumnName="QuantityUnitID"
                                modalElementList={AddModelUnitColumnList}
                                modifyModalElementList={ModifyModalColumnList}
                                modalMLObjectDefinition={ModalModelUnitMLObjectDefinition}
                                onInsertClick={this.handleInputGridInsert}
                                onhandleEditClick={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleDeleteModelUnit}
                                onValueChangeInputGrid={this.valueChangeInputGrid}
                                colspan="12"
                                RowsPerPage={10}
                                IsAutoPaging={true}
                                isHideHeaderToolbar={false}
                                isShowFooterToolbar={false}
                                IsShowRowNull={true}
                            />
                        </TabPage>
                        <TabPage
                            title="Biến thể"
                            name="ResultModelVariant"
                            datasource={this.state.ResultModelVariant}
                            searchAPIPath={LoadAPIPathModelVariant}
                            addAPIPath={AddAPIPathModelVariant}
                            updateAPIPath={UpdateAPIPathModelVariant}
                            deleteAPIPath={DeleteAPIPathModelVariant}
                        >
                            <InputGrid
                                name="ResultModelVariant"
                                controltype="GridControl"
                                listColumn={InputModelVariantColumnList}
                                dataSource={this.state.ResultModelVariant}
                                MLObjectDefinition={GridMLObjectModelVariantDefinition}
                                IDSelectColumnName={IDSelectColumnNameModelVariant}
                                PKColumnName="ModelVariantID"
                                modalElementList={AddModelVariantColumnList}
                                modifyModalElementList={ModifyModelVariantColumnList}
                                modalMLObjectDefinition={ModalModelVariantMLObjectDefinition}
                                onInsertClick={this.openVariant}
                                onhandleEditClick={this.openVariant}
                                onDeleteClick_Customize={this.handleDeleteModelVariant}
                                onValueChangeInputGrid={this.valueChangeInputGrid}
                                colspan="12"
                                RowsPerPage={10}
                                isHideHeaderToolbar={false}
                                isShowFooterToolbar={false}
                                IsAutoPaging={true}
                                IsShowRowNull={true}
                            />
                        </TabPage>
                    </TabContainer>
                </React.Fragment>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
        );
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
