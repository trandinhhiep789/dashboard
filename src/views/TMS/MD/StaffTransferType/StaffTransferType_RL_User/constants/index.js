export const APIHostName = "TMSAPI";
export const GetUserAPIPath = "api/StaffTransferType_rl_User/GetUserByStoreID";
export const APIAdd = "api/StaffTransferType_rl_User/Add";

export const BackLink = "/StaffTransferType";

export const listColumn = [
    {
        Name: "chkSelectCSID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "CSID",
        Width: 60
    },
    {
        Name: "ReviewLevelName",
        Type: "text",
        Caption: "Mức duyệt",
        DataSourceMember: "ReviewLevelName",
        Width: 500
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho duyệt",
        DataSourceMember: "StoreName",
        Width: 500
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Người duyệt",
        DataSourceMember: "FullName",
        Width: 500
    }
];

export const modalElementList = [
    {
        type: "select",
        Name: "ReviewLevelID",
        label: "mức duyệt",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ReviewLevelID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: false
    },
    {
        type: "select",
        Name: "StoreID",
        label: "kho duyệt",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
    },
    {
        type: "multiselect",
        Name: "UserName",
        label: "cấp bậc kỹ năng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "UserName",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: false
    },
];

export const MLObjectDefinition = [
    {
        Name: "CSID",
        DefaultValue: "",
        BindControlName: "CSID",
        DataSourceMember: "CSID"
    },
    {
        Name: "ReviewLevelID",
        DefaultValue: "",
        BindControlName: "ReviewLevelID",
        DataSourceMember: "ReviewLevelID"
    },
    {
        Name: "ReviewLevelName",
        DefaultValue: "",
        BindControlName: "ReviewLevelName",
        DataSourceMember: "ReviewLevelName"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "StoreID",
        DataSourceMember: "StoreID"
    },
    {
        Name: "StoreName",
        DefaultValue: "",
        BindControlName: "StoreName",
        DataSourceMember: "StoreName"
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
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];