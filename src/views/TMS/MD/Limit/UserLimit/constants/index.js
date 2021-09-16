export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/User_Limit/SearchNew";
export const SearchUserLimitAPIPath = "api/User_Limit/SearchUserLimit";
export const LoadAPIPath = "api/User_Limit/Load";
export const LoadNewAPIPath = "api/User_Limit/LoadNew";
export const AddAPIPath = "api/User_Limit/Add";
export const AddNewAPIPath = "api/User_Limit/AddNew";
export const UpdateAPIPath = "api/User_Limit/Update";
export const UpdateNewAPIPath = "api/User_Limit/UpdateNew";
export const DeleteAPIPath = "api/User_Limit/Delete";
export const DeleteNewAPIPath = "api/User_Limit/DeleteNew";
export const UpdateOrderAPIPath = "api/User_Limit/UpdateOrder";
export const BackLink = "/User_Limit";
export const AddLink = "/User_Limit/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "UserName";
export const GetAllUserLimitAPIPath = "api/User_Limit/GetAllUserLimit";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách giới hạn theo người dùng" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "DepartmentID",
        DefaultValue: "",
        BindControlName: "cbDepartmentID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    }
];

export const InitSearchParams = [
    {
        SearchKey: "@DEPARTMENTID",
        SearchValue: ""
    },
    {
        SearchKey: "@USERNAMELIST",
        SearchValue: ""
    }
];

export const SearchElementList = [

    {
        type: "ComboBox",
        name: "cbDepartmentID",
        DataSourceMember: "DepartmentID",
        label: "Phòng ban:",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.BCNBSYSTEM_DEPARTMENT",
        ValueMember: "DepartmentID",
        NameMember: "DepartmentName",

    },

    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 5,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true

    },


];

export const SearchMLObjectDefinitionNew = [
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbArea"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cbStore"
    },
    {
        Name: "PositionID",
        DefaultValue: "",
        BindControlName: "cbPosition"
    },
    {
        Name: "DepartmentID",
        DefaultValue: "",
        BindControlName: "cbDepartmentID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    }
];

export const InitSearchParamsNew = [
    {
        SearchKey: "@AREAID",
        SearchValue: ""
    },
    {
        SearchKey: "@STOREID",
        SearchValue: ""
    },
    {
        SearchKey: "@DEPARTMENTID",
        SearchValue: ""
    },
    {
        SearchKey: "@POSITIONID",
        SearchValue: ""
    },
    {
        SearchKey: "@USERNAMELIST",
        SearchValue: ""
    }
];

export const SearchElementListNew = [
    {
        type: "ComboBox",
        name: "cbArea",
        DataSourceMember: "AreaID",
        label: "Khu vực:",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName",
        filterrest: "cbStore",

    },

    {
        type: "ComboBoxByCompany",
        name: "cbStore",
        DataSourceMember: "StoreID",
        label: "kho điều phối:",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE_AREA",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        // filterValue: 10,
        // filterobj: "CompanyID",
        filterName: "cbArea",
        filterValue: "",
        filterobj: "AreaID",

    },
    {
        type: "ComboBox",
        name: "cbDepartmentID",
        DataSourceMember: "DepartmentID",
        label: "Phòng ban:",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.BCNBSYSTEM_DEPARTMENT",
        ValueMember: "DepartmentID",
        NameMember: "DepartmentName",

    },
    {
        type: "ComboBox",
        name: "cbPosition",
        DataSourceMember: "PositionID",
        label: "Chức vụ:",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.POSITION",
        ValueMember: "PositionID",
        NameMember: "PositionName",

    },

    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 4,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true

    },


];

export const DefaultMaxLimitAmount = 10000000;
export const DefaultMaxLimitCoil = 15;