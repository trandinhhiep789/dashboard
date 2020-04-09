export const APIHostName = "PIMAPI";
export const AddAPIPath = "api/PieRequestType_WorkFlow/Add";
export const UpdateAPIPath = "api/PieRequestType_WorkFlow/Update";
export const DeleteAPIPath = "api/PieRequestType_WorkFlow/Delete";
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
    {
        Name: "PieRequestStepID",
        DefaultValue: "",
        BindControlName: "PieRequestStepID",
        DataSourceMember: "PieRequestStepID"
    },
    {
        Name: "PieRequestTypeID",
        DefaultValue: "",
        BindControlName: "PieRequestTypeID",
        DataSourceMember: "PieRequestTypeID",
    },
    {
        Name: "PieRequestStepName",
        DefaultValue: "",
        BindControlName: "PieRequestStepName",
        DataSourceMember: "PieRequestStepName",
        Label: "Tên bước xử lý",
        ValidationList: ["required"],
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
    //     DataSourceMember: "MaxProcessTime",
    //     Label: "Thời gian xử lý tối đa của bước(phút)",
    //     ValidationList: ["required"]
    // },
    // {
    //     Name: "MaxProcessTimeDay",
    //     DefaultValue: "",
    //     BindControlName: "MaxProcessTime",
    //     DataSourceMember: "MaxProcessTime",
    //     Label: "",
    //     ValidationList: []
    // },
    {
        Name: "MaxProcessTimeDay",
        DefaultValue: "",
        BindControlName: "MaxProcessTimeDay",
        DataSourceMember: "MaxProcessTimeDay",
        Label: "Thời gian xử lý tối đa của bước(ngày)",
        ValidationList: ["required"]
    },
    {
        Name: "MaxProcessTimeHour",
        DefaultValue: "",
        BindControlName: "MaxProcessTimeHour",
        DataSourceMember: "MaxProcessTimeHour",
        Label: "Thời gian xử lý tối đa của bước(giờ)",
        ValidationList: ["required"]
    },
    {
        Name: "MaxProcessTimeMinute",
        DefaultValue: "",
        BindControlName: "MaxProcessTimeMinute",
        DataSourceMember: "MaxProcessTimeMinute",
        Label: "Thời gian xử lý tối đa của bước(phút)",
        ValidationList: ["required"]
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex",
    },
    {
        Name: "IsInitStep",
        DefaultValue: "",
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep",
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
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived",
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem",
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser",
    }
];

export const MLPieRequestType_WF_Permis = [
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
        Name: "PieRequestType_WF_Permis",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Permis",
        DataSourceMember: "PieRequestType_WF_Permis"
    }
];

export const InputNextColumnList = [
    {
        Name: "chkSelectNextPieRequestStepID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "NextPieRequestStepID",
        Width: 100
    },
    {
        Name: "NextPieRequestStepID",
        Type: "text",
        Caption: "Mã bước kế tiếp",
        DataSourceMember: "NextPieRequestStepID",
        Width: 200
    },
    {
        Name: "NextPieRequestStepName",
        Type: "text",
        Caption: "Tên bước kế tiếp",
        DataSourceMember: "NextPieRequestStepName",
        Width: 200
    },
    {
        Name: "ChooseFunctionID",
        Type: "text",
        Caption: "Quyền chuyển bước",
        DataSourceMember: "ChooseFunctionID",
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
        Name: "PieRequestStepID",
        DefaultValue: "",
        BindControlName: "PieRequestStepID",
        DataSourceMember: "PieRequestStepID"
    },
    {
        Name: "NextPieRequestStepID",
        DefaultValue: "",
        BindControlName: "NextPieRequestStepID",
        DataSourceMember: "NextPieRequestStepID"
    },
    {
        Name: "NextPieRequestStepName",
        DefaultValue: "",
        BindControlName: "NextPieRequestStepName",
        DataSourceMember: "NextPieRequestStepName"
    },
    {
        Name: "ChooseFunctionID",
        DefaultValue: "",
        BindControlName: "ChooseFunctionID",
        DataSourceMember: "ChooseFunctionID"
    }
];
