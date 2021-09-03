export const APIHostName = "TMSAPI";
export const APISearch = "api/AirConditionerMTOrderReport/Search";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo doanh thu danh sách đơn hàng vật tư máy lạnh" }
];

export const MLObjectDefinitionSearch = [
    {
        Name: "FromDate",
        DefaultValue: new Date(),
        BindControlName: "FromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: new Date(),
        BindControlName: "ToDate"
    }
];

export const listelementSearch = [
    {
        classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "FromDate",
        dateFormat: "DD/MM/YYYY",
        label: "Từ ngày",
        name: "FromDate",
        placeholder: "Từ ngày",
        timeFormat: false,
        type: "Datetime",
        value: new Date()
    },
    {
        classNameCol: "col-custom",
        colspan: 2,
        DataSourceMember: "ToDate",
        dateFormat: "DD/MM/YYYY",
        label: "Đến ngày",
        name: "ToDate",
        placeholder: "Đến ngày",
        timeFormat: false,
        type: "Datetime",
        value: new Date()
    }
];

export const listColumnSearch = [
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID"
    },
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng gốc",
        DataSourceMember: "PartnerSaleOrderID"
    },
    {
        Name: "SaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng vật tư",
        DataSourceMember: "SaleOrderID"
    },
    {
        Name: "InstallProductID",
        Type: "text",
        Caption: "Mã sản phẩm chính",
        DataSourceMember: "InstallProductID"
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm chính",
        DataSourceMember: "ProductName"
    },
    {
        Name: "BundleQuantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "BundleQuantity"
    }
];

export const initSearchParamater = [
    {
        SearchKey: "@FROMDATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    }
]