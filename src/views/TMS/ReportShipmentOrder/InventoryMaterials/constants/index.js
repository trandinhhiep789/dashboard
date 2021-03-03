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
        value: "",
        format: "MM-YYYY",
        colspan: 2,
        placeholder: "MM-YYYY",
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
        PermissionKey: USER_PERMISSION_VIEW
    },

]

export const  SearchMLObjectDefinition = [
    {
        Name: "Month",
        DefaultValue: "",
        BindControlName: "dtMonth"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
]

export const GridColumnList = [
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
        Type: "text",
        Caption: "Nhận trong kỳ",
        DataSourceMember: "QuantityHanOverDone",
        Width: 100
    },
    {
        Name: "QuantityHanOverDoing",
        Type: "text",
        Caption: "Chờ bàn giao",
        DataSourceMember: "QuantityHanOverDoing",
        Width: 100
    },
    {
        Name: "QuantityReturn",
        Type: "text",
        Caption: "Nhập trả",
        DataSourceMember: "QuantityReturn",
        Width: 100
    },
    {
        Name: "ChangeTotalQuantity",
        Type: "text",
        Caption: "Sử dụng trong kỳ",
        DataSourceMember: "ChangeTotalQuantity",
        Width: 100
    },
    {
        Name: "QuantityExpend",
        Type: "text",
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
    
]

export const GridColumnListPrice = [
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
        Type: "text",
        Caption: "Nhận trong kỳ",
        DataSourceMember: "QuantityHanOverDone",
        Width: 100
    },
    {
        Name: "QuantityHanOverDoing",
        Type: "text",
        Caption: "Chờ bàn giao",
        DataSourceMember: "QuantityHanOverDoing",
        Width: 100
    },
    {
        Name: "QuantityReturn",
        Type: "text",
        Caption: "Nhập trả",
        DataSourceMember: "QuantityReturn",
        Width: 100
    },
    {
        Name: "ChangeTotalQuantity",
        Type: "text",
        Caption: "Sử dụng trong kỳ",
        DataSourceMember: "ChangeTotalQuantity",
        Width: 100
    },
    {
        Name: "QuantityExpend",
        Type: "text",
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
        Type: "text",
        Caption: "Đơn giá (giá vốn)",
        DataSourceMember: "SalePrice",
        Width: 100
    },
    {
        Name: "TotalSalePrice",
        Type: "text",
        Caption: "Số tiền quy đổi",
        DataSourceMember: "TotalSalePrice",
        Width: 100
    },
    
    
]

