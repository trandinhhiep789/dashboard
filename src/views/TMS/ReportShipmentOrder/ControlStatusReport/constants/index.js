export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo kiểm soát trạng thái vận đơn" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "cbFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "cbToDate"
    },
    {
        Name: "ShipmentOrderStatusGroupID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderStatusGroupID"
    },
    {
        Name: "COD",
        DefaultValue: "",
        BindControlName: "cbCOD"
    },
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
    }
];

export const SearchElementList = [
    {
        type: "Datetime",
        label: "Từ ngày",
        name: "cbFromDate",
        DataSourceMember: "FromDate",
        placeholder: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "Datetime",
        label: "Đến ngày",
        name: "cbToDate",
        DataSourceMember: "ToDate",
        placeholder: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        classNameCol: "col-custom"
    },
    {
        type: "MultiTreeSelect",
        IsLabelDiv: true,
        labelcolspan: 10,
        label: 'Trạng thái vận đơn',
        name: "cbShipmentOrderStatusGroupID",
        DataSourceMember: "ShipmentOrderStatusGroupID",
        colspan: 10,
        rowspan: 2,
        value: "1,2,3",
        maxTagCount: 1,
        isMultiSelect: true,
        placeholder: "---Trạng thái---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERSTATUSGR",
        ValueMember: "ShipmentOrderStatusGroupID",
        NameMember: "ShipmentOrderStatusGroupName",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "cbCOD",
        DataSourceMember: "COD",
        label: "COD",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [
            { value: -1, label: "---Vui lòng chọn---" },
            { value: 1, label: "COD bằng 0" },
            { value: 2, label: "COD khác 0" },
        ]
    },
    {
        type: "textdropdownNew",
        label: "Đơn hàng/ Vận đơn",
        dropdownName: "txtTypename",
        name: "txtKeyword",
        colspan: 4,
        value: "",
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption: -1,
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: -1, label: "--Vui lòng chọn--" },
            { value: 1, label: "Mã đơn hàng" },
            { value: 2, label: "Mã vận đơn" }
        ]
    }
];

export const GridColumnList = [
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng",
        DataSourceMember: "PartnerSaleOrderID",
        Width: "8%"
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        Width: "8%"
    },
    {
        Name: "OutputGoodsDate",
        Type: "date",
        Caption: "Thời gian xuất hàng",
        DataSourceMember: "OutputGoodsDate",
        Width: "8%"
    },
    {
        Name: "ExpectedDeliveryDate",
        Type: "date",
        Caption: "Thời gian hẹn giao hàng",
        DataSourceMember: "ExpectedDeliveryDate",
        Width: "8%"
    },
    {
        Name: "TotalCOD",
        Type: "textCurrency",
        Caption: "Số tiền COD",
        DataSourceMember: "TotalCOD",
        Width: "8%"
    },
    {
        Name: "TotalReturnPrice",
        Type: "textCurrency",
        Caption: "Tổng tiền nhập trả",
        DataSourceMember: "TotalReturnPrice",
        Width: "8%"
    },
    {
        Name: "TotalSaleMaterialMoney",
        Type: "textCurrency",
        Caption: "Tiền vật tư",
        DataSourceMember: "TotalSaleMaterialMoney",
        Width: "8%"
    },
    {
        Name: "CollectedTotalMoney",
        Type: "textCurrency",
        Caption: "Tổng tiền phải thu của vận đơn",
        DataSourceMember: "CollectedTotalMoney",
        Width: "8%"
    },
    {
        Name: "DeliverUserFullNameList",
        Type: "text",
        Caption: "Nhân viên giao",
        DataSourceMember: "DeliverUserFullNameList",
        Width: "8%"
    },
    {
        Name: "CoordinatorUserName",
        Type: "text",
        Caption: "TN điều phối",
        DataSourceMember: "CoordinatorUserName",
        Width: "8%"
    },
    {
        Name: "CoordinatorStoreName",
        Type: "text",
        Caption: "Kho điều phối",
        DataSourceMember: "CoordinatorStoreName",
        Width: "10%"
    },
    {
        Name: "ShipmentOrderStatusName",
        Type: "text",
        Caption: "Trạng thái vận đơn",
        DataSourceMember: "ShipmentOrderStatusName",
        Width: "10%"
    },


]