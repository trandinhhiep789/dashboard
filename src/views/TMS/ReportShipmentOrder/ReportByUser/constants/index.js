export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchReportUserName";
export const LoadReportUserNameByDate = "api/ShipmentOrder/LoadReportUserNameByDate";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách thống kê vận đơn theo nhân viên" }
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
    // {
    //     type: "ComboBoxNewChange",
    //     name: "cbCoordinatorStoreID",
    //     DataSourceMember: "CoordinatorStoreID",
    //     label: "kho điều phối",
    //     colspan: 4,
    //     value: "",
    //     isMultiSelect: true,
    //     placeholder: "---Kho điều phối---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
    //     ValueMember: "StoreID",
    //     NameMember: "StoreName",
    //     filterValue: 10,
    //     filterobj:"CompanyID",
    //     classNameCol:"col-custom"
    // },
    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 3,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true

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
    // {
    //     Name: "CoordinatorStore",
    //     DefaultValue: "",
    //     BindControlName: "cbCoordinatorStoreID"
    // },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
]

export const GridColumnList = [
    {
        Name: "DeliverUserFullNameList",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "DeliverUserFullNameList",
        Width: "14%"
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
        Width: "12%"
    },
    {
        Name: "TotalPaidIn",
        Type: "text",
        Caption: "Đã nộp tiền",
        DataSourceMember: "TotalPaidIn",
        Width: "14%"
    },
]