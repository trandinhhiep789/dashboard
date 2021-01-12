export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/StaffDebt/Search";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tra cứu trạng thái vận đơn" }
];

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

export const  SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
];

export const GridColumnList = [
    {
        Name: "AdvanceRequestTitle",
        Type: "text",
        Caption: "Thời gian xử lý",
        DataSourceMember: "AdvanceRequestTitle",
        Width: 200
    },
    {
        Name: "AdvanceRequestTypeName",
        Type: "text",
        Caption: "Bước xử lý",
        DataSourceMember: "AdvanceRequestTypeName",
        Width: 180
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Nhân viên xử lý",
        DataSourceMember: "ShipmentOrderID",
        Width: 120
    },
];
