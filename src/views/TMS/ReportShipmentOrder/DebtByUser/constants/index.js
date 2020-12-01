export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchReportDebtByUser";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách báo cáo công nợ theo nhân viên" }
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
        Caption: "Ngày giao dịch",
        DataSourceMember: "DeliverUserFullNameList",
        Width: "14%"
    },
    {
        Name: "TotalOrder",
        Type: "text",
        Caption: "Loại giao dịch",
        DataSourceMember: "TotalOrder",
        Width: "10%"
    },
    {
        Name: "TotalUndelivery",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "TotalUndelivery",
        Width: "10%"
    },
    {
        Name: "TotalDelivering",
        Type: "text",
        Caption: "Kho xuất",
        DataSourceMember: "TotalDelivering",
        Width: "10%"
    },
    {
        Name: "TotalDelivered",
        Type: "text",
        Caption: "Mã phiếu xuất",
        DataSourceMember: "TotalDelivered",
        Width: "10%"
    },
    {
        Name: "TotalCompletedOrder",
        Type: "text",
        Caption: "Hình thức xuất",
        DataSourceMember: "TotalCompletedOrder",
        Width: "12%"
    },
    {
        Name: "TotalCancelDelivery",
        Type: "text",
        Caption: "NV xuất",
        DataSourceMember: "TotalCancelDelivery",
        Width: "12%"
    },
    {
        Name: "TotalPaidIn",
        Type: "text",
        Caption: "Đơn giá",
        DataSourceMember: "TotalPaidIn",
        Width: "12%"
    },
    {
        Name: "UnTotalPaidIn",
        Type: "text",
        Caption: "Thành tiền",
        DataSourceMember: "UnTotalPaidIn",
        Width: "10%"
    },
]