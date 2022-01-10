export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/SOReport/SearchOrderStatistics";
export const SearchDetailAPIPath = "api/SOReport/SearchOrderStatisticsDetail";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thống kê đơn hàng" }
];



const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
    {
        type: "ComboBoxNewChange",
        name: "cbShipmentOrderTypeID",
        DataSourceMember: "ShipmentOrderTypeID",
        label: "loại yêu cầu vận chuyển",
        colspan: 3,
        value: "",
        isMultiSelect: false,
        placeholder: "---Loại yêu cầu vận chuyển---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        ValueMember: "ShipmentOrderTypeID",
        NameMember: "ShipmentOrderTypeName",
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        // value: new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        value: new Date(),
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
        type: "checkbox",
        name: "chkViewByDay",
        DataSourceMember: "ViewByDay",
        label: "Xem chi tiết theo ngày",
        value: false,
        colspan: 2,
        classNameCol: "checkboxSelectCustom"
    },
    // {
    //     type: "ComboBoxNewChange",
    //     name: "cbCoordinatorStoreID",
    //     DataSourceMember: "CoordinatorStoreID",
    //     label: "kho điều phối",
    //     colspan: 3,
    //     value: "",
    //     isMultiSelect: true,
    //     placeholder: "---Kho điều phối---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.USER_COOSTORE_BYUSER",
    //     ValueMember: "StoreID",
    //     NameMember: "StoreName",
    //     // filterValue: 10,
    //     // filterobj:"CompanyID",
    //     classNameCol: "col-custom"
    // },

]

export const SearchMLObjectDefinition = [
    {
        Name: "ShipmentOrderTypeID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderTypeID"
    },
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
        Name: "ViewByDay",
        DefaultValue: false,
        BindControlName: "chkViewByDay"
    },
]

export const GridColumnList = [
    {
        Name: "CreatedOrderTime",
        Type: "text",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedOrderTime",
        Width: '20%'
    },

    {
        Name: "ShipmentOrderComplete",
        Type: "text",
        Caption: "Số lượng đơn hàng thành công",
        DataSourceMember: "ShipmentOrderComplete",
        Width: '20%'
    },
    {
        Name: "ShipmentOrderNotOutput",
        Type: "text",
        Caption: "Số lượng đơn hàng chưa xuất",
        DataSourceMember: "ShipmentOrderNotOutput",
        Width: '20%'
    },
    {
        Name: "ShipmentOrderIsPaid",
        Type: "text",
        Caption: "Thanh toán công nợ thành công trên hệ thống",
        DataSourceMember: "ShipmentOrderIsPaid",
        Width: '20%'
    },
    {
        Name: "ShipmentOrderIsCancelDelivery",
        Type: "popupTextNumber",
        Caption: "Số lượng đơn hàng hủy giao",
        DataSourceMember: "ShipmentOrderIsCancelDelivery",
        Width: '20%'
    },
   




    // {
    //     Name: "TotalOrder",
    //     Type: "textNumberBoldRed",
    //     Caption: "Tổng đơn",
    //     DataSourceMember: "TotalOrder",
    //     Width: '10%'
    // },
    // {
    //     Name: "TotalUndelivery",
    //     Type: "popupTextNumber",
    //     Caption: "Chưa giao",
    //     DataSourceMember: "TotalUndelivery",
    //     Width: '10%',
    // },
    // {
    //     Name: "TotalDelivering",
    //     Type: "popupTextNumber",
    //     Caption: "Đang giao",
    //     DataSourceMember: "TotalDelivering",
    //     Width: '10%'
    // },
    // {
    //     Name: "TotalDelivered",
    //     Type: "popupTextNumber",
    //     Caption: "Giao xong",
    //     DataSourceMember: "TotalDelivered",
    //     Width: '10%'
    // },
    // {
    //     Name: "TotalCompletedOrder",
    //     Type: "popupTextNumber",
    //     Caption: "Hoàn tất",
    //     DataSourceMember: "TotalCompletedOrder",
    //     Width: '12%'
    // },
    // {
    //     Name: "TotalCancelDelivery",
    //     Type: "popupTextNumber",
    //     Caption: "Huỷ giao",
    //     DataSourceMember: "TotalCancelDelivery",
    //     Width: '12%'
    // },
    // {
    //     Name: "TotalPaidIn",
    //     Type: "popupTextNumber",
    //     Caption: "Đã nộp tiền",
    //     DataSourceMember: "TotalPaidIn",
    //     Width: '12%'
    // },
    // {
    //     Name: "UnTotalPaidIn",
    //     Type: "popupTextNumber",
    //     Caption: "Chưa nộp tiền",
    //     DataSourceMember: "UnTotalPaidIn",
    //     Width: '10%'
    // },
]