export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo chi tiết vận đơn quá hạn" }
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
        type: "MultiTreeSelect",
        IsLabelDiv: true,
        labelcolspan: 10,
        label: 'Trạng thái vận đơn',
        name: "cbShipmentOrderStatusGroupID",
        DataSourceMember: "ShipmentOrderStatusGroupID",
        colspan: 10,
        rowspan: 2,
        value: "1,2,3",
        maxTagCount: 1,
        isMultiSelect: true,
        placeholder: "---Trạng thái---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR",
        ValueMember: "ShipmentOrderStatusGroupID",
        NameMember: "ShipmentOrderStatusGroupName",
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