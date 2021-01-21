export const APIHostName = "TMSAPI";
export const SearchAPIPath = "";

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
        isMultiSelect: false

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
        Name: "aa",
        Type: "text",
        Caption: "Ống đồng",
        DataSourceMember: "aa",
        Width: 100
    },
    {
        Name: "a1",
        Type: "text",
        Caption: "Đơn vị",
        DataSourceMember: "a1",
        Width: 100
    },
    {
        Name: "a2",
        Type: "text",
        Caption: "Số dư đầu kỳ",
        DataSourceMember: "a2",
        Width: 100
    },
    {
        Name: "a3",
        Type: "text",
        Caption: "Nhận trong kỳ",
        DataSourceMember: "a1",
        Width: 100
    },
    {
        Name: "a4",
        Type: "text",
        Caption: "Chờ bàn giao",
        DataSourceMember: "a4",
        Width: 100
    },
    {
        Name: "a5",
        Type: "text",
        Caption: "Nhập trả",
        DataSourceMember: "a5",
        Width: 100
    },
    {
        Name: "a6",
        Type: "text",
        Caption: "Sử dụng trong kỳ",
        DataSourceMember: "a6",
        Width: 100
    },
    {
        Name: "a7",
        Type: "text",
        Caption: "Tiêu hao khác",
        DataSourceMember: "a7",
        Width: 100
    },
    {
        Name: "a8",
        Type: "text",
        Caption: "Cuối kỳ",
        DataSourceMember: "a8",
        Width: 100
    },
    
]

export const GridColumnListPrice = [
    {
        Name: "aa",
        Type: "text",
        Caption: "Vật tư khác",
        DataSourceMember: "aa",
        Width: 100
    },
    {
        Name: "a1",
        Type: "text",
        Caption: "Đơn vị",
        DataSourceMember: "a1",
        Width: 100
    },
    {
        Name: "a2",
        Type: "text",
        Caption: "Số dư đầu kỳ",
        DataSourceMember: "a2",
        Width: 100
    },
    {
        Name: "a3",
        Type: "text",
        Caption: "Nhận trong kỳ",
        DataSourceMember: "a1",
        Width: 100
    },
    {
        Name: "a4",
        Type: "text",
        Caption: "Chờ bàn giao",
        DataSourceMember: "a4",
        Width: 100
    },
    {
        Name: "a5",
        Type: "text",
        Caption: "Nhập trả",
        DataSourceMember: "a5",
        Width: 100
    },
    {
        Name: "a6",
        Type: "text",
        Caption: "Sử dụng trong kỳ",
        DataSourceMember: "a6",
        Width: 100
    },
    {
        Name: "a7",
        Type: "text",
        Caption: "Tiêu hao khác",
        DataSourceMember: "a7",
        Width: 100
    },
    {
        Name: "a8",
        Type: "text",
        Caption: "Cuối kỳ",
        DataSourceMember: "a8",
        Width: 100
    },
    {
        Name: "a9",
        Type: "text",
        Caption: "Đơn giá (giá vốn)",
        DataSourceMember: "a9",
        Width: 100
    },
    {
        Name: "a10",
        Type: "text",
        Caption: "Số tiền quy đổi",
        DataSourceMember: "a10",
        Width: 100
    },
    
    
]

