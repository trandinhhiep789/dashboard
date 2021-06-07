export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Đánh giá chất lượng giao hàng" }
];

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentQualityAssess/Search";
export const LoadAPIPath = "api/ShipmentQualityAssess/Load";

export const listColumn = [
    {

        Name: "ShipmentQualityAssessID",
        Type: "popupNew",
        Caption: "Mã đánh giá",
        DataSourceMember: "ShipmentQualityAssessID",
        // Width: 150
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        // Width: 150
    },
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng đối tác",
        DataSourceMember: "PartnerSaleOrderID",
        // Width: 100
    },
    // {
    //     Name: "AssessDate",
    //     Type: "datetime",
    //     Caption: "Ngày đánh giá",
    //     DataSourceMember: "AssessDate",
    //     // Width: 140
    // },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        // Width: 130
    },
    {
        Name: "CreatedUser",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUser",
        // Width: 250
    },
    {
        Name: "QualityAssessNote",
        Type: "text",
        Caption: "Ghi chú đánh giá",
        DataSourceMember: "QualityAssessNote",
        // Width: 250
    },
    {
        Name: "IsRevokeAssessReview",
        Type: "text",
        Caption: "Đã duyệt gỡ đánh giá",
        DataSourceMember: "IsRevokeAssessReview",
        // Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentQualityAssessID",
        Link: "/ShipmentQualityAssess/Edit/",
        LinkText: "Chỉnh sửa",
        // Width: 150
    }

];