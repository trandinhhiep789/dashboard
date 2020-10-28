export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchReportStore";

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
        label: "Từ Ngày",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        colspan: 3,
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
        label: "kho điều phối",
        colspan: 3,
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
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    },
    {
        Name: "ShipmentOrderType",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID"
    },
    {
        Name: "CoordinatorStore",
        DefaultValue: "",
        BindControlName: "cbCoordinatorStoreID"
    },
]

export const GridColumnList = [
    {
        Name: "CoordinatorStoreID",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "CoordinatorStoreID",
        Width: 100
    },
    {
        Name: "TotalOrder",
        Type: "text",
        Caption: "Tổng đơn",
        DataSourceMember: "TotalOrder",
        Width: 100
    },
    {
        Name: "TotalUndelivery",
        Type: "text",
        Caption: "Chưa giao",
        DataSourceMember: "TotalUndelivery",
        Width: 100
    },
    {
        Name: "TotalDelivering",
        Type: "text",
        Caption: "Đang giao",
        DataSourceMember: "TotalDelivering",
        Width: 100
    },
    {
        Name: "TotalDelivered",
        Type: "text",
        Caption: "Giao xong",
        DataSourceMember: "TotalDelivered",
        Width: 100
    },
    {
        Name: "TotalCompletedOrder",
        Type: "text",
        Caption: "Đã hoàn thành",
        DataSourceMember: "TotalCompletedOrder",
        Width: 100
    },
    {
        Name: "TotalCancelDelivery",
        Type: "text",
        Caption: "Huỷ giao",
        DataSourceMember: "TotalCancelDelivery",
        Width: 100
    },
    {
        Name: "TotalPaidIn",
        Type: "text",
        Caption: "Đã nộp tiền",
        DataSourceMember: "TotalPaidIn",
        Width: 100
    },
]