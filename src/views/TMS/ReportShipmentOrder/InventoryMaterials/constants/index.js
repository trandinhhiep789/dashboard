import { USER_PERMISSION_VIEW } from '../../../../../constants/functionLists';
export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/BeginTermAdvanceDebt/LoadInStock";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách báo cáo tồn kho vật tư" }
];

export const SearchElementList = [
    {
        type: "MonthPicker",
        name: "dtMonth",
        DataSourceMember: "Month",
        label: "Tháng",
        value: new Date(),
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
    },
    {
        type: "ComboBox",
        name: "cbAreaID",
        DataSourceMember: "AreaID",
        label: "Khu vực",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName"

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
        isMultiSelect: false,
        IsPermission: true,
        PermissionKey: USER_PERMISSION_VIEW,
        isClearable: true
    },

]

export const SearchMLObjectDefinition = [
    {
        Name: "Month",
        DefaultValue: "",
        BindControlName: "dtMonth"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "cbAreaID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
]

export const GridColumnList = [
    {
        Name: "RequestUser",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "RequestUser",
        Width: 100
    },
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Ống đồng",
        DataSourceMember: "ProductName",
        Width: 100
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị",
        DataSourceMember: "QuantityUnit",
        Width: 100
    },
    {
        Name: "TotalQuantityBegin",
        Type: "text",
        Caption: "Số dư đầu kỳ",
        DataSourceMember: "TotalQuantityBegin",
        Width: 100
    },
    {
        Name: "QuantityHanOverDone",
        Type: "popupNew",
        Caption: "Nhận trong kỳ",
        DataSourceMember: "QuantityHanOverDone",
        Width: 100
    },
    {
        Name: "QuantityHanOverDoing",
        Type: "popupNew",
        Caption: "Chờ bàn giao",
        DataSourceMember: "QuantityHanOverDoing",
        Width: 100
    },
    {
        Name: "QuantityReturn",
        Type: "popupNew",
        Caption: "Nhập trả",
        DataSourceMember: "QuantityReturn",
        Width: 100
    },
    {
        Name: "ChangeTotalQuantity",
        Type: "popupNew",
        Caption: "Sử dụng trong kỳ",
        DataSourceMember: "ChangeTotalQuantity",
        Width: 100
    },
    {
        Name: "QuantityExpend",
        Type: "popupNew",
        Caption: "Tiêu hao khác",
        DataSourceMember: "QuantityExpend",
        Width: 100
    },
    {
        Name: "TotalQuantity",
        Type: "text",
        Caption: "Cuối kỳ",
        DataSourceMember: "TotalQuantity",
        Width: 100
    },
    {
        Name: "SalePrice",
        Type: "textCurrency",
        Caption: "Đơn giá (giá vốn)",
        DataSourceMember: "SalePrice",
        Width: 100
    },
    {
        Name: "TotalSalePrice",
        Type: "textCurrency",
        Caption: "Số tiền quy đổi",
        DataSourceMember: "TotalSalePrice",
        Width: 100
    },

]

export const GridColumnListPrice = [
    {
        Name: "RequestUser",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "RequestUser",
        Width: 100
    },
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Vật tư khác",
        DataSourceMember: "ProductName",
        Width: 100
    },
    {
        Name: "QuantityUnit",
        Type: "text",
        Caption: "Đơn vị",
        DataSourceMember: "QuantityUnit",
        Width: 100
    },
    {
        Name: "TotalQuantityBegin",
        Type: "text",
        Caption: "Số dư đầu kỳ",
        DataSourceMember: "TotalQuantityBegin",
        Width: 100
    },
    {
        Name: "QuantityHanOverDone",
        Type: "popupNew",
        Caption: "Nhận trong kỳ",
        DataSourceMember: "QuantityHanOverDone",
        Width: 100
    },
    {
        Name: "QuantityHanOverDoing",
        Type: "popupNew",
        Caption: "Chờ bàn giao",
        DataSourceMember: "QuantityHanOverDoing",
        Width: 100
    },
    {
        Name: "QuantityReturn",
        Type: "popupNew",
        Caption: "Nhập trả",
        DataSourceMember: "QuantityReturn",
        Width: 100
    },
    {
        Name: "ChangeTotalQuantity",
        Type: "popupNew",
        Caption: "Sử dụng trong kỳ",
        DataSourceMember: "ChangeTotalQuantity",
        Width: 100
    },
    {
        Name: "QuantityExpend",
        Type: "popupNew",
        Caption: "Tiêu hao khác",
        DataSourceMember: "QuantityExpend",
        Width: 100
    },
    {
        Name: "TotalQuantity",
        Type: "text",
        Caption: "Cuối kỳ",
        DataSourceMember: "TotalQuantity",
        Width: 100
    },
    {
        Name: "SalePrice",
        Type: "textCurrency",
        Caption: "Đơn giá (giá vốn)",
        DataSourceMember: "SalePrice",
        Width: 100
    },
    {
        Name: "TotalSalePrice",
        Type: "textCurrency",
        Caption: "Số tiền quy đổi",
        DataSourceMember: "TotalSalePrice",
        Width: 100
    },


]

