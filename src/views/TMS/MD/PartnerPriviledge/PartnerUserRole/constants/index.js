export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/PartnerUserRole/Add";
export const IDSelectColumnName = "chkSelect";
export const SearchPartnerRoleAPIPath = "api/PartnerRole/Search2";
// export const UpdateAPIPath = "api/MaterialGroup_Product/Update";
// export const DeleteAPIPath = "api/MaterialGroup_Product/Delete";


export const GridMLPartnerRoleDefinition = [
    {
        Name: "PartnerRoleID",
        DefaultValue: "",
        BindControlName: "PartnerRoleID",
        DataSourceMember: "PartnerRoleID"
    },
    {
        Name: "PartnerRoleName",
        DefaultValue: "",
        BindControlName: "PartnerRoleName",
        DataSourceMember: "PartnerRoleName"
    }
];

export const InputPartnerRoleColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "PartnerRoleID",
        Width: 70
    },
    {
        Name: "PartnerRoleID",
        Type: "text",
        Caption: "Mã vai trò",
        DataSourceMember: "PartnerRoleID",
        Width: 150
    },
    {
        Name: "PartnerRoleName",
        Type: "text",
        Caption: "Tên vai trò",
        DataSourceMember: "PartnerRoleName",
        Width: 700
    }
];


export const SearchMLmoldeDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const SearchElementModeList = [
    {
        type: "textType",
        name: "txtKeyword",
        label: "",
        value: "",
        placeholder: "Từ khóa ",
        icon: "",
        listoption: {}
    }
];

export const InitSearchParamsModeList = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const DataGridColumnListMultiple = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerRoleID",
        Width: 70
    },
    {
        Name: "PartnerRoleID",
        Type: "text",
        Caption: "Mã vai trò",
        DataSourceMember: "PartnerRoleID",
        Width: 150
    },
    {
        Name: "PartnerRoleName",
        Type: "text",
        Caption: "Tên vai trò",
        DataSourceMember: "PartnerRoleName",
        Width: 700
    }

];

