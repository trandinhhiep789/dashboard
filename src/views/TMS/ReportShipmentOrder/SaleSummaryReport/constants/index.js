export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo đơn hàng" }
];

export const SearchAPIPath = "api/...";

export const SearchElementList = [
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "cbStartDate",
        DataSourceMember: "StartDate",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        label: "Đến ngày",
        name: "cbEndDate",
        DataSourceMember: "EndDate",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        label: "Nhóm kho",
        name: "cbStore",
        DataSourceMember: "Store",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Kho điều phối---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterValue: 10,
        filterobj: "CompanyID",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbAreaID",
        DataSourceMember: "AreaID",
        label: "Khu vực",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREA",
        ValueMember: "AreaID",
        NameMember: "AreaName"
    },
    {
        type: "MultiSelectUser",
        name: "cbUser",
        DataSourceMember: "User",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 3,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Chọn nhân viên---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true,
        IsPermission: false,
        // PermissionKey:
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "StartDate",
        DefaultValue: "",
        BindControlName: "cbStartDate"
    },
    {
        Name: "EndDate",
        DefaultValue: "",
        BindControlName: "cbEndDate"
    },
    {
        Name: "Store",
        DefaultValue: "",
        BindControlName: "cbStore"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbAreaID"
    },
    {
        Name: "User",
        DefaultValue: "",
        BindControlName: "cbUser"
    }
];