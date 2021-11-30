import {
    ERPCOMMONCACHE_AREATT,
    ERPCOMMONCACHE_SHIPMENTORDERTYPE,
    ERPCOMMONCACHE_STORE_AREA,
} from '../../../../../constants/keyCache';

export const APIHostName = "TMSAPI";
export const APISearchPath = "api/ShipmentOrder_Symptom/Report";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo lỗi thực tế" }
];

export const listelement = [
    {
        type: "Datetime",
        name: "dtFromDate",
        colspan: 2,
        DataSourceMember: "FromDate",
        dateFormat: "DD/MM/YYYY",
        label: "Từ ngày (Ngày hẹn giao)",
        placeholder: "Từ ngày",
        timeFormat: false,
        value: new Date()
    },
    {
        type: "Datetime",
        name: "dtToDate",
        colspan: 2,
        DataSourceMember: "ToDate",
        dateFormat: "DD/MM/YYYY",
        label: "Đến ngày (Ngày hẹn giao)",
        placeholder: "Đến ngày",
        timeFormat: false,
        value: new Date()
    },
    {
        type: "ComboBox",
        name: "cbAreaID",
        colspan: 2,
        DataSourceMember: "AreaID",
        filterrest: "cbCoordinatorStoreID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Khu vực",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_AREATT,
        NameMember: "AreaName",
        placeholder: "Khu vực",
        value: "",
        ValueMember: "AreaID",
    },
    {
        type: "ComboBox",
        name: "cbCoordinatorStoreID",
        colspan: 2,
        DataSourceMember: "StoreID",
        filterName: "cbAreaID",
        filterobj: "AreaID",
        // filterrest: "",
        // filterValue: "",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Kho điều phối",
        listoption: [],
        LoadItemCacheKeyID: ERPCOMMONCACHE_STORE_AREA,
        NameMember: "StoreName",
        placeholder: "Kho điều phối",
        value: "",
        ValueMember: "StoreID",
    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderTypeID",
        colspan: 2,
        DataSourceMember: "ShipmentOrderTypeID",
        // filterName: "",
        // filterobj: "",
        // filterValue: "",
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        label: "Loại yêu cầu vận chuyển",
        listoption: [{ label: "Loại yêu cầu vận chuyển", value: -1 }],
        // LoadItemCacheKeyID: ERPCOMMONCACHE_SHIPMENTORDERTYPE,
        NameMember: "ShipmentOrderTypeName",
        placeholder: "Loại yêu cầu vận chuyển",
        value: "",
        ValueMember: "ShipmentOrderTypeID",
    },
]

export const MLObjectDefinition = [
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbAreaID"
    },
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID"
    },
];

export const listColumn = [
    {
        Name: "AreaIDName",
        Type: "text",
        Caption: "Khu vực ",
        DataSourceMember: "AreaIDName",
        // Width: 100
    },
    {
        Name: "CoordinatorStoreIDName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "CoordinatorStoreIDName",
        // Width: 100
    },
    {
        Name: "ShipmentOrderTypeIDName",
        Type: "text",
        Caption: "Loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeIDName",
        // Width: 100
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        // Width: 100
    },
    {
        Name: "ExpectedDeliveryDate",
        Type: "datetime",
        Caption: "Ngày hẹn giao",
        DataSourceMember: "ExpectedDeliveryDate",
        // Width: 100
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật lỗi",
        DataSourceMember: "UpdatedDate",
        // Width: 100
    },
    {
        Name: "UpdatedUserIDName",
        Type: "text",
        Caption: "Nhân viên cập nhật",
        DataSourceMember: "UpdatedUserIDName",
        // Width: 100
    },
    {
        Name: "SymptomIDName",
        Type: "text",
        Caption: "Trường lỗi",
        DataSourceMember: "SymptomIDName",
        // Width: 100
    },
]