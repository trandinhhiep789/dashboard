export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/BeginTermAdvanceDebt/LoadBADByUserName";


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
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
]

export const GridColumnList = [
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã vật tư",
        DataSourceMember: "ProductID",
        Width: "10%"
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên vật tư",
        DataSourceMember: "ProductName",
        Width: "17%"
    },
    {
        Name: "QuantityUnitName",
        Type: "text",
        Caption: "Đơn vị tính",
        DataSourceMember: "QuantityUnitName",
        Width: "13%"
    },
    {
        Name: "BeginTermAdvanceDebt",
        Type: "text",
        Caption: "Tồn đầu kỳ",
        DataSourceMember: "BeginTermAdvanceDebt",
        Width: "10%"
    },
    {
        Name: "IncreaseAdvanceDebt",
        Type: "text",
        Caption: "Tăng trong kỳ",
        DataSourceMember: "IncreaseAdvanceDebt",
        Width: "10%"
    },
    {
        Name: "DecreaseAdvanceDebt",
        Type: "text",
        Caption: "Giảm trong kỳ",
        DataSourceMember: "DecreaseAdvanceDebt",
        Width: "10%"
    },
    {
        Name: "EndTermAdvanceDebt",
        Type: "text",
        Caption: "Tồn cuối kỳ",
        DataSourceMember: "EndTermAdvanceDebt",
        Width: "10%"
    },
    {
        Name: "Price",
        Type: "text",
        Caption: "Đơn giá",
        DataSourceMember: "Price",
        Width: "10%"
    },
    {
        Name: "TotalAmount",
        Type: "text",
        Caption: "Thành tiền",
        DataSourceMember: "TotalAmount",
        Width: "10%"
    },
]