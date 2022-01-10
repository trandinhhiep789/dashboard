export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchTMSSOReturnItemReport";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo nhập trả trên TMS" },
];

export const SearchMLObjectDefinition = [
    {
        Name: "KeyWord",
        DefaultValue: "",
        BindControlName: "txtKeyword",
    },
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate",
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate",
    },
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "Nhiều vận đơn cách nhau dấu ,",
        icon: "",
        listoption: {},
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date(),//new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(),//new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
];

export const GridColumnList = [
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        Width: 100,
    },
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Tên đơn hàng",
        DataSourceMember: "PartnerSaleOrderID",
        Width: 200,
    },
    {
        Name: "CustomerName",
        Type: "text",
        Caption: "Tên khách hàng",
        DataSourceMember: "CustomerName",
        Width: 200,
    },
    {
        Name: "CustomerAddress",
        Type: "text",
        Caption: "Địa chỉ khách hàng",
        DataSourceMember: "CustomerAddress",
        Width: 200,
    },
    {
        Name: "StoreExport",
        Type: "text",
        Caption: "Kho xuất",
        DataSourceMember: "StoreExport",
        Width: 200,
    },
    {
        Name: "ShipmentOrderStatus",
        Type: "text",
        Caption: "Trạng thái giao hàng",
        DataSourceMember: "ShipmentOrderStatus",
        Width: 200,
    },
    {
        Name: "OutputGoodsDate",
        Type: "text",
        Caption: "Ngày xuất hàng",
        DataSourceMember: "OutputGoodsDate",
        Width: 200,
    },
    {
        Name: "AreaID",
        Type: "text",
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Width: 200,
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Width: 200,
    },
    {
        Name: "CoordinatorStoreID",
        Type: "text",
        Caption: "Mã kho điều phối",
        DataSourceMember: "CoordinatorStoreID",
        Width: 200,
    },
    {
        Name: "CoordinatorStoreName",
        Type: "text",
        Caption: "Tên kho điều phối",
        DataSourceMember: "CoordinatorStoreName",
        Width: 200,
    },
    {
        Name: "CoordinatorUser",
        Type: "text",
        Caption: "Nhân viên điều phối",
        DataSourceMember: "CoordinatorUser",
        Width: 200,
    },
    {
        Name: "DeliverUserList",
        Type: "text",
        Caption: "Nhân viên giao",
        DataSourceMember: "DeliverUserList",
        Width: 200,
    },
    {
        Name: "MainGroupID",
        Type: "text",
        Caption: "Mã ngành hàng",
        DataSourceMember: "MainGroupID",
        Width: 200,
    },
    {
        Name: "MainGroupName",
        Type: "text",
        Caption: "Tên ngành hàng",
        DataSourceMember: "MainGroupName",
        Width: 200,
    },
    {
        Name: "SubGroupID",
        Type: "text",
        Caption: "Mã nhóm ngành hàng",
        DataSourceMember: "SubGroupID",
        Width: 200,
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Tên nhóm ngành hàng",
        DataSourceMember: "SubGroupName",
        Width: 200,
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 200,
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 200,
    },
    {
        Name: "ProductQuantity",
        Type: "text",
        Caption: "Số lượng sản phẩm",
        DataSourceMember: "ProductQuantity",
        Width: 200,
    },
];
