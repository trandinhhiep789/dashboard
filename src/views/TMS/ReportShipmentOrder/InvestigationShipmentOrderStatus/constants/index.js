export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchInvestigationStatus";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Tra cứu trạng thái vận đơn" }
];

export const SearchElementList = [
    {
        type: "text",
        // subLabel: "Nhập mã đơn hàng/ Mã vận đơn",
        name: "txtKeyword",
        label: "Mã vận đơn",
        value: "",
        placeholder: "Nhập mã đơn hàng/ Mã vận đơn",
        icon: "",
        listoption: {}
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
];

export const GridColumnList = [
    {
        Name: "ProcessDate",
        Type: "date",
        Caption: "Thời gian xử lý",
        DataSourceMember: "ProcessDate",
        Width: 200
    },
    {
        Name: "ShipmentOrderStepName",
        Type: "text",
        Caption: "Bước xử lý",
        DataSourceMember: "ShipmentOrderStepName",
        Width: 200
    },
    {
        Name: "ProcessFullName",
        Type: "text",
        Caption: "Nhân viên xử lý",
        DataSourceMember: "ProcessFullName",
        Width: 200
    },
];

export const GridColumnListShipmentOrder = [
    {
        Name: "Username",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "Username",
        Width: 200
    },
    {
        Name: "Name",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "Name",
        Width: 200
    },
    {
        Name: "PhoneNumber",
        Type: "text",
        Caption: "Số điện thoại",
        DataSourceMember: "PhoneNumber",
        Width: 200
    }
]