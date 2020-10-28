

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách thống kê vận đơn theo ngày" }
];



const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
    
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
       label: "Từ ngày",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        label: "Đến ngày",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Loại yêu cầu vận chuyển---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        classNameCol:"col-custom"
    },
    {
        type: "ComboBox",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        label: "Đến ngày",
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
        filterobj:"CompanyID",
        classNameCol:"col-custom"
    },

]

export const  SearchMLObjectDefinition = [
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID"
    },
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },
]

export const GridColumnList = [
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Ngày",
        DataSourceMember: "ShipmentOrderID",
        Width: 100
    },
    {
        Name: "TotalShipmentOrder",
        Type: "text",
        Caption: "Tổng đơn",
        DataSourceMember: "TotalShipmentOrder",
        Width: 100
    },
    {
        Name: "TotalShipmentOrder",
        Type: "text",
        Caption: "Chưa giao",
        DataSourceMember: "TotalShipmentOrder",
        Width: 100
    },
    {
        Name: "TotalShipmentOrder",
        Type: "text",
        Caption: "Đang giao",
        DataSourceMember: "TotalShipmentOrder",
        Width: 100
    },
    {
        Name: "TotalShipmentOrder",
        Type: "text",
        Caption: "Giao xong",
        DataSourceMember: "TotalShipmentOrder",
        Width: 100
    },
    {
        Name: "TotalShipmentOrder",
        Type: "text",
        Caption: "Đã nộp tiền",
        DataSourceMember: "TotalShipmentOrder",
        Width: 100
    },
    {
        Name: "TotalShipmentOrder",
        Type: "text",
        Caption: "Huỷ giao",
        DataSourceMember: "TotalShipmentOrder",
        Width: 100
    },
]