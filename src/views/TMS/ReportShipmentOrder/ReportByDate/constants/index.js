export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchReportDate";
export const LoadReportUndeliveryByDate = "api/ShipmentOrder/LoadReportByDate";
export const LoadReportDeliveringByDate = "api/ShipmentOrder/LoadReportDeliveringByDate";
export const LoadReportDeliveredByDate = "api/ShipmentOrder/LoadReportDeliveredByDate";
export const LoadReportCompletedOrderByDate = "api/ShipmentOrder/LoadReportCompletedOrderByDate";
export const LoadReportCancelDeliveryByDate = "api/ShipmentOrder/LoadReportCancelDeliveryByDate";
export const LoadReportPaidInByDate = "api/ShipmentOrder/LoadReportPaidInByDate";

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
        Name: "CreatedOrderTime",
        Type: "date",
        Caption: "Ngày",
        DataSourceMember: "CreatedOrderTime",
        Width: '14%'
    },
    {
        Name: "TotalOrder",
        Type: "textBoldRed",
        Caption: "Tổng đơn",
        DataSourceMember: "TotalOrder",
        Width: '10%'
    },
    {
        Name: "TotalUndelivery",
        Type: "popupNew",
        Caption: "Chưa giao",
        DataSourceMember: "TotalUndelivery",
        Width: '10%',
    },
    {
        Name: "TotalDelivering",
        Type: "popupNew",
        Caption: "Đang giao",
        DataSourceMember: "TotalDelivering",
        Width: '10%'
    },
    {
        Name: "TotalDelivered",
        Type: "popupNew",
        Caption: "Giao xong",
        DataSourceMember: "TotalDelivered",
        Width: '10%'
    },
    {
        Name: "TotalCompletedOrder",
        Type: "popupNew",
        Caption: "Hoàn tất",
        DataSourceMember: "TotalCompletedOrder",
        Width: '12%'
    },
    {
        Name: "TotalCancelDelivery",
        Type: "popupNew",
        Caption: "Huỷ giao",
        DataSourceMember: "TotalCancelDelivery",
        Width: '12%'
    },
    {
        Name: "TotalPaidIn",
        Type: "popupNew",
        Caption: "Đã nộp tiền",
        DataSourceMember: "TotalPaidIn",
        Width: '12%'
    },
    {
        Name: "UnTotalPaidIn",
        Type: "popupNew",
        Caption: "Chưa nộp tiền",
        DataSourceMember: "UnTotalPaidIn",
        Width: '10%'
    },
]