export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/UserRewardStore/Search";
export const LoadAPIPath = "api/UserRewardStore/Load";
export const AddAPIPath = "api/UserRewardStore/Add";
export const UpdateAPIPath = "api/UserRewardStore/Update";
export const DeleteAPIPath = "api/UserRewardStore/Delete";
export const UpdateOrderAPIPath = "api/UserRewardStore/UpdateOrder";
export const BackLink = "/UserRewardStore";
export const AddLink = "/UserRewardStore/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const GetUserAPIPath = "api/UserRewardStore/GetUserByStoreID";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "UserRewardStoreID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách kho thưởng của nhân viên quản lý" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/UserRewardStore", Title: "Danh sách kho thưởng của nhân viên quản lý" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/UserRewardStore", Title: "Danh sách kho thưởng của nhân viên quản lý" },
    { Link: "", Title: "Thêm" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const AddElementList = [
    {
        type: "select",
        name: "StoreID",
        label: "kho thưởng",
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
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10

    },
    {
        name: "UserName",
        type: "multiselect",
        label: "nhân viên quản lý",
        DataSourceMember: "UserName",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        listoption: [],
        IsAutoLoadItemFromCache: false,
        // LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        // ValueMember: "FunctionID",
        // NameMember: "FunctionName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    {
        type: "date",
        name: "ApplyFromDate",
        label: "ngày áp dụng từ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyFromDate",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ApplyToDate",
        label: "ngày áp dụng đến",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyToDate",
        validatonList: ["required"]
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "select",
        name: "StoreID",
        label: "kho thưởng",
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
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10

    },
    {
        name: "UserName",
        type: "multiselect",
        label: "nhân viên quản lý",
        DataSourceMember: "UserName",
        readonly: false,
        value: null,
        validatonList: ["Comborequired"],
        isMulti: false,
        listoption: [],
        IsAutoLoadItemFromCache: false,
        // LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        // ValueMember: "FunctionID",
        // NameMember: "FunctionName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    {
        type: "date",
        name: "ApplyFromDate",
        label: "ngày áp dụng từ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyFromDateString",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ApplyToDate",
        label: "ngày áp dụng đến",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyToDateString",
        validatonList: ["required"]
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: 0,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsSystem",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "UserRewardStoreID",
        DefaultValue: "",
        BindControlName: "UserRewardStoreID",
        DataSourceMember: "UserRewardStoreID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "StoreID",
        DataSourceMember: "StoreID"
    },
    {
        Name: "ApplyFromDate",
        DefaultValue: "",
        BindControlName: "ApplyFromDate",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "ApplyToDate",
        DefaultValue: "",
        BindControlName: "ApplyToDate",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "ApplyFromDateString",
        DefaultValue: "",
        BindControlName: "ApplyFromDateString",
        DataSourceMember: "ApplyFromDateString"
    },
    {
        Name: "ApplyToDateString",
        DefaultValue: "",
        BindControlName: "ApplyToDateString",
        DataSourceMember: "ApplyToDateString"
    },
    {
        Name: "FullName",
        DefaultValue: "",
        BindControlName: "FullName",
        DataSourceMember: "FullName"
    },
    {
        Name: "StoreName",
        DefaultValue: "",
        BindControlName: "StoreName",
        DataSourceMember: "StoreName"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UserRewardStoreID",
        Width: 60
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho thưởng",
        DataSourceMember: "StoreName",
        Width: 200
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên quản lý",
        DataSourceMember: "FullName",
        Width: 200
    },
    {
        Name: "ApplyFromDateString",
        Type: "text",
        Caption: "Ngày áp dụng từ",
        DataSourceMember: "ApplyFromDateString",
        Width: 200
    },
    {
        Name: "ApplyToDateString",
        Type: "text",
        Caption: "Ngày áp dụng đến",
        DataSourceMember: "ApplyToDateString",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "UserRewardStoreID",
        Width: 100,
        Link: "/UserRewardStore/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
