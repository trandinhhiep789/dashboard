export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/ShipmentOrderTypeWorkFlow/Add";
export const UpdateAPIPath = "api/ShipmentOrderTypeWorkFlow/Update";
export const DeleteAPIPath = "api/ShipmentOrderTypeWorkFlow/Delete";

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const MTabList = [
    {
        Name: "PieRequestTypeWorkflow",
        DefaultValue: "",
        BindControlName: "PieRequestTypeWorkflow",
        DataSourceMember: "PieRequestTypeWorkflow"
    },
    {
        Name: "PieRequestType_WF_Permis",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Permis",
        DataSourceMember: "PieRequestType_WF_Permis"
    }
    ,
    {
        Name: "PieRequestType_WF_Next",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Next",
        DataSourceMember: "PieRequestType_WF_Next"
    }
]

export const MLObjectDefinition = [
    // {
    //     Name: "ShipmentOrder",
    //     DefaultValue: "",
    //     BindControlName: "ShipmentOrder",
    //     DataSourceMember: "ShipmentOrder",
    //     Label: "tên bước xử lý",
    //     ValidationList: ["required"]
    // },
    {
        Name: "ShipmentOrderStepID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepID",
        DataSourceMember: "ShipmentOrderStepID",
        Label: "tên bước xử lý",
        ValidationList: ["Comborequired"]
    },
    // {
    //     Name: "ShipmentOrderStepName",
    //     DefaultValue: "",
    //     BindControlName: "ShipmentOrderStepName",
    //     DataSourceMember: "ShipmentOrderStepName",
    //     Label: "Tên bước xử lý",
    //     ValidationList: ["required"],
    // },
    {
        Name: "AutoChangeToShipmentOrderStatusID",
        DefaultValue: "",
        BindControlName: "AutoChangeToShipmentOrderStatusID",
        DataSourceMember: "AutoChangeToShipmentOrderStatusID",
        Label: "tự động chuyển sang trạng thái yêu cầu vận chuyển",
        ValidationList: ["Comborequired"]
    },
    {
        Name: "StepColorCode",
        DefaultValue: "",
        BindControlName: "StepColorCode",
        DataSourceMember: "StepColorCode"
    },
    {
        Name: "StepCompletePercent",
        DefaultValue: "",
        BindControlName: "StepCompletePercent",
        DataSourceMember: "StepCompletePercent"
    },
    // {
    //     Name: "MaxProcessTime",
    //     DefaultValue: "",
    //     BindControlName: "MaxProcessTime",
    //     DataSourceMember: "MaxProcessTime"
    // },
    {
        Name: "MaxProcessTimeDay",
        DefaultValue: "",
        BindControlName: "MaxProcessTimeDay",
        DataSourceMember: "MaxProcessTimeDay",
        Label: "Thời gian xử lý tối đa của bước(ngày)",
        //ValidationList: ["required"]
    },
    {
        Name: "MaxProcessTimeHour",
        DefaultValue: "",
        BindControlName: "MaxProcessTimeHour",
        DataSourceMember: "MaxProcessTimeHour",
        Label: "Thời gian xử lý tối đa của bước(giờ)",
        //ValidationList: ["required"]
    },
    {
        Name: "MaxProcessTimeMinute",
        DefaultValue: "",
        BindControlName: "MaxProcessTimeMinute",
        DataSourceMember: "MaxProcessTimeMinute",
        Label: "Thời gian xử lý tối đa của bước(phút)",
        //ValidationList: ["required"]
    },
    {
        Name: "IsInitStep",
        DefaultValue: "",
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep"
    },
    {
        Name: "IsFinishStep",
        DefaultValue: "",
        BindControlName: "IsFinishStep",
        DataSourceMember: "IsFinishStep"
    },
    {
        Name: "IsMustChooseProcessUser",
        DefaultValue: "",
        BindControlName: "IsMustChooseProcessUser",
        DataSourceMember: "IsMustChooseProcessUser"
    },
    {
        Name: "IsSentEmail",
        DefaultValue: "",
        BindControlName: "IsSentEmail",
        DataSourceMember: "IsSentEmail"
    },
    {
        Name: "IsSentSMS",
        DefaultValue: "",
        BindControlName: "IsSentSMS",
        DataSourceMember: "IsSentSMS"
    },
    {
        Name: "IsBeginDeliveryStep",
        DefaultValue: "",
        BindControlName: "IsBeginDeliveryStep",
        DataSourceMember: "IsBeginDeliveryStep"
    },
    {
        Name: "IsCompletedDeliveryStep",
        DefaultValue: "",
        BindControlName: "IsCompletedDeliveryStep",
        DataSourceMember: "IsCompletedDeliveryStep"
    },
    {
        Name: "IsNotifyToPartnerSystem",
        DefaultValue: "",
        BindControlName: "IsNotifyToPartnerSystem",
        DataSourceMember: "IsNotifyToPartnerSystem"
    },
    {
        Name: "IsCancelDeliveryStep",
        DefaultValue: "",
        BindControlName: "IsCancelDeliveryStep",
        DataSourceMember: "IsCancelDeliveryStep"
    },
    {
        Name: "SMSTemplate",
        DefaultValue: "",
        BindControlName: "SMSTemplate",
        DataSourceMember: "SMSTemplate"
    },
    {
        Name: "EmailTitle",
        DefaultValue: "",
        BindControlName: "EmailTitle",
        DataSourceMember: "EmailTitle"
    },
    {
        Name: "EmailTemplate",
        DefaultValue: "",
        BindControlName: "EmailTemplate",
        DataSourceMember: "EmailTemplate"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "IsOnlyShowOnHasCollection",
        DefaultValue: "",
        BindControlName: "IsOnlyShowOnHasCollection",
        DataSourceMember: "IsOnlyShowOnHasCollection"
    },
    {
        Name: "IsPaidInStep",
        DefaultValue: "",
        BindControlName: "IsPaidInStep",
        DataSourceMember: "IsPaidInStep"
    },
    {
        Name: "IsArrivalReceiverLocationStep",
        DefaultValue: "",
        BindControlName: "IsArrivalReceiverLocationStep",
        DataSourceMember: "IsArrivalReceiverLocationStep"
    },
    {
        Name: "IsMustCompleteCollection",
        DefaultValue: "",
        BindControlName: "IsMustCompleteCollection",
        DataSourceMember: "IsMustCompleteCollection"
    },
    {
        Name: "IsOutputSaleMaterialStep",
        DefaultValue: "",
        BindControlName: "IsOutputSaleMaterialStep",
        DataSourceMember: "IsOutputSaleMaterialStep"
    },
    {
        Name: "IsShowMaterialList",
        DefaultValue: "",
        BindControlName: "IsShowMaterialList",
        DataSourceMember: "IsShowMaterialList"
    },
    {
        Name: "IsShowCollectionButton",
        DefaultValue: "",
        BindControlName: "IsShowCollectionButton",
        DataSourceMember: "IsShowCollectionButton"
    },
    {
        Name: "AutoChangeStepType",
        DefaultValue: "0",
        BindControlName: "AutoChangeStepType",
        DataSourceMember: "AutoChangeStepType"
    },
    {
        Name: "AutoChangeToShipmentOrderStepID",
        DefaultValue: "",
        BindControlName: "AutoChangeToShipmentOrderStepID",
        DataSourceMember: "AutoChangeToShipmentOrderStepID"
    },
    {
        Name: "IsCanAdvanceMaterialStep",
        DefaultValue: "",
        BindControlName: "IsCanAdvanceMaterialStep",
        DataSourceMember: "IsCanAdvanceMaterialStep"
    },
    {
        Name: "IsSetupStep",
        DefaultValue: "",
        BindControlName: "IsSetupStep",
        DataSourceMember: "IsSetupStep"
    },
    {
        Name: "ShipmentSetupTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentSetupTypeID",
        DataSourceMember: "ShipmentSetupTypeID",
        // Label: "loại lắp đặt",
        // ValidationList: ["Comborequired"]
    },
    {
        Name: "IsCanUpdateReturnItemStep",
        DefaultValue: "",
        BindControlName: "IsCanUpdateReturnItemStep",
        DataSourceMember: "IsCanUpdateReturnItemStep"
    },
    {
        Name: "IsPhotoTakenStep",
        DefaultValue: "",
        BindControlName: "IsPhotoTakenStep",
        DataSourceMember: "IsPhotoTakenStep"
    },
    {
        Name: "IsMustProcessByDeliveryUser",
        DefaultValue: "",
        BindControlName: "IsMustProcessByDeliveryUser",
        DataSourceMember: "IsMustProcessByDeliveryUser"
    },
    {
        Name: "IsCheckMustOutputGoods",
        DefaultValue: "",
        BindControlName: "IsCheckMustOutputGoods",
        DataSourceMember: "IsCheckMustOutputGoods"
    },
    {
        Name: "IsCheckMustHandOverGoods",
        DefaultValue: "",
        BindControlName: "IsCheckMustHandOverGoods",
        DataSourceMember: "IsCheckMustHandOverGoods"
    },
    {
        Name: "IsCanHandoverToReceiver",
        DefaultValue: "",
        BindControlName: "IsCanHandoverToReceiver",
        DataSourceMember: "IsCanHandoverToReceiver"
    },
    {
        Name: "IsCheckMustHandoverToReceiver",
        DefaultValue: "",
        BindControlName: "IsCheckMustHandoverToReceiver",
        DataSourceMember: "IsCheckMustHandoverToReceiver"
    },
    {
        Name: "IsSendSMSToCustomer",
        DefaultValue: "",
        BindControlName: "IsSendSMSToCustomer",
        DataSourceMember: "IsSendSMSToCustomer"
    },
    {
        Name: "SendToCustomerSMSTemplateID",
        DefaultValue: "",
        BindControlName: "SendToCustomerSMSTemplateID",
        DataSourceMember: "SendToCustomerSMSTemplateID"
    },
    {
        Name: "IsShowPurchaseList",
        DefaultValue: "",
        BindControlName: "IsShowPurchaseList",
        DataSourceMember: "IsShowPurchaseList"
    },
    {
        Name: "IsCanUpdateBeginDoService",
        DefaultValue: "",
        BindControlName: "IsCanUpdateBeginDoService",
        DataSourceMember: "IsCanUpdateBeginDoService"
    },
    {
        Name: "IsCanUpdateCompleteDoService",
        DefaultValue: "",
        BindControlName: "IsCanUpdateCompleteDoService",
        DataSourceMember: "IsCanUpdateCompleteDoService"
    },
    {
        Name: "IsCheckReceiverGeoLocationStep",
        DefaultValue: "",
        BindControlName: "IsCheckReceiverGeoLocationStep",
        DataSourceMember: "IsCheckReceiverGeoLocationStep"
    },
    {
        Name: "IsShowToPartner",
        DefaultValue: "",
        BindControlName: "IsShowToPartner",
        DataSourceMember: "IsShowToPartner"
    },
    {
        Name: "IsShowToCustomer",
        DefaultValue: "",
        BindControlName: "IsShowToCustomer",
        DataSourceMember: "IsShowToCustomer"
    },
    {
        Name: "IsCreateMTReturnRequest",
        DefaultValue: "",
        BindControlName: "IsCreateMTReturnRequest",
        DataSourceMember: "IsCreateMTReturnRequest"
    },
    {
        Name: "IsCreateMaterialReturnStep",
        DefaultValue: "",
        BindControlName: "IsCreateMaterialReturnStep",
        DataSourceMember: "IsCreateMaterialReturnStep"
    },
    {
        Name: "IsUpdateSymptom",
        DefaultValue: "",
        BindControlName: "IsUpdateSymptom",
        DataSourceMember: "IsUpdateSymptom"
    },
    {
        Name: "AutoCallOutputGoods",
        DefaultValue: "",
        BindControlName: "AutoCallOutputGoods",
        DataSourceMember: "AutoCallOutputGoods"
    },
    {
        Name: "WebAppHelpDocumentID",
        DefaultValue: "",
        BindControlName: "WebAppHelpDocumentID",
        DataSourceMember: "WebAppHelpDocumentID"
    },
    {
        Name: "MobiAppHelpDocumentID",
        DefaultValue: "",
        BindControlName: "MobiAppHelpDocumentID",
        DataSourceMember: "MobiAppHelpDocumentID"
    },
    {
        Name: "WebAppHelpDocumentName",
        DefaultValue: "",
        BindControlName: "WebAppHelpDocumentName",
        DataSourceMember: "WebAppHelpDocumentName"
    },
    {
        Name: "MobiAppHelpDocumentName",
        DefaultValue: "",
        BindControlName: "MobiAppHelpDocumentName",
        DataSourceMember: "MobiAppHelpDocumentName"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser",
    }
];

