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


export const LoadListInfo_WF_Next_APIPath = "api/LeadOrderTypeWFNext/LoadList";


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
        BindControlName: "",
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
        BindControlName: "cbAutoChangeToStatusID",
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
    // {
    //     Name: "Description",
    //     DataSourceMember: "Description",
    //     DefaultValue: "",
    //     BindControlName: "txtDescription"
    // },
    {
        Name: "IsActived",
        DataSourceMember: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived"
    },
    // {
    //     Name: "IsSystem",
    //     DataSourceMember: "IsSystem",
    //     DefaultValue: "",
    //     BindControlName: "chkIsSystem"
    // }
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
        Name: "LeadOrderNextStepID",
        Type: "text",
        Caption: "Mã bước xử lý kế tiêp",
        DataSourceMember: "LeadOrderNextStepID",
    },
    {
        Name: "LeadOrderNextStepName",
        Type: "text",
        Caption: "Tên bước xử lý kế tiêp",
        DataSourceMember: "LeadOrderNextStepName",
    },
    {
        Name: "ChooseFunctionName",
        Type: "text",
        Caption: "Quyền thêm",
        DataSourceMember: "ChooseFunctionName",
    }
]

export const LeadOrderType_WF_NextMLObjectDefinition = [
    {
        Name: "LeadOrderStepID",
        DefaultValue: "",
        BindControlName: "LeadOrderStepID",
        DataSourceMember: "LeadOrderStepID"
    },
    {
        Name: "LeadOrderNextStepID",
        DefaultValue: "",
        BindControlName: "LeadOrderNextStepID",
        DataSourceMember: "LeadOrderNextStepID"
    },
    {
        Name: "ChooseFunctionID",
        DefaultValue: "",
        BindControlName: "ChooseFunctionID",
        DataSourceMember: "ChooseFunctionID"
    },
];


