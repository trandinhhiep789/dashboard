export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchReportStore";
export const LoadReportStoreByDate = "api/ShipmentOrder/LoadReportStoreByDate";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách thống kê vận đơn theo kho" }
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
        type: "ComboBoxNewChange",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        colspan: 3,
        value: "",
        isMultiSelect: true,
        placeholder: "---Loại yêu cầu vận chuyển---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        classNameCol:"col-custom"
    },
    {
        type: "ComboBoxNewChange",
        name: "cbCoordinatorStoreID",
        DataSourceMember: "CoordinatorStoreID",
        label: "kho điều phối",
        colspan: 3,
        value: "",
        isMultiSelect: true,
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
        Name: "fulNameStore",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "fulNameStore",
        Width: "20%"
    },
    {
        Name: "TotalOrder",
        Type: "text",
        Caption: "Tổng đơn",
        DataSourceMember: "TotalOrder",
        Width: "12%"
    },
    {
        Name: "TotalUndelivery",
        Type: "popupNew",
        Caption: "Chưa giao",
        DataSourceMember: "TotalUndelivery",
        Width: "12%"
    },
    {
        Name: "TotalDelivering",
        Type: "text",
        Caption: "Đang giao",
        DataSourceMember: "TotalDelivering",
        Width: "12%"
    },
    {
        Name: "TotalDelivered",
        Type: "text",
        Caption: "Giao xong",
        DataSourceMember: "TotalDelivered",
        Width: "12%"
    },
    {
        Name: "TotalCompletedOrder",
        Type: "text",
        Caption: "Đã hoàn thành",
        DataSourceMember: "TotalCompletedOrder",
        Width: "12%"
    },
    {
        Name: "TotalCancelDelivery",
        Type: "text",
        Caption: "Huỷ giao",
        DataSourceMember: "TotalCancelDelivery",
        Width: "10%"
    },
    {
        Name: "TotalPaidIn",
        Type: "text",
        Caption: "Đã nộp tiền",
        DataSourceMember: "TotalPaidIn",
        Width: "10%"
    },
]