export const MLShipmentOrderType_WF_Permis = [
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "FullName",
        DefaultValue: "",
        BindControlName: "FullName",
        DataSourceMember: "FullName"
    },
    {
        Name: "ShipmentOrderType_WF_Permis",
        DefaultValue: "",
        BindControlName: "ShipmentOrderType_WF_Permis",
        DataSourceMember: "ShipmentOrderType_WF_Permis"
    }
];

export const InputNextColumnList = [
    {
        Name: "chkSelectNextShipmentOrderStep",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "NextShipmentOrderStep",
        Width: 100
    },
    {
        Name: "NextShipmentOrderStep",
        Type: "text",
        Caption: "Mã bước kế tiếp",
        DataSourceMember: "NextShipmentOrderStep",
        Width: 200
    },
    {
        Name: "NextShipmentOrderStepName",
        Type: "text",
        Caption: "Tên bước kế tiếp",
        DataSourceMember: "NextShipmentOrderStepName",
        Width: 200
    },
    // {
    //     Name: "ChooseFunctionID",
    //     Type: "text",
    //     Caption: "Quyền chuyển bước",
    //     DataSourceMember: "ChooseFunctionID",
    //     Width: 200
    // },
    {
        Name: "ChooseFunctionName",
        Type: "text",
        Caption: "Quyền chuyển bước",
        DataSourceMember: "ChooseFunctionName",
        Width: 200
    }
];

