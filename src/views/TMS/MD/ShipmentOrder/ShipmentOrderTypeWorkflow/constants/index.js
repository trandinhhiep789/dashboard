export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/ShipmentOrderTypeWorkFlow/Add";
export const UpdateAPIPath = "api/ShipmentOrderTypeWorkFlow/Update";
export const DeleteAPIPath = "api/ShipmentOrderTypeWorkFlow/Delete";
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
        Name: "ID",
        DefaultValue: "",
        BindControlName: "ID",
        DataSourceMember: "ID"
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
