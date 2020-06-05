export const PKColumnNameAbiliti = "AbilityID";
export const TitleFromAbiliti = "Năng lực";

export const PKColumnNameFeeAppendix = "FeeAppendixID";
export const TitleFromFeeAppendix = "Phụ lục biểu phí";


export const DataGridColumnItemListAbiliti = [
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 250,
        hideInput: false
    },
  
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ProductID",
        Width: 70,
        iputpop: false
    }
];


export const DataGridColumnItemListFeeAppendix=[
    {
        Name: "FeeAppendixID",
        Type: "checkbox",
        Caption: "Mã",
        DataSourceMember: "FeeAppendixID",
        Width: 150,
    },
    {
        Name: "FeeAppendixName",
        Type: "texttolink",
        Caption: "Tên Phụ lục",
        DataSourceMember: "FeeAppendixName",
        Link: "/FeeAppendix/Detail/",
        Width: 150,
    },
    {
        Name: "ServiceSeasonTypeName",
        Type: "text",
        Caption: "Loại thời vụ",
        DataSourceMember: "ServiceSeasonTypeName",
        Width: 250,
    },
    {
        Name: "ApplyToDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "ApplyToDate",
        Width: 250,
    },
    {
        Name: "ApplyFromDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "ApplyFromDate",
        Width: 250,
    },
    {
        Name: "IsActived",
        Type: "checkbox",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150,
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "FeeAppendixID",
        Width: 70,
    }
]