export const GridMLObjectModelPermission = [
    {
        Name: "chkSelectUserGroupID",
        DefaultValue: "",
        BindControlName: "chkSelectUserGroupID",
        DataSourceMember: "UserGroupID"
    },
    {
        Name: "UserGroupID",
        DefaultValue: "",
        BindControlName: "UserGroupID",
        DataSourceMember: "UserGroupID"
    },
    {
        Name: "UserGroupName",
        DefaultValue: "",
        BindControlName: "UserGroupName",
        DataSourceMember: "UserGroupName"
    },
    {
        Name: "EditPermission",
        DefaultValue: "",
        BindControlName: "EditPermission",
        DataSourceMember: "EditPermission"
    },
    {
        Name: "RemovePermission",
        DefaultValue: "",
        BindControlName: "RemovePermission",
        DataSourceMember: "RemovePermission"
    },
    {
        Name: "ChangePermission",
        DefaultValue: "",
        BindControlName: "ChangePermission",
        DataSourceMember: "ChangePermission"
    }
];

export const GridMLObjectModelNext = [
    {
        Name: "ShipmentOrderStepID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepID",
        DataSourceMember: "ShipmentOrderStepID"
    },
    {
        Name: "NextShipmentOrderStep",
        DefaultValue: "",
        BindControlName: "NextShipmentOrderStep",
        DataSourceMember: "NextShipmentOrderStep"
    },
    {
        Name: "NextShipmentOrderStepName",
        DefaultValue: "",
        BindControlName: "NextShipmentOrderStepName",
        DataSourceMember: "NextShipmentOrderStepName"
    },
    {
        Name: "ChooseFunctionID",
        DefaultValue: "",
        BindControlName: "ChooseFunctionID",
        DataSourceMember: "ChooseFunctionID"
    },
    {
        Name: "ChooseFunctionName",
        DefaultValue: "",
        BindControlName: "ChooseFunctionName",
        DataSourceMember: "ChooseFunctionName"
    }
];

