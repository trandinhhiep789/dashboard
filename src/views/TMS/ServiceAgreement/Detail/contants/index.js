export const APIHostName = "TMSAPI";
export const PKColumnNameAbiliti = "AbilityID";
export const TitleFromAbiliti = "Năng lực";

export const PKColumnNameFeeAppendix = "FeeAppendixID";
export const TitleFromFeeAppendix = "Phụ lục biểu phí";


export const IDSelectColumnNameFeeAppendix = "chkSelect";
export const AddLinkFeeAppendix = "/ServiceAgreement/FeeAppendix/Add";

export const AddAPIAbilitiPath = "api/ServiceAgreement_Ability/Add";
export const AddListAPIAbilitiPath = "api/ServiceAgreement_Ability/AddList";
export const EditAPIAbilitiPath = "api/ServiceAgreement_Ability/Update";

export const AddAPIFeeAppendixPath = "api/ServiceAgreement_FeeAppendix/Add";
export const AddListAPIFeeAppendixPath = "api/ServiceAgreement_FeeAppendix/AddList";
export const EditAPIFeeAppendixPath = "api/ServiceAgreement_FeeAppendix/Update";

export const DataGridColumnItemListFeeAppendix = [
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
        Caption: "Loại mùa dịch vụ",
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

export const DataGridColumnItemListAbiliti = [
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
        Caption: " Loại mùa dịch vụ",
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

export const MLObjectAbilitiItem = [
    {
        Name: "AbilityID",
        DefaultValue: "",
        BindControlName: "txtAbilityID",
        DataSourceMember: "AbilityID"
    },
    {
        Name: "ServiceAgreementID",
        DefaultValue: "",
        BindControlName: "cbServiceAgreementID",
        DataSourceMember: "ServiceAgreementID"
    },
    {
        Name: "ServiceSeasonTypeID",
        DefaultValue: "",
        BindControlName: "cbServiceSeasonTypeID",
        DataSourceMember: "ServiceSeasonTypeID"
    },

    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate",
        DataSourceMember: "FromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate",
        DataSourceMember: "ToDate"
    },
    {
        Name: "MonthlyAbilityValue",
        DefaultValue: "",
        BindControlName: "txtMonthlyAbilityValue",
        DataSourceMember: "MonthlyAbilityValue"
    },
    {
        Name: "DailyAbilityValue",
        DefaultValue: "",
        BindControlName: "txtDailyAbilityValue",
        DataSourceMember: "DailyAbilityValue"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "txtNote",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "ckIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "ckIsSystem",
        DataSourceMember: "IsSystem"
    },

]

export const MLObjectFeeAppendixDetailItem = [
    {
        Name: "FeeAppendixID",
        DefaultValue: "",
        BindControlName: "txtFeeAppendixID",
        DataSourceMember: "FeeAppendixID"
    },
    {
        Name: "ServiceSeasonTypeID",
        DefaultValue: "",
        BindControlName: "cbServiceSeasonTypeID",
        DataSourceMember: "ServiceSeasonTypeID"
    },
    {
        Name: "FeeAppendixName",
        DefaultValue: "",
        BindControlName: "txtFeeAppendixName",
        DataSourceMember: "FeeAppendixName"
    },

    {
        Name: "ApplyToDate",
        DefaultValue: "",
        BindControlName: "dtApplyToDate",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "ApplyFromDate",
        DefaultValue: "",
        BindControlName: "dtApplyFromDate",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "PNServicePriceTableID",
        DefaultValue: "",
        BindControlName: "cbPNServicePriceTableID",
        DataSourceMember: "PNServicePriceTableID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
]