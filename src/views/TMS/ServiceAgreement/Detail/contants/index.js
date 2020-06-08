export const PKColumnNameAbiliti = "AbilityID";
export const TitleFromAbiliti = "Năng lực";

export const PKColumnNameFeeAppendix = "FeeAppendixID";
export const TitleFromFeeAppendix = "Phụ lục biểu phí";


export const IDSelectColumnNameFeeAppendix = "chkSelect";
export const AddLinkFeeAppendix = "/ServiceAgreement/FeeAppendix/Add";

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
        Link: "/ServiceAgreement/FeeAppendix/Detail/",
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
        Caption: "Đến ngày",
        DataSourceMember: "ApplyFromDate",
        Width: 250,
    },
    {

        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "FeeAppendixID",
        Width: 70,
        Link: "/ServiceAgreement/FeeAppendix/Edit/",
        LinkText: "Chỉnh sửa"
    }
]

export const DataGridColumnItemListAbiliti=[
    {
        Name: "AbilityID",
        Type: "checkbox",
        Caption: "Mã",
        DataSourceMember: "AbilityID",
        Width: 150,
    },
    {
        Name: "ServiceSeasonTypeName",
        Type: "texttolink",
        Caption: " Loại mùa vụ",
        DataSourceMember: "ServiceSeasonTypeName",
        Link: "/Abiliti/Detail/",
        Width: 150,
    },
    {
        Name: "ToDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "ToDate",
        Width: 250,
    },
    {
        Name: "FromDate",
        Type: "date",
        Caption: "Đến ngày",
        DataSourceMember: "FromDate",
        Width: 250,
    },
    {
        Name: "MonthlyAbilityValue",
        Type: "text",
        Caption: "Theo tháng",
        DataSourceMember: "MonthlyAbilityValue",
        Width: 250,
    },
    {
        Name: "DailyAbilityValue",
        Type: "text",
        Caption: "Theo ngày",
        DataSourceMember: "DailyAbilityValue",
        Width: 250,
    },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "AbilityID",
        Width: 70,
    }
]