export const SearchDocMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "DocumentTypeID",
        DefaultValue: "",
        BindControlName: "cbDocumentTypeID"
    },
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    },

];

export const SearchDocElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ khóa",
        value: "",
        colspan: 2,
        placeholder: "Từ khóa",
        icon: ""
    },
    {
        type: "ComboBox",
        name: "cbDocumentTypeID",
        DataSourceMember: "DocumentTypeID",
        label: "Loại tài liệu",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DOCUMENTTYPE",
        ValueMember: "DocumentTypeID",
        NameMember: "DocumentTypeName",

    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    }
];

export const InitSearchDocParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@DOCUMENTTYPEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1
    }
];

export const listColumnDoc = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "DocumentID",
        Width: 60
    },
    {
        Name: "DocumentID",
        Type: "text",
        Caption: "Mã tài liệu",
        DataSourceMember: "DocumentID",
        Width: 70
    },
    {
        Name: "DocumentName",
        Type: "texttolinkNewBlank",
        Caption: "Tên tài liệu",
        DataSourceMember: "DocumentName",
        Link: "/Documents/Detail/",
        Width: 150
    },
    {
        Name: "DocumentFolderName",
        Type: "text",
        Caption: "Danh mục",
        DataSourceMember: "DocumentFolderName",
        Width: 150
    },
    {
        Name: "IsPublished",
        Type: "checkicon",
        Caption: "Công bố",
        DataSourceMember: "IsPublished",
        Width: 80
    },
    {
        Name: "PublishedDate",
        Type: "datetime",
        Caption: "Ngày xuất bản",
        DataSourceMember: "PublishedDate",
        Width: 100
    },
    {
        Name: "DocumentTypeName",
        Type: "text",
        Caption: "Loại tài liệu",
        DataSourceMember: "DocumentTypeName",
        Width: 130
    },
    {
        Name: "FileName",
        Type: "text",
        Caption: "Tập tin",
        DataSourceMember: "FileName",
        Width: 130
    },
    {
        Name: "ExtendLable",
        Type: "text",
        Caption: "Thông tin tài liệu",
        DataSourceMember: "ExtendLable",
        Width: 120
    },
    {
        Name: "ModifyDate",
        Type: "datetime",
        Caption: "Cập nhật lần cuối",
        DataSourceMember: "ModifyDate",
        Width: 100
    }
];