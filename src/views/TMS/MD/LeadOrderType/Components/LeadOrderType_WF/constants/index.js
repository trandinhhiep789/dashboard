export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadOrderType_WF/Search";
export const LoadAPIPath = "api/LeadOrderType_WF/Load";
export const AddAPIPath = "api/LeadOrderType_WF/Add";
export const UpdateAPIPath = "api/LeadOrderType_WF/Update";
export const DeleteAPIPath = "api/LeadOrderType_WF/Delete";
export const BackLink = "/LeadOrderType_WF";
export const AddLink = "/LeadOrderType_WF/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadOrderTypeID,LeadOrderStepID";

export const MLObjectDefinitionFormContainerLeadOrderType_WF = [
    {
        Name: "LeadOrderType_WF",
        DefaultValue: "",
        BindControlName: "LeadOrderType_WF",
        DataSourceMember: "LeadOrderType_WF"
    },
    {
        Name: "LeadOrderType_WF_Next",
        DefaultValue: "",
        BindControlName: "LeadOrderType_WF_Next",
        DataSourceMember: "LeadOrderType_WF_Next"
    }
]

export const MLObjectDefinitionLeadOrderType_WF = [
    {
        Name: "LeadOrderTypeID",
        DataSourceMember: "LeadOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbLeadOrderTypeID",
    },
    {
        Name: "LeadOrderStepID",
        DataSourceMember: "LeadOrderStepID",
        DefaultValue: "",
        BindControlName: "cbLeadOrderStepID",
    },
    {
        Name: "AutoChangeToStepID",
        DataSourceMember: "AutoChangeToStepID",
        DefaultValue: "0",
        BindControlName: "cbAutoChangeToStepID",
    },
    {
        Name: "AutoChangeToStatusID",
        DataSourceMember: "AutoChangeToStatusID",
        DefaultValue: "",
        BindControlName: "chkAutoChangeToStatusID",
    },
    {
        Name: "AutoChangeStepType",
        DataSourceMember: "AutoChangeStepType",
        DefaultValue: "",
        BindControlName: "chkAutoChangeStepType",
    },
    {
        Name: "IsInitStep",
        DataSourceMember: "IsInitStep",
        DefaultValue: "",
        BindControlName: "chkIsInitStep"
    },
    {
        Name: "IsFinishStep",
        DataSourceMember: "IsFinishStep",
        DefaultValue: "",
        BindControlName: "chkIsFinishStep"
    },
    {
        Name: "Description",
        DataSourceMember: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription"
    },
    {
        Name: "IsActived",
        DataSourceMember: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived"
    },
    {
        Name: "IsSystem",
        DataSourceMember: "IsSystem",
        DefaultValue: "",
        BindControlName: "chkIsSystem"
    }
]

export const LeadOrderType_WF_NextListColumn = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "LeadOrderTypeID,LeadOrderStepID,LeadOrderNextStepID",
        Width: 60
    },
    {
        Name: "LeadOrderStepID",
        Type: "text",
        Caption: "Mã bước xử lý kế tiêp",
        DataSourceMember: "LeadOrderStepID",
    },
    {
        Name: "LeadOrderStepName",
        Type: "text",
        Caption: "Tên bước xử lý kế tiêp",
        DataSourceMember: "LeadOrderStepName",
    },
    {
        Name: "FuntionName",
        Type: "text",
        Caption: "Quyền thêm",
        DataSourceMember: "FuntionName",
    }
]

export const LeadOrderType_WF_NextMLObjectDefinition = [
    {
        Name: "LeadOrderTypeID",
        DefaultValue: "",
        BindControlName: "LeadOrderTypeID",
        DataSourceMember: "LeadOrderTypeID"
    },
    {
        Name: "LeadOrderStepID",
        DefaultValue: "",
        BindControlName: "LeadOrderStepID",
        DataSourceMember: "LeadOrderStepID"
    },
    {
        Name: "AutoChangeToStatusID",
        DefaultValue: "",
        BindControlName: "AutoChangeToStatusID",
        DataSourceMember: "AutoChangeToStatusID"
    },
    {
        Name: "AutoChangeToStepID",
        DefaultValue: "",
        BindControlName: "AutoChangeToStepID",
        DataSourceMember: "AutoChangeToStepID"
    },
    {
        Name: "AutoChangeStepType",
        DefaultValue: "",
        BindControlName: "AutoChangeStepType",
        DataSourceMember: "AutoChangeStepType"
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
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    // {
    //     Name: "IsAddToWorkingPlan",
    //     DefaultValue: "",
    //     BindControlName: "IsAddToWorkingPlan",
    //     DataSourceMember: "IsAddToWorkingPlan"
    // },
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
    // {
    //     Name: "VehicleRentalRequestStepID",
    //     DefaultValue: "",
    //     BindControlName: "txtVehicleRentalRequestStepID",
    //     DataSourceMember: "VehicleRentalRequestStepID"
    // },
];
