
export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    },
];

export const SearchMLObjectDefinition = [
    {
        SearchKey: "@Keyword", 
        SearchValue: ""
    },
    
];



export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ServiceAgreementID",
        Width: 60
    },
    {
        Name: "ServiceAgreementID",
        Type: "texttolink",
        Caption: "Mã HĐ",
        DataSourceMember: "ServiceAgreementID",
        Link: "/ServiceAgreement/Detail/",
        Width: 70
    },
    {
        Name: "ServiceAgreementNumber",
        Type: "text",
        Caption: "Số HĐ",
        DataSourceMember: "ServiceAgreementNumber",
        Width: 200
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 340
    },
    {
        Name: "ServiceTypeName",
        Type: "text",
        Caption: "Loại dịch vụ",
        DataSourceMember: "ServiceTypeName",
        Width:  200
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Khu vực",
        DataSourceMember: "AreaName",
        Width: 100
    },
    {
        Name: "SignedDate",
        Type: "date",
        Caption: "Ngày ký HĐ",
        DataSourceMember: "SignedDate",
        Width: 130
    },
    {
        Name: "ExpiredDate",
        Type: "date",
        Caption: "Ngày hết hạn HĐ",
        DataSourceMember: "ExpiredDate",
        Width: 130
    },
    {
        Name: "ExtendLable",
        Type: "text",
        Caption: "Gia hạn đến",
        DataSourceMember: "ExtendLable",
        Width: 150
    },
    {
        Name: "DepositedLable",
        Type: "text",
        Caption: "Đã ký quỹ",
        DataSourceMember: "DepositedLable",
        Width: 100
    },
    {
        Name: "StatusLable",
        Type: "text",
        Caption: "Trạng thái",
        DataSourceMember: "StatusLable",
        Width: 100
    },

];