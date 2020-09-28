export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/CurrentAdvanceDebt/GetListByUser";


export const TitleFormSearch =""

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông kê hạn mức tạm ứng" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    }
]

export const SearchElementList = [

    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 2,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: true
    },
   
];


export const DataGridColumnList = [
  
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 150
    },
    {
        Name: "MaterialGroupName",
        Type: "text",
        Caption: "Tên nhóm vật tư",
        DataSourceMember: "MaterialGroupName",
        Width: 150
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phậm",
        DataSourceMember: "ProductID",
        Width: 180
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phậm",
        DataSourceMember: "ProductName",
        Width: 180
    },
    {
        Name: "TotalQuantity",
        Type: "text",
        Caption: "Tổng số lượng",
        DataSourceMember: "TotalQuantity",
        Width: 100
    },
    {
        Name: "UsableQuantity",
        Type: "text",
        Caption: "Số lượng khả dụng",
        DataSourceMember: "UsableQuantity",
        Width: 100
    },
   
   
];
