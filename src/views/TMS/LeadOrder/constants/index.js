import {
    ERPCOMMONCACHE_AREATT,
    ERPCOMMONCACHE_STORE_AREA,
} from '../../../../constants/keyCache';

export const APIHostName = "TMSAPI";
export const APISearchPath = "api/LeadOrder/Search";
export const APILoadPath = "api/LeadOrder/Load";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Mối bán hàng" }
];
export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrder", Title: "Mối bán hàng" },
    { Link: "", Title: "Chi tiết mối bán hàng" }
];

export const listElementSearch = [
    {
        type: "text",
        name: "txtKeyWord",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
    },
    {
        type: "Datetime",
        name: "dtFromDate",
        colspan: 2,
        DataSourceMember: "FromDate",
        dateFormat: "DD/MM/YYYY",
        label: "Từ ngày",
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
        label: "Đến ngày",
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
        name: "cbIsFaildAdvice",
        colspan: 2,
        DataSourceMember: "IsFaildAdvice",
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        label: "Tư vấn thất bại",
        listoption: [
            { value: -1, label: "--Chọn--" },
            { value: 1, label: "Có" },
            { value: 0, label: "Không" },
        ],
        LoadItemCacheKeyID: "",
        NameMember: "IsFaildAdvice",
        placeholder: "Tư vấn thất bại",
        value: -1,
        ValueMember: "IsFaildAdvice",
    }
]

export const MLObjectDefinition = [
    {
        Name: "KeyWord",
        DefaultValue: "",
        BindControlName: "txtKeyWord"
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
        Name: "IsFaildAdvice",
        DefaultValue: "",
        BindControlName: "cbIsFaildAdvice"
    },
];

export const listColumn = [
    {
        Name: "LeadOrderID",
        Type: "texttolinkNewBlank",
        Caption: "Mã khoá chính",
        DataSourceMember: "LeadOrderID",
        Link: "/LeadOrder/Detail/",
    },
    {
        Name: "CustomerName",
        Type: "text",
        Caption: "Tên khách hàng",
        DataSourceMember: "CustomerName",
    },
    {
        Name: "StaffUserIDName",
        Type: "text",
        Caption: "Mã nhân viên tư vấn",
        DataSourceMember: "StaffUserIDName",
    },
    {
        Name: "CoordinatorStoreIDName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "CoordinatorStoreIDName",
    },
    {
        Name: "CurrentStatusIDName",
        Type: "text",
        Caption: "Trạng thái hiện tại",
        DataSourceMember: "CurrentStatusIDName",
    },
    {
        Name: "ExpectedDeliveryDate",
        Type: "datetime",
        Caption: "Ngày hẹn giao",
        DataSourceMember: "ExpectedDeliveryDate",
    },
    {
        Name: "VoucherConcern",
        Type: "text",
        Caption: "Mã vận đơn gốc",
        DataSourceMember: "VoucherConcern",
    },
    {
        Name: "IsFaildAdvice",
        Type: "checkicon",
        Caption: "Tư vấn thất bại",
        DataSourceMember: "IsFaildAdvice",
    },
    {
        Name: "FailAdviseDescription",
        Type: "text",
        Caption: "Lý do tư vấn thất bại",
        DataSourceMember: "FailAdviseDescription",
    },
    {
        Name: "CreatedSaleOrderDate",
        Type: "datetime",
        Caption: "Ngày tạo đơn hàng tương lai",
        DataSourceMember: "CreatedSaleOrderDate",
    },
]

export const ListLeadOrderDetailColumn = [
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị",
        DataSourceMember: "QuantityUnit",
    },
    {
        Name: "ExpectedDeliveryDate",
        Type: "datetime",
        Caption: "Ngày hẹn giao",
        DataSourceMember: "ExpectedDeliveryDate",
    },
    {
        Name: "SaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng",
        DataSourceMember: "SaleOrderID",
    },
    {
        Name: "CreatedUserIDName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserIDName",
    }
]