export const DataGridModalQuantityHanOverDone = [
    {
        Name: "AdvanceRequestID",
        Type: "texttolinkNewBlank",
        Caption: "Yêu cầu tạm ứng",
        Link: "/AdvanceRequest/Edit/",
        DataSourceMember: "AdvanceRequestID",
        Width: 100
    },
    {
        Name: "SaleOrderID",
        Type: "text",
        Caption: "Yêu cầu xuất",
        DataSourceMember: "SaleOrderID",
        Width: 100
    },
    {
        Name: "OutputVoucherID",
        Type: "text",
        Caption: "Mã phiếu xuất",
        DataSourceMember: "OutputVoucherID",
        Width: 100
    },
    {
        Name: "ConvertQuantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "ConvertQuantity",
        Width: 100
    },
    {
        Name: "HandOverDate",
        Type: "text",
        Caption: "Ngày bàn giao",
        DataSourceMember: "HandOverDate",
        Width: 100
    },

];

export const DataGridModalQuantityHanOverDoing = [
    {
        Name: "AdvanceRequestID",
        Type: "texttolinkNewBlank",
        Caption: "Yêu cầu tạm ứng",
        Link: "/AdvanceRequest/Edit/",
        DataSourceMember: "AdvanceRequestID",
        Width: 100
    },
    {
        Name: "SaleOrderID",
        Type: "text",
        Caption: "Yêu cầu xuất",
        DataSourceMember: "SaleOrderID",
        Width: 100
    },
    {
        Name: "OutputVoucherID",
        Type: "text",
        Caption: "Mã phiếu xuất",
        DataSourceMember: "OutputVoucherID",
        Width: 100
    },
    {
        Name: "ConvertQuantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "ConvertQuantity",
        Width: 100
    }
];

export const DataGridModalQuantityReturn = [
    {
        Name: "SaleOrderID",
        Type: "text",
        Caption: "Yêu cầu xuất",
        DataSourceMember: "SALEORDERID",
        Width: 100
    },
    {
        Name: "OutputVoucherID",
        Type: "text",
        Caption: "Mã phiếu xuất ",
        DataSourceMember: "OUTPUTVOUCHERID",
        Width: 100
    },
    {
        Name: "ExchangeOrderID",
        Type: "text",
        Caption: "Mã nhập trả",
        DataSourceMember: "EXCHANGEORDERID",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 100
    },
];

export const DataGridModalChangeTotalQuantity = [
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        Link: "/ShipmentOrder/Detail/",
        Type: "texttolinkNewBlank",
        Width: 100
    },
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng",
        DataSourceMember: "PartnerSaleOrderID",
        Width: 100
    },
    {
        Name: "ChangeTotalQuantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "ChangeTotalQuantity",
        Width: 100
    },
];

export const DataGridModalQuantityExpend = [
    {
        Name: "MTReturnRequestID",
        // Type: "text",
        Caption: "Mã yêu cầu nhập trả vật tư",
        DataSourceMember: "MTReturnRequestID",
        Link: "/MTReturnRequest/Detail/",
        Type: "texttolinkNewBlank",
        Width: 100
    },
    {
        Name: "InputVoucherID",
        Type: "text",
        Caption: "Mã phiếu nhập trả",
        DataSourceMember: "InputVoucherID",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng",
        DataSourceMember: "Quantity",
        Width: 100
    },
];