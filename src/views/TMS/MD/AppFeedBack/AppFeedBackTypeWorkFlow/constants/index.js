export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/AppFeedBackType_WorkFlow/Add";
export const UpdateAPIPath = "api/AppFeedBackType_WorkFlow/Update";
export const DeleteAPIPath = "api/AppFeedBackType_WorkFlow/Delete";
export const MTabList = [
    {
        Name: "AppFeedBackTypeWorkFlow",
        DefaultValue: "",
        BindControlName: "AppFeedBackTypeWorkFlow",
        DataSourceMember: "AppFeedBackTypeWorkFlow"
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
        Name: "AppFeedBackStepID",
        DefaultValue: "",
        BindControlName: "AppFeedBackStepID",
        DataSourceMember: "AppFeedBackStepID",
        Label: "tên bước xử lý",
        ValidationList: ["Comborequired"]
    },
    // {
    //     Name: "AppFeedBackStepName",
    //     DefaultValue: "",
    //     BindControlName: "AppFeedBackStepName",
    //     DataSourceMember: "AppFeedBackStepName",
    //     Label: "Tên bước xử lý",
    //     ValidationList: ["required"],
    // },
    {
        Name: "AutoChangetoStatusID",
        DefaultValue: "",
        BindControlName: "AutoChangetoStatusID",
        DataSourceMember: "AutoChangetoStatusID",
        Label: "tự động chuyển sang trạng thái phản hồi",
        ValidationList: []
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
    // {
    //     Name: "IsBeginDeliveryStep",
    //     DefaultValue: "",
    //     BindControlName: "IsBeginDeliveryStep",
    //     DataSourceMember: "IsBeginDeliveryStep"
    // },
    // {
    //     Name: "IsCompletedDeliveryStep",
    //     DefaultValue: "",
    //     BindControlName: "IsCompletedDeliveryStep",
    //     DataSourceMember: "IsCompletedDeliveryStep"
    // },
    // {
    //     Name: "IsNotifyToPartnerSystem",
    //     DefaultValue: "",
    //     BindControlName: "IsNotifyToPartnerSystem",
    //     DataSourceMember: "IsNotifyToPartnerSystem"
    // },
    // {
    //     Name: "IsCancelDeliveryStep",
    //     DefaultValue: "",
    //     BindControlName: "IsCancelDeliveryStep",
    //     DataSourceMember: "IsCancelDeliveryStep"
    // },
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
        Name: "IsCanUpdateSolution",
        DefaultValue: "",
        BindControlName: "IsCanUpdateSolution",
        DataSourceMember: "IsCanUpdateSolution"
    },
    {
        Name: "IsCanUpdateProcessQuality",
        DefaultValue: "",
        BindControlName: "IsCanUpdateProcessQuality",
        DataSourceMember: "IsCanUpdateProcessQuality"
    },
    // {
    //     Name: "IsArrivalReceiverLocationStep",
    //     DefaultValue: "",
    //     BindControlName: "IsArrivalReceiverLocationStep",
    //     DataSourceMember: "IsArrivalReceiverLocationStep"
    // },
    // {
    //     Name: "IsMustCompleteCollection",
    //     DefaultValue: "",
    //     BindControlName: "IsMustCompleteCollection",
    //     DataSourceMember: "IsMustCompleteCollection"
    // },
    // {
    //     Name: "IsOutputSaleMaterialStep",
    //     DefaultValue: "",
    //     BindControlName: "IsOutputSaleMaterialStep",
    //     DataSourceMember: "IsOutputSaleMaterialStep"
    // },
    // {
    //     Name: "IsShowMaterialList",
    //     DefaultValue: "",
    //     BindControlName: "IsShowMaterialList",
    //     DataSourceMember: "IsShowMaterialList"
    // },
    // {
    //     Name: "IsShowCollectionButton",
    //     DefaultValue: "",
    //     BindControlName: "IsShowCollectionButton",
    //     DataSourceMember: "IsShowCollectionButton"
    // },
    // {
    //     Name: "AutoChangeStepType",
    //     DefaultValue: "0",
    //     BindControlName: "AutoChangeStepType",
    //     DataSourceMember: "AutoChangeStepType"
    // },
    // {
    //     Name: "AutoChangeToAppFeedBackStepID",
    //     DefaultValue: "",
    //     BindControlName: "AutoChangeToAppFeedBackStepID",
    //     DataSourceMember: "AutoChangeToAppFeedBackStepID"
    // },
    // {
    //     Name: "IsCanAdvanceMaterialStep",
    //     DefaultValue: "",
    //     BindControlName: "IsCanAdvanceMaterialStep",
    //     DataSourceMember: "IsCanAdvanceMaterialStep"
    // },
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
        Name: "chkSelectNextAppFeedBackStep",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "NextAppFeedBackStep",
        Width: 100
    },
    {
        Name: "NextAppFeedBackStep",
        Type: "text",
        Caption: "Mã bước kế tiếp",
        DataSourceMember: "NextAppFeedBackStep",
        Width: 200
    },
    {
        Name: "NextAppFeedBackStepName",
        Type: "text",
        Caption: "Tên bước kế tiếp",
        DataSourceMember: "NextAppFeedBackStepName",
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
        Name: "AppFeedBackStepID",
        DefaultValue: "",
        BindControlName: "AppFeedBackStepID",
        DataSourceMember: "AppFeedBackStepID"
    },
    {
        Name: "NextAppFeedBackStep",
        DefaultValue: "",
        BindControlName: "NextAppFeedBackStep",
        DataSourceMember: "NextAppFeedBackStep"
    },
    {
        Name: "NextAppFeedBackStepName",
        DefaultValue: "",
        BindControlName: "NextAppFeedBackStepName",
        DataSourceMember: "NextAppFeedBackStepName"
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
