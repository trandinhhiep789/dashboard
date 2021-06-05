export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Đánh giá chất lượng giao hàng" }
];

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentQualityAssess/Search";

export const listColumn = [
    {
        Name: "ShipmentOrderID",
        Type: "texttolinkNewBlank",
        Caption: "Mã yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderID",
        Link: "/ShipmentOrder/Detail/",
        Width: 150
    },
    {
        Name: "AssessDate",
        Type: "datetime",
        Caption: "Ngày đánh giá",
        DataSourceMember: "AssessDate",
        Width: 140
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "CreatedDate",
        Width: 130
    },
    {
        Name: "CreatedUser",
        Type: "text",
        Caption: "User yêu cầu",
        DataSourceMember: "CreatedUser",
        Width: 250
    },
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng đối tác",
        DataSourceMember: "PartnerSaleOrderID",
        Width: 100
    },
    {
        Name: "QualityAssessNote",
        Type: "text",
        Caption: "Nội dung đánh giá",
        DataSourceMember: "QualityAssessNote",
        Width: 250
    },

];